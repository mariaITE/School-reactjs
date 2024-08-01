import {useState,} from "react"
import {Link} from "react-router-dom";
import Login from "../log in/login";
export default function SidebarItem({item}) {

    const [open, setOpen] = useState(false);
    // const [select, setSelected] = useState(1);
    // const  curunt =item;

    if (item.childrens) {
        return (
            <div className={open ? "sidebar-item open" : "sidebar-item"}>
                <div className="sidebar-title">
                    <span>

                        {item.icon && <i className={item.icon}/>}

                        {item.title}

                    </span>
                    <i className="bi-chevron-left toggle-btn" onClick={() => setOpen(!open)}/>
                </div>
                <div className="sidebar-content">

                    {item.childrens.map((child, index) =>
                         <Link className="link" to={child.path}>
                        <SidebarItem key={index} item={child}/>
                        </Link>)}


                </div>
            </div>
        )
    } else {
        return (
            <Link to={item.path || "#"} className="sidebar-item plain"  >
                {item.icon && <i className={item.icon}/>}
                {item.title}
            </Link>
        )
    }
}