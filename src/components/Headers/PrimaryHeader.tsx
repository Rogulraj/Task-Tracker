// packages
import React, { FC, useState } from "react";

// css
import ds from "./PrimaryHeader.module.css";

// icons
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { routePaths } from "@constants/routesPath";

// assets
import User1 from "@assets/user1.jpg";

// types
interface PrimaryHeaderPropsType {}

const PrimaryHeader: FC<PrimaryHeaderPropsType> = ({}) => {
  /** state */
  const [showMenu, setShowMenu] = useState<boolean>(false);
  return (
    <div className={ds.main_layout}>
      <div className={ds.sub_layout}>
        <div className={ds.sm_container}>
          <div className={ds.sm_title_card}>
            <h1 className={ds.sm_title_text}>
              Task <br /> Tracker
            </h1>
          </div>
          <div className={ds.sm_menu_bar_container}>
            {showMenu ? (
              <IoClose
                color="#fff"
                size={25}
                onClick={() => setShowMenu(!showMenu)}
              />
            ) : (
              <IoMenu
                color="#fff"
                size={25}
                onClick={() => setShowMenu(!showMenu)}
              />
            )}
          </div>
          <nav
            className={ds.sm_menu_list_container}
            style={{ display: showMenu ? "flex" : "none" }}>
            <NavLink to={routePaths.taskHome} className={ds.sm_nav_item}>
              DashBoard
            </NavLink>
            <NavLink to={routePaths.taskHome} className={ds.sm_nav_item}>
              Analytics
            </NavLink>
          </nav>
        </div>
        <div className={ds.md_container}>
          <div className={ds.md_title_container}>
            <h1 className={ds.md_title_text}>Task Tracker</h1>
          </div>
          <nav className={ds.md_nav_container}>
            <NavLink to={routePaths.taskHome} className={ds.md_nav_item}>
              DashBoard
            </NavLink>
            <NavLink to={routePaths.taskHome} className={ds.md_nav_item}>
              Analytics
            </NavLink>
            <img src={User1} alt="user-1" className={ds.md_user_image} />
          </nav>
        </div>
      </div>
    </div>
    // <div className={ds.main}>
    //   <div className={ds.sub}>
    //     <div className={ds.inner}>
    //       <div className={ds.title}></div>
    //       <div className={ds.content}></div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default PrimaryHeader;
