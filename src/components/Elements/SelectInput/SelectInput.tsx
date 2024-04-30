// packages
import React, { FC, useState } from "react";

// css
import ds from "./SelectInput.module.css";
import { FaAngleDown } from "react-icons/fa6";

// types

interface SelectInputPropsType {
  selectedValue: string | number;
  setSelectedValue: (value: string | number) => void;
  placeHolderText: string;
  optionsList: string[];
}

const SelectInput: FC<SelectInputPropsType> = ({
  selectedValue,
  setSelectedValue,
  placeHolderText,
  optionsList,
}) => {
  return (
    <div className={ds.select_card}>
      <select
        name="select"
        id="select"
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value)}
        className={ds.select_element}>
        <option value="" disabled style={{ display: "none" }}>
          {placeHolderText}
        </option>
        {optionsList.map((item, index) => (
          <option value={item} className={ds.option_item} key={index}>
            {item}
          </option>
        ))}
      </select>

      <FaAngleDown size={18} className={ds.drop_down_icon} />
    </div>
  );
};

export default SelectInput;
