import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

const useBookings = () => {
  const [searchParams] = useSearchParams();
  const filteredValue = searchParams.get("status");
  const sortBy = searchParams.get("sortBy");
  const [field, direction] = searchParams.get("sortBy").split("-") || "";
  const filter =
    !filteredValue || filteredValue === "all"
      ? null
      : { field: "status", value: filteredValue };
  const { data = [], isLoading } = useQuery({
    queryKey: ["bookings", filter, sortBy],
    queryFn: () => getBookings(filter, { field, direction }),
  });
  return { data, isLoading };
};

export default useBookings;
