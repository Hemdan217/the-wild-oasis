import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

const useDeleteBooking = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteBooking, isLoading: isDeleting } = useMutation({
    queryKey: ["bookings"],
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      toast.success("Booking successfully was deleted");
      queryClient.invalidateQueries({ active: true });
    },
  });
  return { deleteBooking, isDeleting };
};

export default useDeleteBooking;
