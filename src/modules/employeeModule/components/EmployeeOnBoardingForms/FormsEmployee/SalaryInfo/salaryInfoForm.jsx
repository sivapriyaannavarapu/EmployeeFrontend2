import React from "react";
import { Formik, Form } from "formik";
import styles from "./SalaryInfoForm.module.css";

import Dropdown from "widgets/Dropdown/Dropdown";
import Inputbox from "widgets/Inputbox/InputBox";
import FormCheckbox from "widgets/FormCheckBox/FormCheckBox";


import dividerline from "assets/EmployeeOnBoarding/dividerline.svg";

const SalaryInfoForm = ({ onBack, onSubmitComplete }) => {
  const initialValues = {
    monthlyCTC: "",
    ctcInWords: "",
    yearlyCTC: "",
    grade: "",
    structure: "",
    costCenter: "",
    companyName: "",
    includePF: false,
    includeESI: false,
    pfNumber: "",
    esiNumber: "",
    uanNumber: "",
    pfJoinDate: "",
  };

  const gradeOptions = ["Select Grade", "A", "B", "C"];
  const structureOptions = ["Select Structure", "Standard", "Custom"];
  const costCenterOptions = ["Select Cost Center", "Finance", "HR", "Tech"];

  

  const handleSubmitForm = (values, { setSubmitting }) => {
    console.log("Submitted Salary Info:", values);
    setSubmitting(false);
    onSubmitComplete && onSubmitComplete();
  };

  return (
    <div className={styles.container}>
      <Formik initialValues={initialValues} onSubmit={handleSubmitForm}>
        {({ values, setFieldValue, handleSubmit, isSubmitting }) => (
          <Form className={styles.form}>
            {/* -------------------- SECTION: SALARY INFO -------------------- */}
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>Salary Info</h3>
              <img src={dividerline} alt="divider" className={styles.divider} />
            </div>

            <div className={styles.grid}>
              <Inputbox
                label="Monthly CTC"
                name="monthlyCTC"
                placeholder="Enter CTC"
                value={values.monthlyCTC}
                onChange={(e) => setFieldValue("monthlyCTC", e.target.value)}
              />

              <Inputbox
                label="CTC In Words"
                name="ctcInWords"
                placeholder="CTC in Words"
                value={values.ctcInWords}
                onChange={(e) => setFieldValue("ctcInWords", e.target.value)}
              />

              <Inputbox
                label="Yearly CTC"
                name="yearlyCTC"
                placeholder="Yearly CTC"
                value={values.yearlyCTC}
                onChange={(e) => setFieldValue("yearlyCTC", e.target.value)}
              />
            </div>

            <div className={styles.grid}>
              <Dropdown
                dropdownname="Grade"
                name="grade"
                results={gradeOptions}
                value={values.grade}
                onChange={(e) => setFieldValue("grade", e.target.value)}
              />

              <Dropdown
                dropdownname="Structure"
                name="structure"
                results={structureOptions}
                value={values.structure}
                onChange={(e) => setFieldValue("structure", e.target.value)}
              />

              <Dropdown
                dropdownname="Cost Center"
                name="costCenter"
                results={costCenterOptions}
                value={values.costCenter}
                onChange={(e) => setFieldValue("costCenter", e.target.value)}
              />
            </div>

            <div className={styles.singleRow}>
              <Inputbox
                label="Company Name"
                name="companyName"
                placeholder="Enter Company Name"
                value={values.companyName}
                onChange={(e) => setFieldValue("companyName", e.target.value)}
              />
            </div>

            {/* -------------------- SECTION: PF INFO -------------------- */}
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>PF Info</h3>
              <img src={dividerline} alt="divider" className={styles.divider} />
            </div>

            <div className={styles.checkboxRow}>
              <label className={styles.checkboxItem}>
                <FormCheckbox
                  checked={values.includePF}
                  onChange={(val) => setFieldValue("includePF", val)}
                />
                <span>Include in PF Scheme</span>
              </label>

              <label className={styles.checkboxItem}>
                <FormCheckbox
                  checked={values.includeESI}
                  onChange={(val) => setFieldValue("includeESI", val)}
                />
                <span>Include in ESI Scheme</span>
              </label>
            </div>

            <div className={styles.grid}>
              <Inputbox
                label="PF Number"
                name="pfNumber"
                placeholder="Enter PF Number"
                value={values.pfNumber}
                onChange={(e) => setFieldValue("pfNumber", e.target.value)}
              />

              <Inputbox
                label="ESI Number"
                name="esiNumber"
                placeholder="Enter ESI Number"
                value={values.esiNumber}
                onChange={(e) => setFieldValue("esiNumber", e.target.value)}
              />

              <Inputbox
                label="PF Join Date"
                name="pfJoinDate"
                type="date"
                value={values.pfJoinDate}
                onChange={(e) => setFieldValue("pfJoinDate", e.target.value)}
              />
            </div>

            <div className={styles.singleRow}>
              <Inputbox
                label="UAN Number"
                name="uanNumber"
                placeholder="Enter UAN Number"
                value={values.uanNumber}
                onChange={(e) => setFieldValue("uanNumber", e.target.value)}
              />
            </div>

          
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SalaryInfoForm;
