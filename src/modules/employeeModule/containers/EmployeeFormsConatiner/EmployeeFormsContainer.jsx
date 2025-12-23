// import React, { useState, useMemo, useRef } from "react";
// import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "useAuth"; // Adjust path as needed

// // Components
// import EmployeeOnboardingHeader from "../../components/EmployeeModuleHeaderComponent/EmployeeOnboardingHeader";
// import EmployeeNavTabOnBoarding from "../../components/EmployeeOnBoardingForms/EmployeeOnBoardingFormNav/EmployeeNavtab";
// import OnboardingFooter from "../../components/OnBoardingStatus/OnBoardingEmployeeFooter/OnboardingFooter";
// import SuccessPage from "../../components/SuccessPage/SuccessPage";

// // Forms
// import QualificationForm from "../../components/EmployeeOnBoardingForms/FormsEmployee/Qualification&DocumentsUpload/QualificationForm";
// import UploadDocumentsForm from "../../components/EmployeeOnBoardingForms/FormsEmployee/Qualification&DocumentsUpload/UploadDocumentsForm";
// import BasicInfo from "../../components/EmployeeOnBoardingForms/FormsEmployee/BasicInfoForms/EmployeeOnboardingForm";
// import AddressInfoFormNew from "../../components/EmployeeOnBoardingForms/FormsEmployee/Address/AddressInfoForm";
// import FamilyInfo from "../../components/EmployeeOnBoardingForms/FormsEmployee/familyInfo/FamilyInfo";
// import PreviousEmployerInfo from "../../components/EmployeeOnBoardingForms/FormsEmployee/PreviousEmployeeInfo/PreviousEmployeeInfo";
// import AgreementInfoForm from "../../components/EmployeeOnBoardingForms/FormsEmployee/AgreementInfoForm/AgreementInfoForm";
// import CategoryInfo from "../../components/EmployeeOnBoardingForms/FormsEmployee/CategoryInfoForm/CategoryInfoForm";
// import BankInfo from "../../components/EmployeeOnBoardingForms/FormsEmployee/BankInfoForm/BankInfoForm";
// import SalaryInfoForm from "../../components/EmployeeOnBoardingForms/FormsEmployee/SalaryInfo/salaryInfoForm";

// // Config
// import { onboardingSteps } from "../../config/onboardingTabs";
// import styles from "./EmployeeFormsContainer.module.css";

// const NewEmployeeOnboardingForms = ({ hideSalary = false }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { user } = useAuth();

//   const role = user?.roles?.[0] || "DO"; // Default to DO
//   const isHR = role === "HR";

//   // Form Ref
//   const basicInfoFormikRef = useRef(null);

//   // State
//   const [tempId, setTempId] = useState("");
//   const [showSuccess, setShowSuccess] = useState(false);

//   const handleTempIdGenerated = (generatedId) => {
//     setTempId(generatedId);
//     setShowSuccess(true);
//   };

//   // Filter Steps
//   const activeSteps = useMemo(() => {
//     if (hideSalary) {
//       return onboardingSteps.filter((step) => step.path !== "salary-info");
//     }
//     return onboardingSteps;
//   }, [hideSalary]);

//   // --- Path Logic ---
//   // Get the current step from the URL URL last segment
//   const pathParts = location.pathname.replace(/\/$/, "").split("/");
//   const lastSegment = pathParts[pathParts.length - 1];

//   // Base path is everything before the current step
//   // e.g., /scopes/employee/do-new-employee-onboarding
//   const basePath = activeSteps.some((s) => s.path === lastSegment)
//     ? pathParts.slice(0, -1).join("/")
//     : location.pathname.replace(/\/$/, "");

//   let currentStep = activeSteps.findIndex((s) => s.path === lastSegment);
//   if (currentStep === -1) currentStep = 0;

//   const totalSteps = activeSteps.length;

//   // --- Navigation Handlers ---

//   const goBack = () => {
//     if (currentStep > 0) {
//       // Go to previous tab
//       navigate(`${basePath}/${activeSteps[currentStep - 1].path}`);
//     } else {
//       // 🔴 FIX: If on first step, go back to Employee Landing Page
//       navigate("/scopes/employee");
//     }
//   };

//   const handleNextStep = () => {
//     // Step 0: Submit Basic Info Form to get Temp ID
//     if (currentStep === 0) {
//       basicInfoFormikRef.current?.submitForm();
//       return;
//     }

