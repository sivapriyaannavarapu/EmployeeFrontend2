import React from "react";
import BankInfoWidget from 'widgets/InfoCard/BankInfoWidget';
import styles from "../EmployeeNavOverview/CategoryInfoContainer.module.css"
const CategoryInfoContainer =() => {

    const categoryInfo =[
        {label: "EmployeeType", value:"Full Time"},
        {label:"Department", value:"TeachingStaff"},
        {label:"Designation",value:"Junior Professer"},
        {label:"subject",value:"Physics"},
        {label:"Agreed Periods Per Weak",value:"14 Periods"},
        {label:"Orientation",value:"Neon"}
    ];

    return (
        <div className={styles.category_Info_Container}>
            <div className={styles.category_accordians}>
                <BankInfoWidget title="Category Info" data={categoryInfo} onEdit={() => alert("Edit Category Info clicked")}/>
            </div>
        </div>
    );

};

export default CategoryInfoContainer;