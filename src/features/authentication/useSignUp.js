import { useMutation } from "@tanstack/react-query";
import React from "react";
import { signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

const useSignUp = () => {
  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      toast.success("Account created successfully");
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
  return { signUp, isLoading };
};

export default useSignUp;
