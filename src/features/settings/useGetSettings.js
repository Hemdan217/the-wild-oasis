import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getSettings } from "../../services/apiSettings";

const useGetSettings = () => {
  const { data = {} } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });
  return { data };
};

export default useGetSettings;
