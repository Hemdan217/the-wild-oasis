import React from "react";
import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import { useSearchParams } from "react-router-dom";

const CabinTableOperations = () => {
  return (
    <TableOperations>
      <Filter
        field={"discount"}
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "Non-Discount" },
          { value: "discount", label: "Discount" },
        ]}
      />
      <SortBy
        options={[
          { value: "name-asc", label: "Name A-Z" },
          { value: "name-desc", label: "Name Z-A" },
          { value: "regularPrice-asc", label: "Price (Low To High)" },
          { value: "regularPrice-desc", label: "Price (High To Low)" },
          { value: "maxCapacity-asc", label: "Max Capacity (Low To High)" },
          { value: "maxCapacity-desc", label: "Price (High To Low)" },
        ]}
      />
    </TableOperations>
  );
};

export default CabinTableOperations;
