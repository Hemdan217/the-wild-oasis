import React from "react";
import Select from "./Select";

const SortBy = ({ options, value, handleChange }) => {
  return <Select options={options} value={value} onChange={handleChange} />;
};

export default SortBy;
