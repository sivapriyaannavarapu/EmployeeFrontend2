import React from "react";
import { Routes, Route, useNavigate, useParams, Outlet, Navigate, useLocation } from "react-router-dom";

// --- 🧩 Components ---
import EmployeeOnboardingHeader from "../../components/EmployeeModuleHeaderComponent/EmployeeOnboardingHeader";
import OnBoardingEmployeeNav from "../../components/OnBoardingStatus/OnBoardingEmployeeNav/OnBoardingEmployeeNav";
import AddSalaryDetails from "../../components/OnBoardingStatus/EmployeeNavOverview/AddSalaryDetails";
import EmployeeChecklist from "../../components/OnBoardingStatus/DOChecklist/EmployeeChecklist";
import EmployeeProfileContainer from "../EmployeeProfileContainer/EmployeeProfileConytainer";
import OnBoardingStatusLayout from "../../components/OnBoardingStatus/EmployeeonBoardingTable/OnBoardingStatusLayout";
import SkillTestApprovalHeader from "../../components/SkillTestProfileCard/SkillTestApprovalHeader";
// src/modules/employeeModule/containers/EmployeeModuleConatiner/EmployeeModuleConatianer.jsx

import SkillTestView from "../../components/SkillTestProfileCard/SkillTestView";

import Styles from "./EmployeeModuleConatiner.module.css";

// ============================================================================
// 1. DETAIL LAYOUT WRAPPER
// ============================================================================
const EmployeeDetailLayout = ({ role }) => {
  const navigate = useNavigate();
  const { employeeId } = useParams();
  const location = useLocation();

  const isSkillTest = location.pathname.includes("skill-test");
  const isChecklist = location.pathname.includes("checklist");
  
  // 🔴 FIX: Strict check for "Add Salary" page (prevents conflict with "salary-info" tab)
  const isAddSalaryPage = location.pathname.endsWith("/salary"); 

  // Onboarding is active if we aren't on specific sub-pages
  const isOnboarding = location.pathname.includes("onboarding") && !isAddSalaryPage && !isChecklist;

  const getStep = () => {
    if (isSkillTest) return 0;
    if (isOnboarding) return 1; // Includes 'salary-info' tab
    if (isAddSalaryPage) return 2;
    if (isChecklist) return role === "DO" ? 3 : 2;
    return 0;
  };

  const getSubHeading = () => {
    if (isSkillTest) return "Skill Test Approval";
    // 🔴 FIX: Only show "Add Salary Details" for the specific form, not the tab
    if (isAddSalaryPage) return "Add Salary Details"; 
    if (isChecklist) return "CheckList";
    return "Employee Preview"; // Default for all Onboarding tabs (including Salary Info)
  };

  const getBaseScopeUrl = () => {
    if (role === "HR") return "/scopes/employee/hr-review";
    if (role === "CO") return "/scopes/employee/co-review";
    return "/scopes/employee/do-review";
  };

  const handleBack = () => {
    const baseUrl = getBaseScopeUrl();
    if (isAddSalaryPage || isChecklist) {
      navigate(`${baseUrl}/${employeeId}/onboarding/working-info`);
    } else {
      navigate(`${baseUrl}/onboarding`);
    }
  };

  return (
    <div className={Styles.widthpp}>
      <div className={Styles.moduleWrapper}>
        {isSkillTest ? (
          <SkillTestApprovalHeader 
             onBack={() => navigate(`${getBaseScopeUrl()}/skillTest`)} 
          />
        ) : (
          <EmployeeOnboardingHeader
            step={getStep()}
            totalSteps={role === "DO" ? 3 : 2}
            subHeading={getSubHeading()}
            onBack={handleBack}
          />
        )}
        <div className={Styles.mainContainer}>
          {!isSkillTest && <EmployeeProfileContainer employeeId={employeeId} />}
          <div className={Styles.navSection}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 2. MAIN CONTAINER
// ============================================================================
const EmployeeModuleContainer = ({ role }) => {
  const navigate = useNavigate();

  const getBasePath = () => {
    if (role === "HR") return "/scopes/employee/hr-review";
    if (role === "CO") return "/scopes/employee/co-review";
    return "/scopes/employee/do-review";
  };

  const handleEmployeeSelect = (employee) => {
    const empId = employee.id || employee._id || employee.employeeId;
    if (!empId) {
      console.error("Employee ID missing:", employee);
      return;
    }

    const basePath = getBasePath();
    const status = employee.status || "";

    if (status === "Skill Test Approval" || employee.skillTest === true) {
      navigate(`${basePath}/${empId}/skill-test`);
      return;
    }

    if (role === 'HR') {
       navigate(`${basePath}/${empId}/onboarding/working-info`);
       return;
    }

    if (status === "Completed") {
      navigate(`${basePath}/${empId}/onboarding/checklist`);
    } else {
      navigate(`${basePath}/${empId}/onboarding/working-info`);
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="onboarding" replace />} />

      <Route 
        path="onboarding" 
        element={<div className={Styles.widthpptable}><OnBoardingStatusLayout role={role} onEmployeeSelect={handleEmployeeSelect} /></div>} 
      />
      <Route 
        path="skillTest" 
        element={<div className={Styles.widthpptable}><OnBoardingStatusLayout role={role} onEmployeeSelect={handleEmployeeSelect} /></div>} 
      />

      <Route path=":employeeId" element={<EmployeeDetailLayout role={role} />}>
        <Route index element={<Navigate to="onboarding/working-info" replace />} />

        {/* ⚠️ SPECIFIC ROUTES FIRST */}
        
        {/* 1. Salary (DO Only - Standalone Step) */}
        <Route 
          path="onboarding/salary" 
          element={<WrapperSalary />} 
        />

        {/* 2. Checklist */}
        <Route 
          path="onboarding/checklist" 
          element={<EmployeeChecklist role={role} onBack={() => navigate(-1)}/>} 
        />

        {/* 3. Onboarding Flow (Includes 'salary-info' tab for CO/HR) */}
        <Route 
          path="onboarding/:stepId" 
          element={<WrapperOnboarding role={role} />} 
        />

        {/* 4. Skill Test View */}
        <Route 
           path="skill-test" 
           element={<SkillTestView />} 
        />
      </Route>
    </Routes>
  );
};

// ============================================================================
// 3. HELPER WRAPPERS
// ============================================================================

const WrapperOnboarding = ({ role }) => {
  const navigate = useNavigate();
  return (
    <OnBoardingEmployeeNav
      role={role}
      onFinish={() => role === 'DO' ? navigate("../onboarding/salary") : navigate("../onboarding/checklist")}
    />
  );
};

const WrapperSalary = () => {
  const navigate = useNavigate();
  return (
    <AddSalaryDetails
      onBack={() => navigate("../onboarding/account-info")} 
      onSubmitComplete={() => navigate("../onboarding/checklist")}     
    />
  );
};

export default EmployeeModuleContainer;