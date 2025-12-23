// Simple validation utilities
export const validateField = (value, rules) => {
  for (const rule of rules) {
    const error = rule(value);
    if (error) return error;
  }
  return null;
};

export const validationRules = {
  required: (message = 'This field is required') => (value) => 
    !value || value.trim() === '' ? message : null,
  
  email: (message = 'Invalid email format') => (value) => 
    value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? message : null,
  
  phone: (message = 'Phone must be 10 digits') => (value) => 
    value && !/^[0-9]{10}$/.test(value) ? message : null,
  
  pin: (message = 'Pin must be 6 digits') => (value) => 
    value && !/^[0-9]{6}$/.test(value) ? message : null
};

export const addressValidationSchema = {
  name: [validationRules.required('Name is required')],
  addressLine1: [validationRules.required('Address Line 1 is required')],
  pin: [validationRules.required('Pin is required'), validationRules.pin()],
  city: [validationRules.required('City is required')],
  state: [validationRules.required('State is required')],
  country: [validationRules.required('Country is required')],
  phone: [validationRules.required('Phone is required'), validationRules.phone()],
  email: [validationRules.required('Email is required'), validationRules.email()],
  landmark: [validationRules.required('Landmark is required')],
  pincode: [validationRules.required('Pincode is required'), validationRules.pin()]
};
