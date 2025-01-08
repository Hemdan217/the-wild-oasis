import React from "react";
import { login as loginApi } from "../../services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: loginApi,
    mutationKey: ["user"],
    onSuccess: (user) => {
      navigate("/dashboard");
      queryClient.setQueryData(["user"], user?.user);
      toast.success(`Welcome back`);
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
  return { login, isLoading };
};

export default useLogin;
