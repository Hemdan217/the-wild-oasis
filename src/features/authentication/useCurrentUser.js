import React from "react";
import { getUser, login as loginApi } from "../../services/apiAuth";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const useCurrentUser = () => {
  const { data: user, isLoading } = useQuery({
    queryFn: getUser,
    queryKey: ["user"],
    retry: false,
  });
  return { user, isLoading };
};

export default useCurrentUser;