//     // Last Step: Submit & Finish
//     if (currentStep === totalSteps - 1) {
//       // Logic to determine where to go after finishing
//       // Typically back to the status table for that role
//       let reviewPath = "do-review";
//       if(role === "HR") reviewPath = "hr-review";
//       if(role === "CO") reviewPath = "co-review";
//       if(role === "ADMIN") reviewPath = "admin-review";

//       navigate(`/scopes/employee/${reviewPath}/onboarding`);
//       return;
//     }

//     // Normal Step: Go Next
//     navigate(`${basePath}/${activeSteps[currentStep + 1].path}`);
//   };

//   return (
//     <div className={`${styles.mainContainer} ${isHR ? styles.hrContainer : ""}`}>
//       {/* HEADER */}
//       <div className={styles.headerWrapper}>
//         <EmployeeOnboardingHeader
//           step={currentStep + 1}
//           totalSteps={totalSteps}
//           onBack={goBack} // Connected to new logic
//           mainTitle={isHR ? "New Onboarding Management" : "New Employee Onboarding"}
//          subHeading={hideSalary ? "" : ""}
//         />
//       </div>

//       {/* TABS */}
//       {!showSuccess && (
//         <div className={styles.navTabsWrapper}>
//           <EmployeeNavTabOnBoarding
//             basePath={basePath}
//             steps={activeSteps}
//             disabled={!tempId} // Disable tabs until Temp ID is created
//           />
//         </div>
//       )}

//       {/* CONTENT (Nested Routes) */}
//       <div className={styles.contentArea}>
//         <Routes>
//           <Route index element={<Navigate to="basic-info" replace />} />
          
//           <Route 
//             path="basic-info" 
//             element={
//               <BasicInfo 
//                 ref={basicInfoFormikRef} 
//                 onTempIdGenerated={handleTempIdGenerated} 
//               />
//             } 
//           />
//           <Route path="address-info" element={<AddressInfoFormNew />} />
//           <Route path="family-info" element={<FamilyInfo />} />
//           <Route path="previous-employer-info" element={<PreviousEmployerInfo />} />
//           <Route path="qualification" element={<QualificationForm />} />
//           <Route path="upload-documents" element={<UploadDocumentsForm />} />
//           <Route path="category-info" element={<CategoryInfo />} />
//           <Route path="bank-info" element={<BankInfo />} />
//           <Route path="agreements" element={<AgreementInfoForm />} />
          
//           {!hideSalary && (
//             <Route path="salary-info" element={<SalaryInfoForm />} />
//           )}
//         </Routes>
//       </div>

//       {/* FOOTER */}
//       {!showSuccess && (
//         <OnboardingFooter
//           currentStep={currentStep}
//           totalSteps={totalSteps}
//           allSteps={activeSteps}
//           role={role}
//           onNext={handleNextStep}
//           onBack={goBack}
//           hideSkip
//           primaryButtonLabel={
//             currentStep === 0
//               ? "Create Temp ID and Proceed"
//               : currentStep === totalSteps - 1
//               ? "Forward To Divisional Officer"
//               : null
//           }
//         />
//       )}

//       {/* SUCCESS MODAL */}
//       {showSuccess && (
//         <SuccessPage
//           mode="modal"
//           title="Temp Id Generated Successfully"
//           onClose={() => setShowSuccess(false)}
//           onProceed={() => {
//             setShowSuccess(false);
//             navigate(`${basePath}/address-info`);
//           }}
//           proceedLabel="Proceed to Address Info"
//         />
//       )}
//     </div>
//   );
// };

// export default NewEmployeeOnboardingForms;
import React, { useState, useMemo, useRef } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "useAuth"; 

// Components
import EmployeeOnboardingHeader from "../../components/EmployeeModuleHeaderComponent/EmployeeOnboardingHeader";
import EmployeeNavTabOnBoarding from "../../components/EmployeeOnBoardingForms/EmployeeOnBoardingFormNav/EmployeeNavtab";
import OnboardingFooter from "../../components/OnBoardingStatus/OnBoardingEmployeeFooter/OnboardingFooter";
import SuccessPage from "../../components/SuccessPage/SuccessPage";

