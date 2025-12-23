import { useFormik } from "formik";
import { useAuth } from "useAuth"; 
import { postFamilyInfo } from "modules/employeeModule/api/onBoardingForms/postApi/useFamilyQueries";

// --- Defaults ---
const memberDefaults = {
  fullName: "",
  adhaarNo: "",
  isLate: false,
  occupation: "",
  genderId: "",     
  bloodGroupId: "", 
  email: "",
  nationality: "",
  phoneNumber: "",
  relationId: "",   
  dateOfBirth: "",
  isDependent: false,
  isSriChaitanyaEmp: false,
  parentEmpId: "",  
};

export const useFamilyInfoFormik = ({ tempId, onSuccess }) => {
  const { user } = useAuth();
  const hrEmployeeId = user?.employeeId || 5109;

  const formik = useFormik({
    initialValues: {
      // We keep them separate in state for easier UI management
      father: { ...memberDefaults, relationId: 1, genderId: 1 }, // 1 = Father, 1 = Male
      mother: { ...memberDefaults, relationId: 2, genderId: 2 }, // 2 = Mother, 2 = Female
      otherMembers: [], // Array for siblings/spouse
    },

    onSubmit: async (values) => {
      if (!tempId) {
        alert("Temporary ID is missing.");
        return;
      }

      console.log("🚀 Submitting Family Info...");

      // --- 1. DATA TRANSFORMATION ---
      const allMembers = [];

      // Helper to clean data (convert strings to numbers where needed)
      const sanitizeMember = (member) => {
        // Safe Date Parsing
        let formattedDOB = null;
        if (member.dateOfBirth) {
            try {
                formattedDOB = new Date(member.dateOfBirth).toISOString();
            } catch (e) {
                console.warn("Invalid date for member:", member.fullName);
                formattedDOB = null;
            }
        }

        return {
          fullName: member.fullName,
          adhaarNo: Number(member.adhaarNo) || 0,
          isLate: Boolean(member.isLate),
          occupationId: 0, 
          occupation: member.occupation || "",
          genderId: Number(member.genderId) || 0,
          bloodGroupId: Number(member.bloodGroupId) || 0,
          email: member.email || "",
          nationality: member.nationality || "Indian",
          phoneNumber: member.phoneNumber || "",
          relationId: Number(member.relationId) || 0,
          dateOfBirth: formattedDOB, 
          isDependent: Boolean(member.isDependent),
          isSriChaitanyaEmp: Boolean(member.isSriChaitanyaEmp),
          // Only send parentEmpId if they are actually an employee
          parentEmpId: (member.isSriChaitanyaEmp && member.parentEmpId) 
              ? Number(member.parentEmpId) 
              : 0,
        };
      };

      // Add Father (if name exists)
      if (values.father.fullName) {
        allMembers.push(sanitizeMember(values.father));
      }

      // Add Mother (if name exists)
      if (values.mother.fullName) {
        allMembers.push(sanitizeMember(values.mother));
      }

      // Add Others
      values.otherMembers.forEach((mem) => {
        if (mem.fullName) {
          allMembers.push(sanitizeMember(mem));
        }
      });

      // --- 2. FINAL PAYLOAD ---
      const apiPayload = {
        familyMembers: allMembers,
        familyGroupPhotoPath: "string", // Placeholder until file upload logic is ready
        createdBy: hrEmployeeId,
        updatedBy: hrEmployeeId,
      };

      try {
        const response = await postFamilyInfo(tempId, apiPayload);
        console.log("✅ Family Info Saved:", response);
        if (onSuccess) onSuccess();
      } catch (error) {
        console.error("❌ Failed to save family info:", error);
      }
    },
  });

  return {
    formik,
    values: formik.values,
    setFieldValue: formik.setFieldValue,
    handleChange: formik.handleChange,
    submitForm: formik.submitForm,
  };
};