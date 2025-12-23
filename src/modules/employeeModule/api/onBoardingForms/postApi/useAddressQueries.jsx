import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Adjust these base URLs to match your environment
const API_8080 = "http://localhost:8080/api/employee"; 
const API_9000 = "http://localhost:9000/common/get";

/* ---------------- PINCODE & CITY QUERIES (Existing) ---------------- */

export const usePincodeQuery = (pincode, enabled = true) =>
  useQuery({
    queryKey: ["pincode", pincode],
    queryFn: async () => {
      const { data } = await axios.get(`${API_9000}/${pincode}`);
      return data;
    },
    enabled: enabled && pincode?.length === 6,
    retry: false,
  });

export const useCitiesByDistrict = (districtId) =>
  useQuery({
    queryKey: ["cities", districtId],
    queryFn: async () => {
      // Note: Adjust path if your city API is different, 
      // keeping it consistent with your previous snippets.
      const { data } = await axios.get(
        `http://localhost:8080/api/employeeModule/cities/district/${districtId}`
      );
      return Array.isArray(data) ? data : [];
    },
    enabled: Number(districtId) > 0,
    retry: false,
  });

/* ---------------- POST ADDRESS API ---------------- */

export const postAddressInfo = async (tempPayrollId, payload) => {
  // URL: http://localhost:8080/api/employee/tab/address-info?tempPayrollId=588
  const response = await axios.post(
    `${API_8080}/tab/address-info`, 
    payload,
    {
      params: { tempPayrollId: tempPayrollId } 
    }
  );
  return response.data;
};