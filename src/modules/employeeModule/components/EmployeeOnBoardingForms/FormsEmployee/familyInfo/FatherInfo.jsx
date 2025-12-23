import React from "react";
import Inputbox from "widgets/Inputbox/InputBox";
import Dropdown from "widgets/Dropdown/Dropdown";
// use the same checkbox component as FamilyInfo
import FormCheckbox from "widgets/FormCheckBox/FormCheckBox";
import styles from "./FatherInfo.module.css";

const FatherInfo = ({ formik, prefix = "father", bloodGroupOptions = [] }) => {
  const { values, handleChange, setFieldValue } = formik;
  
  const data = values[prefix] || {};
  const getName = (field) => `${prefix}.${field}`;

  const handleCheckbox = (field, e) => {
    const isChecked = e?.target ? e.target.checked : e;
    setFieldValue(getName(field), isChecked);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formGrid}>

        {/* Row 1 */}
        <div className={styles.row}>
          <div className={styles.nameField}>
            <Inputbox
              label="Name"
              name={getName("fullName")}
              placeholder="Enter Name"
              value={data.fullName || ""}
              onChange={handleChange}
            />

            <div className={styles.checkboxRow}>
  <span className={styles.checkboxLabel}>Late</span>
  <FormCheckbox
    id={`${prefix}-late`}
    name={getName("isLate")}
    checked={data.isLate || false}
    onChange={(e) => handleCheckbox("isLate", e)}
  />
</div>
          </div>

          <Dropdown
            dropdownname="Blood Group"
            name={getName("bloodGroupId")}
            results={bloodGroupOptions}
            value={data.bloodGroupId || ""}
            onChange={(e) => {
               handleChange(e);
            }}
          />

          <Dropdown
            dropdownname="Nationality"
            name={getName("nationality")}
            results={["Indian", "American", "Canadian", "Other"]}
            value={data.nationality || ""}
            onChange={handleChange}
          />
        </div>

        {/* Row 2 */}
        <div className={styles.row}>
          <Inputbox
            label="Occupation"
            name={getName("occupation")}
            placeholder="Enter Occupation"
            value={data.occupation || ""}
            onChange={handleChange}
          />

          <Inputbox
            label="Email"
            name={getName("email")}
            placeholder="Enter email id"
            value={data.email || ""}
            onChange={handleChange}
          />

          <Inputbox
            label="Phone Number"
            name={getName("phoneNumber")}
            placeholder="Enter phone number"
            value={data.phoneNumber || ""}
            onChange={handleChange}
          />
        </div>

        {/* Row 3 - Employee ID (Conditional) */}
        {data.isSriChaitanyaEmp && (
          <div className={styles.row}>
            <Inputbox
              label="Employee ID"
              name={getName("parentEmpId")}
              placeholder="Enter Employee ID"
              value={data.parentEmpId || ""}
              onChange={handleChange}
            />
          </div>
        )}

      </div>
    </div>
  );
};

export default FatherInfo;