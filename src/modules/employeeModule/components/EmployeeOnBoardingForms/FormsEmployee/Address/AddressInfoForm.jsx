import React, { forwardRef, useImperativeHandle } from "react";
import FormCheckbox from "widgets/FormCheckBox/FormCheckBox";
import AddressSection from "../../../EmployeeOnBoardingForms/FormsEmployee/AddressSection/AddressSection";
import { useAddressFormik } from "../../../../hooks/useAddressFormik";
import {
  createAddressFields,
  defaultCountries,
} from "../../../../utils/fieldConfigs";
import styles from "./AddressInfoForm.module.css";

const AddressInfoFormNew = forwardRef(({ tempId, onSuccess }, ref) => {
  
  const {
    values,
    errors,
    touched,
    handleFieldChange,
    handleCheckboxChange,
    setFieldTouched,
    stateOptions,
    districtOptions,
    cityOptions,
    submitForm,
  } = useAddressFormik({ tempId, onSuccess });

  useImperativeHandle(ref, () => ({
    submitForm: () => submitForm(),
  }));

  const addressFields = createAddressFields(
    cityOptions,
    stateOptions,
    defaultCountries,
    districtOptions
  );

  const handleFieldBlur = (section, field) =>
    setFieldTouched(`${section}.${field}`, true);

 const onSameAddressToggle = (e) => {
    const isChecked = e?.target ? e.target.checked : e;
    handleCheckboxChange(isChecked);
  };

  return (
    <div className={styles.address_form_container}>

      <div className={styles.checkbox_section}>
        <FormCheckbox
          name="permanentAddressSame"
          checked={values.permanentAddressSame}
          onChange={onSameAddressToggle} // Use the safe handler
        />
        <span>Permanent Address Same as Current Address</span>
      </div>
      {/* --- CURRENT ADDRESS --- */}
      <AddressSection
        title="Current Address"
        fields={addressFields}
        section="currentAddress"
        values={values.currentAddress}
        errors={errors.currentAddress || {}}
        touched={touched.currentAddress || {}}
        onFieldChange={handleFieldChange}
        onFieldBlur={handleFieldBlur}
      />

      {/* --- PERMANENT ADDRESS --- */}
      {!values.permanentAddressSame && (
        <AddressSection
          title="Permanent Address"
          fields={addressFields}
          section="permanentAddress"
          values={values.permanentAddress}
          errors={errors.permanentAddress || {}}
          touched={touched.permanentAddress || {}}
          onFieldChange={handleFieldChange}
          onFieldBlur={handleFieldBlur}
          showDivider
        />
      )}
    </div>
  );
});

export default AddressInfoFormNew;