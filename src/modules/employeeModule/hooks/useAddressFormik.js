import { useFormik } from "formik";
import { useEffect } from "react";
import { useAuth } from "useAuth"; 
import {
  validateField,
  addressValidationSchema,
} from "../utils/validationUtils";

import {
  usePincodeQuery,
  useCitiesByDistrict,
  postAddressInfo,
} from "modules/employeeModule/api/onBoardingForms/postApi/useAddressQueries";

const initialAddress = {
  name: "",
  addressLine1: "",
  addressLine2: "",
  addressLine3: "",
  pin: "",
  cityId: "",
  districtId: "",
  stateId: "",
  countryId: 1, 
  phoneNumber: "",
};

export const useAddressFormik = ({ tempId, onSuccess }) => {
  const { user } = useAuth();
  const hrEmployeeId = user?.employeeId || 5109; 

  const formik = useFormik({
    initialValues: {
      permanentAddressSame: false, 
      currentAddress: { ...initialAddress },
      permanentAddress: { ...initialAddress },
    },

    validate: (values) => {
      const errors = {};
      const currentErrors = validateAddress(values.currentAddress);
      if (Object.keys(currentErrors).length) errors.currentAddress = currentErrors;

      if (!values.permanentAddressSame) {
        const permanentErrors = validateAddress(values.permanentAddress);
        if (Object.keys(permanentErrors).length) errors.permanentAddress = permanentErrors;
      }
      return errors;
    },

    onSubmit: async (values) => {
      console.log("🚀 Submitting Address...");

      if (!tempId) {
        alert("Temporary ID is missing.");
        return;
      }

      // 1. Force Boolean (Fixes the [object Object] bug)
      const isSame = values.permanentAddressSame === true;

      // 2. Format IDs as Numbers
      const formatAddressParams = (addr) => ({
        ...addr,
        cityId: Number(addr.cityId) || 0,
        stateId: Number(addr.stateId) || 0,
        districtId: Number(addr.districtId) || 0,
        countryId: Number(addr.countryId) || 0,
      });

      // 3. FORCE COPY: Ignore Formik state for Permanent if "Same" is checked.
      // This guarantees the API receives the correct data even if UI sync failed.
      const finalPermanentAddress = isSame 
        ? values.currentAddress 
        : values.permanentAddress;

      const apiPayload = {
        permanentAddressSameAsCurrent: isSame,
        currentAddress: formatAddressParams(values.currentAddress),
        permanentAddress: formatAddressParams(finalPermanentAddress),
        createdBy: hrEmployeeId,
        updatedBy: hrEmployeeId,
      };

      try {
        const response = await postAddressInfo(tempId, apiPayload);
        console.log("✅ Address Saved:", response);
        if (onSuccess) onSuccess();
      } catch (error) {
        console.error("❌ Failed to save address:", error);
      }
    },
  });

  // --- QUERY HOOKS & SYNC LOGIC ---

  const { data: pinData } = usePincodeQuery(formik.values.currentAddress.pin, true);

  // 🔴 FIX: Added 'permanentAddressSame' to dependency array
  useEffect(() => {
    if (!pinData) return;

    // 1. Update Current
    formik.setFieldValue("currentAddress.stateId", pinData.stateId);
    formik.setFieldValue("currentAddress.districtId", pinData.districtId);
    
    // 2. Update Permanent if Same (This now runs reliably)
    if (formik.values.permanentAddressSame) {
      formik.setFieldValue("permanentAddress.stateId", pinData.stateId);
      formik.setFieldValue("permanentAddress.districtId", pinData.districtId);
    }
  }, [pinData, formik.values.permanentAddressSame]); // <--- Key Fix

  const { data: cities = [] } = useCitiesByDistrict(formik.values.currentAddress.districtId);

  useEffect(() => {
    if (cities.length === 1) {
      const cityId = cities[0].id;
      formik.setFieldValue("currentAddress.cityId", cityId);
      if (formik.values.permanentAddressSame) {
        formik.setFieldValue("permanentAddress.cityId", cityId);
      }
    }
  }, [cities, formik.values.permanentAddressSame]);

  // --- HANDLERS ---

  const handleCheckboxChange = (checked) => {
    // Explicitly cast to boolean to prevent Event Object pollution
    const isChecked = !!checked; 
    
    formik.setFieldValue("permanentAddressSame", isChecked);

    if (isChecked) {
      formik.setFieldValue("permanentAddress", { ...formik.values.currentAddress });
    } else {
      formik.setFieldValue("permanentAddress", { ...initialAddress });
    }
  };

  const handleFieldChange = (section, field, value) => {
    formik.setFieldValue(`${section}.${field}`, value);
    if (section === "currentAddress" && formik.values.permanentAddressSame) {
      formik.setFieldValue(`permanentAddress.${field}`, value);
    }
  };

  function validateAddress(address) {
    const errors = {};
    Object.keys(addressValidationSchema).forEach((field) => {
      const error = validateField(address[field], addressValidationSchema[field]);
      if (error) errors[field] = error;
    });
    return errors;
  }

  return {
    values: formik.values,
    errors: formik.errors,
    touched: formik.touched,
    isValid: formik.isValid,
    handleFieldChange,
    handleCheckboxChange,
    setFieldTouched: formik.setFieldTouched,
    submitForm: formik.submitForm,
    stateOptions: pinData ? [{ id: pinData.stateId, name: pinData.stateName }] : [],
    districtOptions: pinData ? [{ id: pinData.districtId, name: pinData.districtName }] : [],
    cityOptions: cities,
    formik,
  };
};