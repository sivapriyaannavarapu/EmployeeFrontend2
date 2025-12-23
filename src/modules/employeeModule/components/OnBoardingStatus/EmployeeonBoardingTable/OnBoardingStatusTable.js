import React, { useState, useMemo } from "react";
import styles from "./OnBoardingStatusTable.module.css";
import rightarrow from 'assets/onboarding_status_table/rightarrow.svg';
import uparrow from 'assets/onboarding_status_table/uparrow.svg';
import downarrow from 'assets/onboarding_status_table/downarrow.svg';

const OnBoardingStatusTable = ({ selectedStatus, role, onEmployeeSelect }) => {
  const [pageIndex, setPageIndex] = useState(0);

  // 🔴 ADDED 'id' property to all templates
  const employeeTemplates = [
    { 
      id: "101", 
      name: "Surya", empNo: "HYD6123871", tempPayroll: "TEMP1978612", 
      joinDate: "28 June 2025", leftDate: "-", city: "Hyderabad", 
      campus: "Miyapur Girls Res.", gender: "Male", remarks: "No Remarks", 
      joiningStatus: "New", rejoiner: "New", kycStatus: "Request KYC", 
      verifyKyc: "Request KYC", status: "Pending With CO" 
    },
    { 
      id: "102", 
      name: "Vijay", empNo: "HYD263287", tempPayroll: "TEMP8139711", 
      joinDate: "14 March 2023", leftDate: "-", city: "Hyderabad", 
      campus: "Miyapur Girls Res.", gender: "Female", remarks: "No Remarks", 
      joiningStatus: "New", rejoiner: "Rejoin", kycStatus: "Submitted", 
      verifyKyc: "Verified", status: "Pending With DO" 
    },
    { 
      id: "103", 
      name: "Raju", empNo: "HYD999", tempPayroll: "TEMP999", 
      joinDate: "14 March 2023", leftDate: "-", city: "Hyderabad", 
      campus: "Miyapur", gender: "Male", remarks: "None", 
      joiningStatus: "New", rejoiner: "New", kycStatus: "Submitted", 
      verifyKyc: "Verified", status: "Completed" 
    },
  ];

  const getStatusBadgeClass = (status) => {
    if (status === "Completed") return styles.statusCompleted;
    if (status === "Pending With CO") return styles.statusPendingWithCO;
    if (status === "Pending With DO") return styles.statusPendingWithDO;
    return styles.statusDefault;
  };

  let filteredData = employeeTemplates;
  if (selectedStatus && selectedStatus !== "All") {
    filteredData = employeeTemplates.filter((row) => row.status === selectedStatus);
  }
  
  const pageSize = 50;
  const total = filteredData.length;
  const totalPages = Math.max(Math.ceil(total / pageSize), 1);
  const start = pageIndex * pageSize;
  const end = start + pageSize;
  const pagedData = filteredData.slice(start, end);
  const prevDisabled = pageIndex === 0;
  const nextDisabled = pageIndex + 1 >= totalPages;

  const columns = useMemo(() => {
    const baseColumns = [
      "EMPLOYEE NAME", "EMPLOYEE NUMBER", "TEMP PAYROLL", "JOIN DATE",
      "LEFT DATE", "CITY", "CAMPUS", "GENDER", "REMARKS",
      "JOINING STATUS", "STATUS",
    ];
    if (role === "CO") {
      const idx = baseColumns.indexOf("JOINING STATUS");
      baseColumns.splice(idx + 1, 0, "REJOINER", "KYC STATUS", "VERIFY KYC");
    }
    return baseColumns;
  }, [role]);

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((header, index) => (
                <th key={index}>
                  <div className={styles.sortableHeader}>
                    <span>{header}</span>
                    <div className={styles.sortIcons}>
                      <img src={uparrow} alt="Up" className={styles.arrowUp} />
                      <img src={downarrow} alt="Down" className={styles.arrowDown} />
                    </div>
                  </div>
                </th>
              ))}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {pagedData.map((row, index) => (
              <tr 
                key={index}
                // 🔴 CLICK HANDLER ON ROW
                onClick={() => onEmployeeSelect(row)}
                style={{ cursor: "pointer" }}
                className={styles.clickableRow}
              >
                <td>{row.name}</td>
                <td>{row.empNo}</td>
                <td>{row.tempPayroll}</td>
                <td>{row.joinDate}</td>
                <td>{row.leftDate}</td>
                <td>{row.city}</td>
                <td>{row.campus}</td>
                <td>{row.gender}</td>
                <td>{row.remarks}</td>
                <td>{row.joiningStatus}</td>

                {role === "CO" && (
                  <>
                    <td>{row.rejoiner}</td>
                    <td>{row.kycStatus}</td>
                    <td>{row.verifyKyc}</td>
                  </>
                )}

                <td>
                  <span className={`${styles.statusBadge} ${getStatusBadgeClass(row.status)}`}>
                    {row.status}
                  </span>
                </td>

                <td>
                  <img src={rightarrow} alt="Arrow" className={styles.arrowIcon} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* ... Pagination UI ... */}
    </div>
  );
};

export default OnBoardingStatusTable;