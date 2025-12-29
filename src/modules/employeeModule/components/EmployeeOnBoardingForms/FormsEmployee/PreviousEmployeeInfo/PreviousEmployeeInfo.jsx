import React, { forwardRef, useImperativeHandle } from "react";
import { FieldArray, FormikProvider } from "formik";
import styles from "./PreviousEmployeeInfo.module.css";

// Assets & Widgets
import dividerline from "assets/Qualification/border.svg";
import AddFieldWidget from "widgets/AddFieldWidget/AddFieldWidget";
import Inputbox from "widgets/Inputbox/InputBox";
import { ReactComponent as UploadIcon } from "assets/Qualification/Upload.svg";

// Hook
import { usePreviousEmployerFormik } from "../../../../hooks/usePreviousEmployerFormik";

const PreviousEmployerInfo = forwardRef(({ tempId, onSuccess }, ref) => {
  const { formik, initialEmployer } = usePreviousEmployerFormik({
    tempId,
    onSuccess,
  });

  const { values, handleChange, setFieldValue } = formik;

  // expose submitForm
  useImperativeHandle(ref, () => ({
    submitForm: () => formik.submitForm(),
  }));

  // ✅ FIXED: pass BOTH index & fileIndex
  const handleRemoveFile = (empIndex, fileIndex) => {
    const existingFiles =
      values.previousEmployers[empIndex].documents || [];

    const updatedFiles = existingFiles.filter(
      (_, i) => i !== fileIndex
    );

    setFieldValue(
      `previousEmployers.${empIndex}.documents`,
      updatedFiles
    );
  };

  return (
    <div className={styles.formContainer}>
      <FormikProvider value={formik}>
        <form>
          {/* HEADER */}
          <div className={styles.section_header}>
            <h3 className={styles.section_title}>
              Previous Employer Details
            </h3>
            <img
              src={dividerline}
              alt="divider"
              className={styles.dividerImage}
            />
          </div>

          <FieldArray name="previousEmployers">
            {({ push, remove, replace }) => (
              <>
                {values.previousEmployers.map((item, index) => (
                  <AddFieldWidget
                    key={index}
                    index={index}
                    title={`Previous Company ${index + 1}`}
                    enableFieldset
                    showSimpleTitle={false}
                    onRemove={() => remove(index)}
                    onClear={() => replace(index, initialEmployer)}
                  >
                    <div className={styles.formGrid}>
                      {/* Company */}
                      <Inputbox
                        label="Company Name"
                        name={`previousEmployers.${index}.companyName`}
                        value={item.companyName}
                        placeholder="Enter Company Name"
                        onChange={handleChange}
                      />

                      <Inputbox
                        label="Designation"
                        name={`previousEmployers.${index}.designation`}
                        value={item.designation}
                        placeholder="Enter Designation"
                        onChange={handleChange}
                      />

                      {/* Dates */}
                      <Inputbox
                        type="date"
                        label="From Date"
                        name={`previousEmployers.${index}.fromDate`}
                        placeholder="Enter From Date"
                        value={item.fromDate}
                        onChange={handleChange}
                      />

                      <Inputbox
                        type="date"
                        label="To Date"
                        name={`previousEmployers.${index}.toDate`}
                        placeholder="Enter To Date"
                        value={item.toDate}
                        onChange={handleChange}
                      />

                      {/* Address */}
                      <Inputbox
                        label="Leaving Reason"
                        name={`previousEmployers.${index}.leavingReason`}
                        placeholder="Enter Leaving Reason"
                        value={item.leavingReason}
                        onChange={handleChange}
                      />

                      <Inputbox
                        label="Address Line 1"
                        name={`previousEmployers.${index}.companyAddressLine1`}
                        placeholder="Enter Address Line 1"
                        value={item.companyAddressLine1}
                        onChange={handleChange}
                      />

                      <Inputbox
                        label="Address Line 2"
                        name={`previousEmployers.${index}.companyAddressLine2`}
                        placeholder="Enter Address Line 2"
                        value={item.companyAddressLine2}
                        onChange={handleChange}
                      />

                      <Inputbox
                        label="Nature of Duties"
                        name={`previousEmployers.${index}.natureOfDuties`}
                        placeholder="Enter Nature of Duties"
                        value={item.natureOfDuties}
                        onChange={handleChange}
                      />

                      {/* Salary */}
                      <Inputbox
                        type="number"
                        label="Gross Salary (Monthly)"
                        name={`previousEmployers.${index}.grossSalaryPerMonth`}
                        placeholder="Enter Gross Salary"
                        value={item.grossSalaryPerMonth}
                        onChange={handleChange}
                      />

                      <Inputbox
                        type="number"
                        label="CTC"
                        name={`previousEmployers.${index}.ctc`}
                        placeholder="Enter CTC"
                        value={item.ctc}
                        onChange={handleChange}
                      />

                      {/* Upload Section */}
                      <div className={styles.uploadRow}>
                        <span className={styles.uploadLabel}>
                          Upload Certificate
                        </span>

                        <input
                          type="file"
                          hidden
                          multiple
                          id={`upload-${index}`}
                          onChange={(e) => {
                            const newFiles = Array.from(e.target.files);
                            const existingFiles =
                              item.documents || [];

                            setFieldValue(
                              `previousEmployers.${index}.documents`,
                              [...existingFiles, ...newFiles]
                            );

                            e.target.value = null;
                          }}
                        />

                        <label
                          htmlFor={`upload-${index}`}
                          className={styles.uploadButton}
                        >
                          <UploadIcon />
                          Upload File
                        </label>

                        {/* File List */}
                        {item.documents?.length > 0 && (
                          <ul className={styles.fileList}>
  {item.documents.map((file, fileIndex) => (
    <li key={fileIndex} className={styles.fileItem}>
      <span className={styles.fileName}>{file.name}</span>

      <button
        type="button"
        className={styles.removeFileBtn}
        onClick={() => handleRemoveFile(index, fileIndex)}
      >
        ✕
      </button>
    </li>
  ))}
</ul>

                        )}
                      </div>
                    </div>
                  </AddFieldWidget>
                ))}

                {/* ADD NEW PREVIOUS EMPLOYER */}
                <div className={styles.addButtonContainer}>
                  <button
                    type="button"
                    className={styles.addButton}
                    onClick={() => push(initialEmployer)}
                  >
                    + Add Previous Employer
                  </button>
                </div>
              </>
            )}
          </FieldArray>
        </form>
      </FormikProvider>
    </div>
  );
});

export default PreviousEmployerInfo;
