// modules/employeeModule/api/onBoardingForms/postApi/useFamilyQueries.js

import axios from "axios";

// 🔴 Adjust base URL to match your backend
const API_BASE = "http://localhost:8080/api/employee"; 

export const postFamilyInfo = async (tempPayrollId, payload) => {
  const url = `${API_BASE}/tab/family-info`;
  console.log("📡 POST Request URL:", url);
  console.log("📦 Payload:", JSON.stringify(payload, null, 2));

  const response = await axios.post(url, payload, {
    params: { tempPayrollId: tempPayrollId },
  });
  return response.data;
};