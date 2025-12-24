export const defaultCountries = [{ id: 1, name: "India" }];

export const createAddressFields = (
  cities = [],
  states = [],
  countries = [],
  districts = []
) => [
  { key: "name", label: "Name", type: "input", placeholder: "Enter Employee Name" },
  { key: "addressLine1", label: "Address Line 1", type: "input", placeholder: "Enter Address Line 1" },
  { key: "addressLine2", label: "Address Line 2", type: "input", placeholder: "Enter Address Line 2" },
  {
    key: "countryId",
    label: "Country",
    type: "dropdown",
    options: countries,
    disabled: true,
  },
  {
    key: "stateId",
    label: "State",
    type: "dropdown",
    options: states,
    disabled: true,
  },
  {
    key: "districtId",
    label: "District",
    type: "dropdown",
    options: districts,
    disabled: true,
  },
  {
    key: "cityId",
    label: "City",
    type: "dropdown",
    options: cities,
  },
  { key: "pin", label: "Pincode", type: "autofill" },
  { key: "phoneNumber", label: "Phone Number", type: "phone" },
];
