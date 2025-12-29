import React, { useState } from 'react';
import styles from './RemappingForm.module.css';
import Dropdown from 'widgets/Dropdown/Dropdown';
import Inputbox from 'widgets/Inputbox/InputBox';
import EmployeeDetailsCard from '../EmployeeDetailsCard/EmployeeDetailsCard';
import campusicon from 'assets/ManagerMappingAndUnmappingAssets/campusicon.svg';
import Button from 'widgets/Button/Button';
import conformicon from 'assets/ManagerMappingAndUnmappingAssets/conformicon';

const RemappingForm = ({ employee }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [remappedData, setRemappedData] = useState(null);
  
  const [formData, setFormData] = useState({
    location: 'Hyderabad',
    campus: 'Infinity Towers',
    department: '',
    designation: '',
    reportingManager: 'Venkat',
    manager: 'Raja',
    workingStartDate: '',
    remarks: ''
  });

  const [selectedCampuses, setSelectedCampuses] = useState([
    { id: 1, name: 'Infinity Towers' }
  ]);
  const [campusIdCounter, setCampusIdCounter] = useState(2);

  const locations = ['Hyderabad', 'Bangalore', 'Mumbai', 'Delhi', 'Chennai', 'Pune'];
  const campuses = ['Infinity Towers', 'Tech Park', 'Business Center', 'Corporate Hub'];
  const departments = ['IT Cell', 'HR', 'Finance', 'Marketing', 'Operations', 'Sales', 'Engineering', 'Support'];
  const designations = ['Software Engineer', 'Senior Software Engineer', 'Team Lead', 'Manager', 'Senior Manager', 'Director', 'Associate', 'Analyst'];
  const reportingManagers = ['Venkat', 'Vamsi Ramana', 'Raja', 'Kavitha Rao', 'Ramesh Iyer', 'Sunita Desai'];
  const managers = ['Raja', 'Venkat', 'Kavitha Rao', 'Ramesh Iyer', 'Sunita Desai', 'Amit Verma'];

  // Define form fields configuration
  const formFields = [
    {
      type: 'dropdown',
      name: 'location',
      label: 'Location',
      options: locations,
      value: formData.location
    },
    {
      type: 'dropdown',
      name: 'campus',
      label: 'Campus',
      options: campuses,
      value: formData.campus
    },
    {
      type: 'dropdown',
      name: 'department',
      label: 'Department',
      options: departments,
      value: formData.department
    },
    {
      type: 'dropdown',
      name: 'designation',
      label: 'Designation',
      options: designations,
      value: formData.designation
    },
    {
      type: 'dropdown',
      name: 'reportingManager',
      label: 'Reporting Manager',
      options: reportingManagers,
      value: formData.reportingManager
    },
    {
      type: 'dropdown',
      name: 'manager',
      label: 'Manager',
      options: managers,
      value: formData.manager
    },
    {
      type: 'input',
      name: 'workingStartDate',
      label: 'Working Start Date',
      inputType: 'date',
      placeholder: 'Select Date'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // If campus is selected, replace the previous one with the new selection
    if (name === 'campus' && value) {
      setSelectedCampuses([{ id: campusIdCounter, name: value }]);
      setCampusIdCounter(prev => prev + 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create remapped employee object with new data
    const campusAddress = 'Infinity Towers, Plot No 2-91/31, Near N Convention Road, HITEC City, Hyderabad, Telangana 500081';
    const remappedEmployee = {
      ...employee,
      campus: {
        name: formData.campus || employee?.campus?.name || 'Name Of The Campus',
        address: campusAddress
      },
      reportingManager: formData.reportingManager || employee?.reportingManager || 'Venkat',
      manager: formData.manager || employee?.manager || 'Raja'
    };
    
    setRemappedData(remappedEmployee);
    setIsSubmitted(true);
    console.log('Form submitted:', formData);
  };

  const handleRemoveCampus = (id) => {
    setSelectedCampuses(selectedCampuses.filter(campus => campus.id !== id));
  };

  return (
    <div className={styles.remappingFormSection}>
      {!isSubmitted ? (
        <>
          <h3 className={styles.remappingTitle}>Re-Mapping</h3>
          <form className={styles.remappingForm} onSubmit={handleSubmit}>
            {formFields.map((field) => (
              <div key={field.name} className={styles.formGroup}>
                {field.type === 'dropdown' ? (
                  <Dropdown
                    dropdownname={field.label}
                    results={field.options}
                    value={field.value}
                    name={field.name}
                    onChange={handleInputChange}
                    dropdownsearch={false}
                  />
                ) : (
                  <Inputbox
                    label={field.label}
                    id={field.name}
                    name={field.name}
                    type={field.inputType}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    placeholder={field.placeholder}
                    inputRule="none"
                  />
                )}
              </div>
            ))}

        <div className={styles.selectedCampusesSection}>
          <label className={styles.selectedCampusesLabel}>Selected Campuses</label>
          <div className={styles.selectedCampusesList}>
            {selectedCampuses.map(campus => (
              <div key={campus.id} className={styles.campusChip}>
                <div className={styles.campusChipIcon}>
                  <img src={campusicon} alt="Campus Icon" />
                </div>
                <div className={styles.campusChipContent}>
                  <div className={styles.campusChipLabel}>Campus Name</div>
                  <div className={styles.campusChipName}>{campus.name}</div>
                </div>
                <button 
                  type="button"
                  className={styles.campusChipClose}
                  onClick={() => handleRemoveCampus(campus.id)}
                  aria-label="Remove campus"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="remarks">Remarks</label>
          <textarea
            id="remarks"
            name="remarks"
            value={formData.remarks}
            onChange={handleInputChange}
            placeholder="Enter Remarks"
            rows="4"
          />
        </div>

        <div className={styles.formActions}>
              <Button
                buttonname="Confirm"
                type="submit"
                variant="primary"
                righticon={conformicon || (
                  // Fallback inline white checkmark in circle
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="9" stroke="white" strokeWidth="2"/>
                    <path d="M6 10L9 13L14 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
                width="142px" // Adjust as needed
              />
            </div>
      </form>
        </>
      ) : (
        remappedData && <EmployeeDetailsCard employee={remappedData} hideHeader={true} />
      )}
    </div>
  );
};

export default RemappingForm;

