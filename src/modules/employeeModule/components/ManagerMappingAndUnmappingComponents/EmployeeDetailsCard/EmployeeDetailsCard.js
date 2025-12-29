import React, { useState } from 'react';
import styles from './EmployeeDetailsCard.module.css';
import profilePhoto from 'assets/ManagerMappingAndUnmappingAssets/profilePhoto.svg';
import iconSvg from 'assets/ManagerMappingAndUnmappingAssets/icon.svg';
import callIcon from 'assets/ManagerMappingAndUnmappingAssets/Call.svg';
import emailIcon from 'assets/ManagerMappingAndUnmappingAssets/email.svg';
import minMaxIcon from 'assets/ManagerMappingAndUnmappingAssets/minAndMaxIcon.svg';
import maximizeIcon from 'assets/ManagerMappingAndUnmappingAssets/Maximize.svg';
import lineDecorator from 'assets/ManagerMappingAndUnmappingAssets/lineDecorator.svg';

const EmployeeDetailsCard = ({ employee, hideHeader = false }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggle = (e) => {
    e.stopPropagation();
    setIsCollapsed(!isCollapsed);
  };
  const employeeData = employee || {
    id: 'HYD 5627182',
    name: 'Devansh.N',
    department: 'IT Cell',
    level: 'Level 4',
    type: 'Permanent',
    campus: {
      name: 'Name Of The Campus',
      address: 'Infinity Towers, Plot No 2-91/31, Near N Convention Road, HITEC City, Hyderabad, Telangana 500081'
    },
    reportingManager: 'Vamsi Ramana',
    manager: 'Raja',
    project: 'IPL'
  };

  return (
    <div className={styles.employeeDetailsCard}>
      {!hideHeader && (
        <>
          {/* Top Section - Employee Header */}
          <div className={styles.employeeHeader}>
            <div className={styles.employeeProfile}>
              <figure>
                <img 
                  src={profilePhoto} 
                  alt="Employee Profile" 
                  className={styles.profileImage}
                />
              </figure>
            </div>
            <div className={styles.employeeInfo}>
              <div className={styles.employeeId}>{employeeData.id}</div>
              <div className={styles.employeeName}>{employeeData.name}</div>
              <div className={styles.employeeDepartment}>{employeeData.department}</div>
              <div className={styles.employeeTags}>
                <span className={`${styles.tag} ${styles.tagLevel}`}>{employeeData.level}</span>
                <span className={`${styles.tag} ${styles.tagPermanent}`}>{employeeData.type}</span>
              </div>
            </div>
          </div>
          
          {/* Decorative Line */}
          <div className={styles.decorativeLine}>
            <img src={lineDecorator}  />
          </div>
        </>
      )}
      
      {/* Campus Details Section - From Current Campus to IPL */}
      <div className={styles.campusDetailsWrapper}>
        <div className={`${styles.campusDetailsSection} ${isCollapsed ? styles.campusDetailsSectionCollapsed : ''}`}>
          {/* Current Campus Section */}
          <div className={styles.currentCampusSection}>
            <div className={styles.campusLeft}>
              <div className={styles.campusTopRow}>
                <div className={styles.campusIcon}>
                  <figure>
                    <img 
                      src={iconSvg} 
                      alt="Campus Icon" 
                      className={styles.campusIconImage}
                    />
                  </figure>
                </div>
                <div className={styles.campusTitleRow}>
                  <div className={styles.campusLabel}>Current Campus</div>
                  <div className={styles.campusName}>{employeeData.campus.name}</div>
                </div>
              </div>
              <div className={`${styles.campusAddress} ${isCollapsed ? styles.campusAddressHidden : ''}`}>
                {employeeData.campus.address}
              </div>
            </div>
            <div className={styles.campusIcons}>
            <div className={styles.iconCircle}>
              <figure>
                <img 
                  src={callIcon} 
                  alt="Call" 
                  className={styles.iconImage}
                />
              </figure>
            </div>
            <div className={styles.iconCircle}>
              <figure>
                <img 
                  src={emailIcon} 
                  alt="Email" 
                  className={styles.iconImage}
                />
              </figure>
            </div>
            <div className={`${styles.iconCircle} ${styles.iconRemap} ${isCollapsed ? styles.iconRemapCollapsed : ''}`} onClick={handleToggle}>
              <figure>
                <img 
                  src={isCollapsed ? maximizeIcon : minMaxIcon} 
                  alt="Toggle" 
                  className={styles.iconImage}
                />
              </figure>
            </div>
            </div>
          </div>
          
          <div className={`${styles.reportingManagerSection} ${isCollapsed ? styles.reportingManagerSectionHidden : ''}`}>
            <div className={styles.managerLeft}>
              <span className={styles.managerLabel}>Reporting Manager: </span>
              <span className={styles.managerName}>{employeeData.reportingManager || 'Vamsi Ramana'}</span>
            </div>
            <div className={styles.managerRight}>
              <div className={styles.managerPhoneIcon}>
                <figure>
                  <img 
                    src={callIcon} 
                    alt="Call Manager" 
                    className={styles.iconImage}
                  />
                </figure>
              </div>
            </div>
          </div>
          
          <div className={`${styles.reportingManagerSection} ${isCollapsed ? styles.reportingManagerSectionHidden : ''}`}>
            <div className={styles.managerLeft}>
              <span className={styles.managerLabel}>Manager: </span>
              <span className={styles.managerName}>{employeeData.manager}</span>
            </div>
            <div className={styles.managerRight}>
              <div className={styles.managerPhoneIcon}>
                <figure>
                  <img 
                    src={callIcon} 
                    alt="Call Manager" 
                    className={styles.iconImage}
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>
        
        <div className={`${styles.bottomBar} ${isCollapsed ? styles.bottomBarHidden : ''}`}>
          — {employeeData.project} —
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailsCard;

