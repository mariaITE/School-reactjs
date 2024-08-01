
import React, {useEffect, useState} from "react";
import './App.css';
import './components/sidebar/sidbar.css';
import './components/marks/mark.css';
import './components/dashboard/dashboard.css';
import Sidebar from "./components/sidebar/sidebar";
import Login from "./components/log in/login";
import {BrowserRouter, BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Daley from "./components/time mamagement/delay"
import AddDaley from "./components/time mamagement/addDelay";
import Permission from "./components/time mamagement/permission";
import AddPermission from "./components/time mamagement/addpermission";
import AddAbsence from "./components/time mamagement/addabsence";
// import Adduser from "./components/user setting/adduser";
import ShowAbsence from "./components/time mamagement/showabsence";
import AddStudent from "./components/students/addStudent";
import ShowStudent from "./components/students/showStudent";
import ShowAddMark from "./components/marks/showAddMark";
import DetailsMark from "./components/marks/detailsMark";
import AddAds from "./components/ads/addAds";
import ListBudget from "./components/budget/budget";
import MyPdf from "./components/students/myPDF";
import MakePdf from "./components/students/makePDF";
//------------------------------------------------------------------
import Dashboard from "./components/dashboard/dashboard";
import AddUser from "./components/account setting/add user/adduser";
 import EditUser from "./components/account setting/edit user/edituser";
 import ShowUser from "./components/account setting/show user/showuser";
 // import Edit from "./components/account setting/edit user/edituser";
 import AddEmployee from "./components/employee setting/add employee/addemployee";
 import ShowEmployee from "./components/employee setting/show employee/showemployee";
// import ImportFile from "./components/budget/budget";
 import T from "./components/employee setting/show employee/other";
 import JsonToPdfConverter from "./components/employee setting/show employee/pdfTable";
// import './components/sidebar/sidbar.css';
// import './components/log in/Login.css';
import './components/account setting/add user/adduser.css';
 import './components/account setting/edit user/edituser.css';
import './components/account setting/show user/showuser.css';
 import './components/employee setting/add employee/addemployee.css';
 import './components/employee setting/show employee/showemployee.css';
// import './components/dashboard/dashboard.css';
import Budget from "./components/budget/addbudget";


import './components/follow-up management/raghad.css';
import Addwptype from "./components/follow-up management/working papers/add working-paper type";
import AddWorkingPaper from "./components/follow-up management/working papers/add working_paper";
import AddNotice from "./components/follow-up management/add notice/addNotice";
import AddSubject from "./components/setting management/subject/AddSubject";
import ShowSubject from "./components/setting management/subject/ShowSubject";
import ShowSections from "./components/setting management/sections/ShowSections";
import AddSection from "./components/setting management/sections/AddSection";
import AddProgram from "./components/setting management/program/AddProgram";
import ShowProgram from "./components/setting management/program/ShowProgram";


function App() {


 const [role, setrole] = useState([]);
  let permis =  ["r","rr","rrr","عرض الموظفين","إضافة مستخدم","عرض الشعب","إضافة طلاب للشعبة"
  ,"إضافة شعبة","عرض برنامج","إضافة برنامج","إضافة طالب","عرض الطلاب","إضافة  أوراق العمل"
  ,"إضافة نوع أوراق العمل","عرض المقررات","عرض المستخدمين","إضافة موظف","إضافة إعلان","إضافة ملاحظة","إضافة مقرر"]

  useEffect(() => {
   localStorage.setItem("permission", permis);
        setrole(localStorage.getItem('permission'));

   });



    const [login, setLogin] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData && userData.token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = (userData) => {
        localStorage.setItem('userData', JSON.stringify(userData));
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('userData');
        setIsLoggedIn(false);
    };

    return (
        <BrowserRouter>
            {/*{login ? (*/}
            {/*    <Login setLogin={setLogin}/>*/}
            {/*) : (*/}
                <div className="main">
                    {/*<img className={"img"} src={logo} alt={""}/>*/}
                    {/*<h4>مدرسة الأهلية الوطنية</h4>*/}

                    <Sidebar/>
                    <div className="container">
<Routes>
                  {/*<Route path="/components/log in/login" element={<Login/>}/>*/}
                   {/*<Route path="/components/dashboard/dashboard" element={<Dashboard/>}/>*/}
                   <Route path="/components/dashboard/dashboard" element={<Dashboard/>}/>
                   <Route path="/components/time mamagement/delay" element={<Daley/>}/>
                   <Route path="/components/time mamagement/addDelay" element={<AddDaley/>}/>
                   <Route path="/components/time mamagement/permission" element={<Permission/>}/>
                   <Route path="/components/time mamagement/addpermission" element={<AddPermission/>}/>
                   <Route path="/components/time mamagement/addabsence" element={<AddAbsence/>}/>
                   <Route path="/components/time mamagement/showabsence" element={<ShowAbsence/>}/>
        {role.includes("إضافة طالب")?
                   <Route path="/components/students/addStudent" element={<AddStudent/>}/>
            :null}
          {role.includes("عرض الطلاب")?
                   <Route path="/components/students/showStudent" element={<ShowStudent/>}/>
             :null}
                   <Route path="/components/marks/showAddMark" element={<ShowAddMark/>}/>
                   <Route path="/components/marks/detailsMark" element={<DetailsMark/>}/>
            {role.includes("إضافة إعلان")?
                   <Route path="/components/ads/addAds" element={<AddAds/>}/>
             :null}
                   <Route path="/components/students/myPDF" element={<MyPdf/>}/>
    //-------------------------------------------------------------

   {role.includes("إضافة مستخدم")?
          <Route path="/components/account setting/add user/adduser" element={<AddUser/>}/>
 :null}
         <Route path="/components/account setting/edit user/edituser/:id" element={<EditUser/>}/>

  {role.includes("عرض المستخدمين")?
         <Route path="/components/account setting/show user/showuser" element={<ShowUser/>}/>
    :null}

 {role.includes("إضافة موظف")?
         <Route path="/components/employee setting/add employee/addemployee" element={<AddEmployee/>}/>
   :null}
  {role.includes("عرض الموظفين")?
          <Route path="/components/employee setting/show employee/showemployee"element={<ShowEmployee/>}/>
     :null}
         {/*<Route path="/components/budget/budget" element={<ImportFile/>}/>*/}
        <Route path="/components/employee setting/show employee/pdfTable" element={<JsonToPdfConverter />}/>
    {/*<Route path="/components/account setting/edit user/edituser/:id" element={<Edit/>}/>*/}
         <Route path="/components/employee setting/show employee/other/:id" element={<T/>}/>
         <Route path="components/budget/budget" element={<ListBudget/>}/>
         <Route path="components/budget/addbudget/:Sid" element={<Budget/>}/>





             <Route path="/components/follow-up management/working papers/add working-paper type" element={<Addwptype/>}/>
               <Route path="/components/follow-up management/working papers/add working_paper" element={<AddWorkingPaper/>}/>
   {role.includes("إضافة ملاحظة")?
               <Route path="/components/follow-up management/add notice/addNotice" element={<AddNotice/>}/>
        :null}
             <Route path="/components/setting management/subject/AddSubject" element={<AddSubject/>}/>
               <Route path="/components/setting management/subject/ShowSubject" element={<ShowSubject/>}/>

               <Route path="/components/setting management/sections/ShowSections" element={<ShowSections/>}/>

             <Route path="/components/setting management/sections/AddSection" element={<AddSection/>}/>
                 <Route path="/components/setting management/program/AddProgram" element={<AddProgram/>}/>
                 <Route path="/components/setting management/program/ShowProgram" element={<ShowProgram/>}/>



</Routes>

                {/*<Dashboard/>*/}
                {/*<Daley/>*/}
                {/*<AddDaley/>*/}
                {/*<Permission/>*/}
                {/*<AddPermission/>*/}
                {/*<AddAbsence/>*/}
                {/*<ShowAbsence/>*/}
                {/*<User>fff</User>*/}
                 {/*<Login></Login>*/}
                 {/*<MyPdf></MyPdf>*/}
             {/*<MakePdf></MakePdf>*/}
        </div> </div>
                {/*)}*/}
        </BrowserRouter>
    )
}

export default App