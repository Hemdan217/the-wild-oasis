import React from "react";
import { getBooking } from "../../services/apiBookings";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const useGetBooking = () => {
  const { bookingId } = useParams();
  const { data: booking, isLoading } = useQuery({
    queryKey: ["bookings", bookingId],
    queryFn: () => getBooking(bookingId),
  });
  return { booking, isLoading };
};

export default useGetBooking;
