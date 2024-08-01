import React, {useState} from "react";
import PendingEmployee from "./pendingEmployee";
import AcceptedEmployee from "./acceptedEmployee";

const Tabs = () => {
    const [activeTab, setActiveTab] = useState("tab1");
    //  Functions to handle Tab Switching
    const handleTab1 = () => {
        // update the state to tab1
        setActiveTab("tab1");
    };
    const handleTab2 = () => {
        // update the state to tab2
        setActiveTab("tab2");
    };
    return (

        <div className="sub-con emp">
            <ul className="nav">
                <li id={"tab1"}
                    className={activeTab === "tab1" ? "active" : ""}
                    onClick={handleTab1}
                >
                    الموظفين المقدمين
                </li>
                <li id={"tab2"}
                    className={activeTab === "tab2" ? "active" : ""}
                    onClick={handleTab2}
                >
                    الموظفين المقبولين
                </li>
            </ul>

            <div className="outlet">
                {activeTab === "tab1" ? <PendingEmployee/> : <AcceptedEmployee/>}
            </div>
        </div>

    );
};
export default Tabs;