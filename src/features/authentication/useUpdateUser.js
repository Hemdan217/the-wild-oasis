import React from "react";
import { updateUser as uodateUserApi } from "../../services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: uodateUserApi,
    mutationKey: ["user"],
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user?.user);
      toast.success(`User successfully updated`);
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
  return { updateUser, isUpdating };
};

export default useUpdateUser;
