import React, { forwardRef, useImperativeHandle, useState } from "react";
import { FieldArray, FormikProvider } from "formik";
import styles from "../familyInfo/FamilyInfo.module.css";

// API & Hooks
import { useEmployeeFormQueries } from "modules/employeeModule/api/onBoardingForms/dropDownApi/useEmployeeFormData";
import { useFamilyInfoFormik } from "../../../../hooks/useFamilyInfoFormik";

// Assets & Widgets
import { ReactComponent as UploadIcon } from "assets/Qualification/Upload.svg";
import BorderIcon from 'assets/Qualification/border.svg'; // Correct string import
import FormCheckbox from 'widgets/FormCheckBox/FormCheckBox';
import AddFieldWidget from "widgets/AddFieldWidget/AddFieldWidget";
import Inputbox from "widgets/Inputbox/InputBox";
import Dropdown from "widgets/Dropdown/Dropdown";

// Sub-components
import FatherInfo from "./FatherInfo";
// We reuse FatherInfo logic for Mother since fields are identical, 
// just passing a different prefix ("mother")
import MotherInfo from "./FatherInfo"; 

const FamilyInfo = forwardRef(({ tempId, onSuccess }, ref) => {
  
  // 1. Fetch Dropdowns (Blood Groups, etc.)
  const { dropdowns } = useEmployeeFormQueries();
  const bloodGroupOptions = dropdowns.bloodGroups.map(bg => bg.name); 

  // 2. Init Formik Hook
  const { formik } = useFamilyInfoFormik({ tempId, onSuccess });
  const { values, setFieldValue, handleChange } = formik;

  // 3. Photo Upload State
  const [photoPreview, setPhotoPreview] = useState(null);

  useImperativeHandle(ref, () => ({
    submitForm: () => formik.submitForm(),
  }));

  // --- HANDLERS ---
  
  // A. Safe Checkbox Handler (Fixes "Is in Organization" not working)
  const handleOrgCheck = (fieldPath, e) => {
    // If the widget passes an Event object, get 'checked'. 
    // If it passes a direct boolean, use it as is.
    const isChecked = e?.target ? e.target.checked : e;
    setFieldValue(fieldPath, isChecked);
  };

  // B. Photo Upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFieldValue("familyGroupPhotoFile", file); 
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const initialOtherMember = {
    fullName: "",
    relationId: "",
    bloodGroupId: "",
    nationality: "Indian",
    email: "",
    phoneNumber: "",
    occupation: "",
    isSriChaitanyaEmp: false,
    parentEmpId: ""
  };

  return (
    <div className={styles.container}>
      <FormikProvider value={formik}>
        <form>
          
          {/* ================= FATHER SECTION ================= */}
          <div className={styles.sectionTitle}>
             <span>Father Information</span> 
             <img src={BorderIcon} alt="border" />
          </div>
          
          <div className={styles.checkbox_section}>
             <div className={styles.checkbox_wrapper}>
                <span className={styles.checkbox_label}>Is in Organization?</span>
                <FormCheckbox
                   name="father.isSriChaitanyaEmp"
                   checked={values.father.isSriChaitanyaEmp}
                   onChange={(e) => handleOrgCheck("father.isSriChaitanyaEmp", e)}
                />
             </div>
          </div>

          <FatherInfo 
            formik={formik} 
            prefix="father" 
            bloodGroupOptions={bloodGroupOptions} 
          />


          {/* ================= MOTHER SECTION ================= */}
          <div className={styles.sectionTitle}>
             <span>Mother Information</span> 
             <img src={BorderIcon} alt="border" />
          </div>

          <div className={styles.checkbox_section}>
             <div className={styles.checkbox_wrapper}>
                <span className={styles.checkbox_label}>Is in Organization?</span>
                <FormCheckbox
                   name="mother.isSriChaitanyaEmp"
                   checked={values.mother.isSriChaitanyaEmp}
                   onChange={(e) => handleOrgCheck("mother.isSriChaitanyaEmp", e)}
                />
             </div>
          </div>

          {/* Using FatherInfo component but binding to 'mother' prefix */}
          <FatherInfo 
            formik={formik} 
            prefix="mother" 
            bloodGroupOptions={bloodGroupOptions} 
          />


          {/* ================= PHOTO UPLOAD ================= */}
          <div className={styles.sectionTitle}>
             <span>Family Group Photo</span> 
             <img src={BorderIcon} alt="border" />
          </div>

          <div className={styles.uploadWrapper}>
             <input 
               type="file" 
               id="familyPhoto" 
               hidden 
               accept="image/*"
               onChange={handlePhotoUpload}
             />
             <label htmlFor="familyPhoto" className={styles.uploadButton}>
               <UploadIcon /> {photoPreview ? "Change Photo" : "Upload Photo"}
             </label>
             {photoPreview && (
               <div className={styles.previewContainer}>
                 <img src={photoPreview} alt="Preview" className={styles.photoPreview} />
                 <span className={styles.fileName}>{values.familyGroupPhotoFile?.name}</span>
               </div>
             )}
          </div>


          {/* ================= DYNAMIC MEMBERS ================= */}
          <FieldArray name="otherMembers">
            {({ push, remove }) => (
              <>
                {values.otherMembers.map((member, index) => (
                  <AddFieldWidget
                    key={index}
                    index={index}
                    title={`Family Member ${index + 1}`}
                    forceFieldset={true} 
                    enableFieldset={true}
                    onRemove={() => remove(index)}
                  >
                    <div className={styles.sectionBlock}>
                      <div className={styles.row}>
                        <Inputbox
                          label="Name"
                          name={`otherMembers.${index}.fullName`}
                          value={member.fullName}
                          onChange={handleChange}
                          placeholder="Enter Name"
                        />
                        
                        <Dropdown
                           dropdownname="Relation"
                           name={`otherMembers.${index}.relationId`}
                           results={["Brother", "Sister", "Spouse", "Child"]} 
                           value={member.relationId}
                           onChange={handleChange}
                        />
                        
                        <Dropdown
                           dropdownname="Blood Group"
                           name={`otherMembers.${index}.bloodGroupId`}
                           results={bloodGroupOptions} 
                           value={member.bloodGroupId} 
                           onChange={handleChange}
                        />
                      </div>

                      <div className={styles.row}>
                        <Inputbox
                          label="Occupation"
                          name={`otherMembers.${index}.occupation`}
                          value={member.occupation}
                          onChange={handleChange}
                          placeholder="Enter Occupation"
                        />
                         <Inputbox
                          label="Phone"
                          name={`otherMembers.${index}.phoneNumber`}
                          value={member.phoneNumber}
                          onChange={handleChange}
                          placeholder="Enter Phone Number"
                        />
                      </div>
                    </div>
                  </AddFieldWidget>
                ))}

                <div className={styles.addFamilyWrapper}>
                  <button
                    type="button"
                    className={styles.addFamilyBtn}
                    onClick={() => push(initialOtherMember)}
                  >
                    + Add Family Member
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

export default FamilyInfo;