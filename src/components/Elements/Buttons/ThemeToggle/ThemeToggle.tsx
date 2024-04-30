// packages
import React, { FC } from "react";

// css
// import ds from "./ThemeToggle.module.css";
import "./ThemeToggle.module.css";

import { FaMoon } from "react-icons/fa";

// types
interface ThemeToggleButtonPropsType {}

const ThemeToggleButton: FC<ThemeToggleButtonPropsType> = ({}) => {
  return (
    <div>
      <input type="checkbox" className="checkbox" id="checkbox">
        <label htmlFor="checkbox" className="checkbox-label">
          {/* <i className="fas fa-moon"></i>
        <i className="fas fa-sun"></i> */}
          <FaMoon fill="yellow" />
          <FaMoon fill="yellow" />

          <span className="ball"></span>
        </label>
      </input>
    </div>
  );
};

export default ThemeToggleButton;
