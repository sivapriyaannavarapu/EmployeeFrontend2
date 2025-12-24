import React from "react";
import BankInfoWidget from 'widgets/InfoCard/BankInfoWidget';
import styles from "../EmployeeNavOverview/CategoryInfoContainer.module.css"

const AddressInfo = () => {
     const addressInfo =[
        {label: "State", value:"Andhra Pradesh"},
        {label:"District", value:"Kurnool"},
        {label:"City",value:"Hyderabad"},
        {label:"Address Line 1",value:"14-5-67/A"},
        {label:"Address Line 2",value:"Near Bus Stand"},
    ];

    return (
        <div className={styles.address_Info_Container}>
            <div className={styles.address_accordians}>
                <BankInfoWidget title="Address Info" data={addressInfo} onEdit={() => alert("Edit Address Info clicked")}/>
            </div>
        </div>
    );
}

export default AddressInfo;