// Forms
import QualificationForm from "../../components/EmployeeOnBoardingForms/FormsEmployee/Qualification&DocumentsUpload/QualificationForm";
import UploadDocumentsForm from "../../components/EmployeeOnBoardingForms/FormsEmployee/Qualification&DocumentsUpload/UploadDocumentsForm";
import BasicInfo from "../../components/EmployeeOnBoardingForms/FormsEmployee/BasicInfoForms/EmployeeOnboardingForm";
import AddressInfoFormNew from "../../components/EmployeeOnBoardingForms/FormsEmployee/Address/AddressInfoForm";
import FamilyInfo from "../../components/EmployeeOnBoardingForms/FormsEmployee/familyInfo/FamilyInfo";
import PreviousEmployerInfo from "../../components/EmployeeOnBoardingForms/FormsEmployee/PreviousEmployeeInfo/PreviousEmployeeInfo";
import AgreementInfoForm from "../../components/EmployeeOnBoardingForms/FormsEmployee/AgreementInfoForm/AgreementInfoForm";
import CategoryInfo from "../../components/EmployeeOnBoardingForms/FormsEmployee/CategoryInfoForm/CategoryInfoForm";
import BankInfo from "../../components/EmployeeOnBoardingForms/FormsEmployee/BankInfoForm/BankInfoForm";
import SalaryInfoForm from "../../components/EmployeeOnBoardingForms/FormsEmployee/SalaryInfo/salaryInfoForm";

// Config
import { onboardingSteps } from "../../config/onboardingTabs";
import styles from "./EmployeeFormsContainer.module.css";

