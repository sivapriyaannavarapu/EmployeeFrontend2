import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { Formik, Form } from "formik";

import BasicInfoFields from "./BasicInfoFields";
import WorkExperienceFields from "./WorkExperienceForm";

import styles from "./EmployeeOnboardingForm.module.css";
import dividerLine from "assets/EmployeeOnBoarding/dividerline.svg";

import {
  generateTempPayrollId,
} from "modules/employeeModule/api/onBoardingForms/dropDownApi/useEmployeeFormData";

import { useAuth } from "useAuth";

const EmployeeOnboardingForm = forwardRef(({ onTempIdGenerated }, ref) => {
  const { user } = useAuth();
  const hrEmployeeId = user?.employeeId || 5109;

  const formikRef = useRef(null);

  /* ================= FOOTER REF ================= */
  useImperativeHandle(ref, () => ({
    submitForm: () => {
      formikRef.current?.submitForm();
    },
  }));

  /* ================= INITIAL VALUES ================= */
  const initialValues = {
    empId: 0,

    modeOfHiringId: "",
    firstName: "",
    lastName: "",
    adhaarName: "",
    adhaarNo: "",

    genderId: "",
    dateOfBirth: "",
    age: "",

    fatherName: "",
    primaryMobileNo: "",
    email: "",
    pancardNum: "",

    bloodGroupId: "",
    religionId: "",
    casteId: "",
    categoryId: "",
    maritalStatusId: "",
    qualificationId: "",

    emergencyPhNo: "",
    emergencyRelationId: "",

    campusId: "",
    buildingId: "",
    managerId: "",
    empWorkModeId: "",
    joinTypeId: "",
    dateOfJoin: "",
    contractStartDate: "",
    contractEndDate: "",

    uanNo: "",

    profilePicture: null,
    tempPayrollId: "",
  };

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validateOnBlur
      validateOnChange={false}
      onSubmit={async (values, { setSubmitting, setFieldValue }) => {
        try {
          console.log("🚀 FINAL PAYLOAD TO BACKEND", values);

          /* ===== INJECT createdBy WITH hrEmployeeId ===== */
          const payloadWithCreatedBy = {
            ...values,
            createdBy: hrEmployeeId,
            updatedBy: hrEmployeeId, // Optional: Set updatedBy same as createdBy for new records
          };

          /* ===== BACKEND CALL (NO useMutation) ===== */
          const response = await generateTempPayrollId(
            hrEmployeeId,
            payloadWithCreatedBy
          );

          console.log("✅ Temp Payroll ID Generated:", response);

          setFieldValue("tempPayrollId", response.tempPayrollId);

          if (onTempIdGenerated) {
            onTempIdGenerated(response.tempPayrollId);
          }
        } catch (error) {
          console.error("❌ Failed to generate Temp Payroll ID", error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {(formik) => (
        <Form className={styles.formContainer} noValidate>
          {/* ================= BASIC INFO ================= */}
          <BasicInfoFields formik={formik} />

          {/* ================= DIVIDER ================= */}
          <h2 className={styles.formSectionTitle}>
            Working Information
            <img
              src={dividerLine}
              alt="divider"
              className={styles.dividerImage}
            />
          </h2>

          {/* ================= WORK EXPERIENCE ================= */}
          <WorkExperienceFields formik={formik} />
        </Form>
      )}
    </Formik>
  );
});

export default EmployeeOnboardingForm;