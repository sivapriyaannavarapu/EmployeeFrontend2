import React, { useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import EmployeeNavtabs from "../../components/EmployeeOverViewScreens/EmployeeNavtabs/Employeenavtabs";
import Styles from "../EmployeeModuleConatiner/EmployeeModuleConatiner.module.css";
import EmployeeProfileContainer from "../ProfileOverViewConatiner/EmployeeProfileConytainer";

const EmployeeOverviewHRContainer = () => {
    // Extract employeeId from the URL (e.g., /scopes/employee/overview/EMP123 -> EMP123)
    const { employeeId } = useParams();

    useEffect(() => {
        if (employeeId) {
            console.log("Current Employee Code:", employeeId);
            // You can trigger specific API calls here if needed, 
            // or let the child components handle it via the prop.
        }
    }, [employeeId]);

    return (
        <div className={Styles.container}>
            {/* Pass the employeeId down to the components that need to fetch data */}
            <EmployeeProfileContainer employeeId={employeeId} />
            <EmployeeNavtabs employeeId={employeeId} />
        </div>
    );
};

export default EmployeeOverviewHRContainer;