import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

const useBookings = () => {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const filteredValue = searchParams.get("status");
  const sortBy = searchParams.get("sortBy") || "";
  const page = Number(searchParams.get("page")) || 1;
  const [field, direction] = sortBy.split("-");
  const filter =
    !filteredValue || filteredValue === "all"
      ? null
      : { field: "status", value: filteredValue };
  const { data: { data, count } = {}, isLoading } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings(filter, { field, direction }, page),
  });
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings(filter, { field, direction }, page + 1),
    });
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings(filter, { field, direction }, page - 1),
    });
  }
  return { data, isLoading, count };
};

export default useBookings;
