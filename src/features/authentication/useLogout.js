import React from "react";
import { logout as logoutApi } from "../../services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: (user) => {
      navigate("/login", { replace: true });
      queryClient.removeQueries();
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
  return { logout, isLoading };
};

export default useLogout;
