import React, { useMemo } from "react";
import { Routes, Route, useLocation, useNavigate, Navigate, useParams } from "react-router-dom";
import GenericNavTabs from "widgets/NavTabs/GenericNavTabs";
import Styles from "./EmployeeNavtabs.module.css";
 
// Content Components
import EmployeModule from "../EmployeeModule/EmployeeModule";
import FamilyInfo from "../../../containers/FamilyAddressInfoMainContainer/FAmilyAddressInfoContainer";
import EmployeeQualificationDetailsContainer from "../../../containers/EmployeeQualificationDetails/EmployeeQualificationDetailsContainer";
import EmployeeDocumentsContainer from "../../../components/EmployeeOverViewScreens/EmpDocuments/EmpDocuments";
import BankDetailsContainer from "../../../containers/BankDetailsContainer/BankDetailsConatiner";
import AgreementsDetails from "../../../containers/AgreementsConatiner/AgreementsDetailsContainer";
 
import SalaryDetailsContainer from "modules/employeeModule/containers/SalaryDetailsContainer/SalaryDetailsContainer";
 
const EmployeeNavtabs = () => {
  const location = useLocation();
  const { employeeId } = useParams(); // ✅ Get the ID directly
 
  // 🛠️ CRITICAL FIX: Robust Base Path Calculation
  // We want everything up to the employeeId.
  // URL: .../hr-overview/101/qualificationDetails/bachelors
  // Result: .../hr-overview/101
  const getBasePath = () => {
    if (!employeeId) return "";
    // Split the path by the ID and take the first part + the ID
    const parts = location.pathname.split(employeeId);
    return parts[0] + employeeId;
  };
 
  const basePath = getBasePath();
 
  // 2. Tabs Config - Now always absolute paths from the clean base
  const tabs = useMemo(() => [
    { id: 1, label: "Basic Info", path: `${basePath}/basic-info` },
    { id: 2, label: "Family & Address Info", path: `${basePath}/family-info` },
    { id: 3, label: "Qualification Details", path: `${basePath}/qualificationDetails` },
    { id: 4, label: "Documents", path: `${basePath}/documents` },
    { id: 5, label: "Bank Details", path: `${basePath}/bank-details` },
    { id: 6, label: "Agreements", path: `${basePath}/agreements` },
    { id: 7, label: "Salary Info", path: `${basePath}/salary-info` },
  ], [basePath]);
 
  return (
    <div className={Styles.container}>
      <GenericNavTabs tabs={tabs} />
 
      <div className={Styles.tabContent}>
        <Routes>
          <Route path="/" element={<Navigate to="basic-info" replace />} />
          <Route path="basic-info" element={<EmployeModule />} />
          <Route path="family-info" element={<FamilyInfo />} />
          <Route path="qualificationDetails/*" element={<EmployeeQualificationDetailsContainer />} />
          <Route path="documents/*" element={<EmployeeDocumentsContainer />} />
          <Route path="agreements" element={<AgreementsDetails />} />
          <Route path="bank-details" element={<BankDetailsContainer/>} />
          <Route path="salary-info" element={<SalaryDetailsContainer/>} />
        </Routes>
      </div>
    </div>
  );
};
 
export default EmployeeNavtabs;