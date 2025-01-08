import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useCheckinBooking = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: makeCheckinBooking, isLoading: isCheckinBooking } =
    useMutation({
      queryKey: ["checkin"],
      mutationFn: ({ bookingId, data }) => {
        updateBooking(bookingId, data);
      },
      onSuccess: () => {
        toast.success("Booking successfully checked in");
        queryClient.invalidateQueries({ active: true });
        navigate("/dashboard");
      },
    });
  return { makeCheckinBooking, isCheckinBooking };
};

export default useCheckinBooking;