const NewEmployeeOnboardingForms = ({ hideSalary = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const role = user?.roles?.[0] || "DO";
  const isHR = role === "HR";

  // --- STATE ---
  const [tempId, setTempId] = useState(""); // Stores ID for all steps
  const [showSuccess, setShowSuccess] = useState(false);

  // --- REFS FOR EVERY STEP ---
  // These refs allow the Footer Button to trigger "submitForm()" inside the child
  const stepRefs = useRef({});

  // --- ACTIVE STEPS CALCULATION ---
  const activeSteps = useMemo(() => {
    if (hideSalary) return onboardingSteps.filter((step) => step.path !== "salary-info");
    return onboardingSteps;
  }, [hideSalary]);

  // --- PATH LOGIC ---
  const pathParts = location.pathname.replace(/\/$/, "").split("/");
  const lastSegment = pathParts[pathParts.length - 1];
  
  const basePath = activeSteps.some((s) => s.path === lastSegment)
    ? pathParts.slice(0, -1).join("/")
    : location.pathname.replace(/\/$/, "");

  let currentStepIndex = activeSteps.findIndex((s) => s.path === lastSegment);
  if (currentStepIndex === -1) currentStepIndex = 0;

  const totalSteps = activeSteps.length;
  const currentStepPath = activeSteps[currentStepIndex].path;

  // --- NAVIGATION HANDLERS ---

  // 1. Trigger Submission from Footer
  const handleNextClick = () => {
    const currentRef = stepRefs.current[currentStepPath];
    if (currentRef && currentRef.submitForm) {
      // Trigger the child's submit logic
      currentRef.submitForm(); 
    } else {
      console.warn(`No ref found or submitForm missing for step: ${currentStepPath}`);
      // Fallback: Just go next if no form logic (e.g. static pages)
      handleStepSuccess(); 
    }
  };

  // 2. Called by Child Component AFTER successful API save
  const handleStepSuccess = () => {
    // If it's the first step, we just generated the ID, show modal
    if (currentStepIndex === 0) {
       // Logic moved to BasicInfo's onTempIdGenerated callback, 
       // but we can handle standard navigation here for others.
       return; 
    }

    // Last Step? Redirect to Review
    if (currentStepIndex === totalSteps - 1) {
      let reviewPath = "do-review";
      if(role === "HR") reviewPath = "hr-review";
      if(role === "CO") reviewPath = "co-review";
      if(role === "ADMIN") reviewPath = "admin-review";
      navigate(`/scopes/employee/${reviewPath}/onboarding`);
      return;
    }

    // Normal Step? Go to next route
    navigate(`${basePath}/${activeSteps[currentStepIndex + 1].path}`);
  };

  // 3. Special Handler for Step 1 (Basic Info)
  const handleTempIdGenerated = (generatedId) => {
    setTempId(generatedId);
    setShowSuccess(true); // Shows the Modal
  };

  const goBack = () => {
    if (currentStepIndex > 0) {
      navigate(`${basePath}/${activeSteps[currentStepIndex - 1].path}`);
    } else {
      navigate("/scopes/employee");
    }
  };

  // Helper to assign refs dynamically
  const assignRef = (path) => (el) => {
    stepRefs.current[path] = el;
  };

  return (
    <div className={`${styles.mainContainer} ${isHR ? styles.hrContainer : ""}`}>
      {/* HEADER */}
      <div className={styles.headerWrapper}>
        <EmployeeOnboardingHeader
          step={currentStepIndex + 1}
          totalSteps={totalSteps}
          onBack={goBack}
          mainTitle={isHR ? "New Onboarding Management" : "New Employee Onboarding"}
          subHeading={hideSalary ? "" : ""}
        />
      </div>

      {/* TABS */}
      {!showSuccess && (
        <div className={styles.navTabsWrapper}>
          <EmployeeNavTabOnBoarding
            basePath={basePath}
            steps={activeSteps}
            disabled={!tempId} 
          />
        </div>
      )}

      {/* CONTENT AREA */}
      <div className={styles.contentArea}>
        <Routes>
          <Route index element={<Navigate to="basic-info" replace />} />
          
          <Route 
            path="basic-info" 
            element={
              <BasicInfo 
                ref={assignRef("basic-info")} 
                onTempIdGenerated={handleTempIdGenerated} 
              />
            } 
          />
          <Route 
            path="address-info" 
            element={
              <AddressInfoFormNew 
                ref={assignRef("address-info")} 
                tempId={tempId} 
                onSuccess={handleStepSuccess}
              />
            } 
          />
          <Route 
            path="family-info" 
            element={
              <FamilyInfo 
                ref={assignRef("family-info")}
                tempId={tempId}
                onSuccess={handleStepSuccess}
              />
            } 
          />
          <Route 
            path="previous-employer-info" 
            element={
              <PreviousEmployerInfo 
                 ref={assignRef("previous-employer-info")}
                 tempId={tempId}
                 onSuccess={handleStepSuccess}
              />
            } 
          />
          <Route 
            path="qualification" 
            element={
              <QualificationForm 
                ref={assignRef("qualification")}
                tempId={tempId}
                onSuccess={handleStepSuccess}
              />
            } 
          />
          <Route 
             path="upload-documents" 
             element={
               <UploadDocumentsForm 
                 ref={assignRef("upload-documents")}
                 tempId={tempId}
                 onSuccess={handleStepSuccess}
               />
             } 
          />
          <Route 
            path="category-info" 
            element={
              <CategoryInfo 
                ref={assignRef("category-info")}
                tempId={tempId}
                onSuccess={handleStepSuccess}
              />
            } 
          />
          <Route 
             path="bank-info" 
             element={
               <BankInfo 
                 ref={assignRef("bank-info")}
                 tempId={tempId}
                 onSuccess={handleStepSuccess}
               />
             } 
          />
          <Route 
             path="agreements" 
             element={
               <AgreementInfoForm 
                 ref={assignRef("agreements")}
                 tempId={tempId}
                 onSuccess={handleStepSuccess}
               />
             } 
          />
          
          {!hideSalary && (
            <Route 
              path="salary-info" 
              element={
                <SalaryInfoForm 
                   ref={assignRef("salary-info")}
                   tempId={tempId}
                   onSuccess={handleStepSuccess}
                />
              } 
            />
          )}
        </Routes>
      </div>

      {/* FOOTER */}
      {!showSuccess && (
        <OnboardingFooter
          currentStep={currentStepIndex}
          totalSteps={totalSteps}
          allSteps={activeSteps}
          role={role}
          onNext={handleNextClick} // Triggers the Ref submit
          onBack={goBack}
          hideSkip
          primaryButtonLabel={
            currentStepIndex === 0
              ? "Create Temp ID and Proceed"
              : currentStepIndex === totalSteps - 1
              ? "Forward To Divisional Officer"
              : null
          }
        />
      )}

      {/* SUCCESS MODAL */}
      {showSuccess && (
        <SuccessPage
          mode="modal"
          title="Temp Id Generated Successfully"
          onClose={() => setShowSuccess(false)}
          onProceed={() => {
            setShowSuccess(false);
            navigate(`${basePath}/address-info`);
          }}
          proceedLabel="Proceed to Address Info"
        />
      )}
    </div>
  );
};

export default NewEmployeeOnboardingForms;