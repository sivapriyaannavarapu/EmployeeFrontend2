// hooks/useBankInfoFormik.js

import { useFormik } from "formik";
import { useAuth } from "useAuth"; 
import * as Yup from "yup";
import { postBankInfo } from "modules/employeeModule/api/onBoardingForms/postApi/useBankQueries";

// Matches the Nested JSON Structure
const initialValues = {
  paymentTypeId: "",
  bankId: "",
  bankBranchId: "",
  bankBranchName: "", // We will set this hidden field when Branch ID changes
  salaryLessThan40000: false,
  
  personalAccount: {
    bankName: "",
    accountNo: "",
    accountHolderName: "",
    ifscCode: ""
  },
  
  salaryAccount: {
    bankId: "", // This might be redundant if root bankId is used, but payload asks for it
    ifscCode: "",
    accountNo: "",
    accountHolderName: "",
    payableAt: ""
  }
};

// Validation Schema
const validationSchema = Yup.object({
  paymentTypeId: Yup.string().required("Payment Type is required"),
  bankId: Yup.string().required("Bank is required"),
  // Add other validations as needed
});

export const useBankInfoFormik = ({ tempId, onSuccess }) => {
  const { user } = useAuth();
  const hrEmployeeId = user?.employeeId || 5109;

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      if (!tempId) {
        alert("Temporary ID is missing.");
        return;
      }

      console.log("🚀 Submitting Bank Info...");

      const apiPayload = {
        paymentTypeId: Number(values.paymentTypeId) || 0,
        bankId: Number(values.bankId) || 0,
        bankBranchId: Number(values.bankBranchId) || 0,
        bankBranchName: values.bankBranchName || "",
        salaryLessThan40000: Boolean(values.salaryLessThan40000),
        
        personalAccount: {
          bankName: values.personalAccount.bankName,
          accountNo: values.personalAccount.accountNo,
          accountHolderName: values.personalAccount.accountHolderName,
          ifscCode: values.personalAccount.ifscCode
        },
        
        salaryAccount: {
          // If the salary account bank is same as root bank, map it here
          bankId: Number(values.salaryAccount.bankId) || Number(values.bankId) || 0,
          ifscCode: values.salaryAccount.ifscCode,
          accountNo: values.salaryAccount.accountNo,
          accountHolderName: values.salaryAccount.accountHolderName,
          payableAt: values.salaryAccount.payableAt
        },

        createdBy: hrEmployeeId,
        updatedBy: hrEmployeeId
      };

      try {
        const response = await postBankInfo(tempId, apiPayload);
        console.log("✅ Bank Info Saved:", response);
        if (onSuccess) onSuccess();
      } catch (error) {
        console.error("❌ Failed to save Bank info:", error);
      }
    },
  });

  return {
    formik,
    values: formik.values,
    setFieldValue: formik.setFieldValue,
    handleChange: formik.handleChange,
    submitForm: formik.submitForm,
  };
};