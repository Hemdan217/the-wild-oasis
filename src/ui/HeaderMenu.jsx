import React from "react";
import styled from "styled-components";
import useCurrentUser from "./../features/authentication/useCurrentUser";
import UserAvatar from "../features/authentication/UserAvatar";
import { MdOutlineLogout } from "react-icons/md";
import ButtonIcon from "./ButtonIcon";
import SpinnerMini from "./SpinnerMini";
import useLogout from "../features/authentication/useLogout";
import { Link } from "react-router-dom";

import { useDarkMode } from "../context/DarkModeContext";
import { FaSun, FaMoon, FaPalette } from "react-icons/fa";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 2.4rem;
  justify-content: flex-end;
  align-items: center;
`;

const HeaderMenu = () => {
  const { user } = useCurrentUser();
  const { logout, isLoading } = useLogout();
  const { isDarkMode, setMode } = useDarkMode();

  return (
    <StyledHeaderMenu>
      <li>
        <Link to="/account">
          <UserAvatar user={user} />
        </Link>
      </li>
      <li>{user.user_metadata?.fullName || "Hemdan"}</li>
      <li>
        <ButtonIcon
          onClick={() =>
            isDarkMode === "dark" ? setMode("light") : setMode("dark")
          }
        >
          {isDarkMode ? (
            <FaSun
              size={24}
              color={
                isDarkMode === "monochrome" ? "rgb(44, 42, 33)" : "#fbbf24"
              } // Vibrant yellow for light mode
            />
          ) : (
            <FaMoon
              size={24}
              color={
                isDarkMode === "monochrome" ? "rgb(44, 42, 33)" : "#94a3b8"
              } // Soft gray-blue for dark mode
            />
          )}
        </ButtonIcon>
      </li>
      <li>
        <ButtonIcon
          onClick={() =>
            isDarkMode === "monochrome"
              ? setMode("light")
              : setMode("monochrome")
          }
        >
          <FaPalette
            size={24}
            color={isDarkMode === "monochrome" ? "rgb(44, 42, 33)" : "#38bdf8"}
          />{" "}
          {/* Bright blue for monochrome mode */}
        </ButtonIcon>
      </li>
      <li>
        <ButtonIcon onClick={logout} disabled={isLoading}>
          {isLoading ? (
            <SpinnerMini />
          ) : (
            <MdOutlineLogout size={24} color="#6b7280" />
          )}{" "}
          {/* Neutral gray for logout */}
        </ButtonIcon>
      </li>
    </StyledHeaderMenu>
  );
};

export default HeaderMenu;
