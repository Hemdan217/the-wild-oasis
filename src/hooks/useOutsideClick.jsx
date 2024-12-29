import React, { useEffect, useRef } from "react";

const useOutsideClick = (handler) => {
  const ref = useRef(null);
  const handleClickOutside = (e) => {
    // console.log("click outside", e.target);
    if (ref.current && !ref.current.contains(e.target)) {
      handler?.();
      console.log("click outside");
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [ref.current]);
  return ref;
};

export default useOutsideClick;
