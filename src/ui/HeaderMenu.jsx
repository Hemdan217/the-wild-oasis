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
import { FaSun, FaMoon } from "react-icons/fa";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 2.4rem;
  justify-content: flex-end;
  align-items: center;
`;
const HeaderMenu = () => {
  const { user } = useCurrentUser();
  const { logout, isLoading } = useLogout();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <StyledHeaderMenu>
      <li>
        <Link to="/account">
          <UserAvatar user={user} />
        </Link>
      </li>
      <li>{user.user_metadata?.fullName || "Hemdan"}</li>
      <li className>
        <ButtonIcon onClick={toggleDarkMode}>
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </ButtonIcon>
      </li>
      <li>
        <ButtonIcon onClick={logout} disabled={isLoading}>
          {isLoading ? <SpinnerMini /> : <MdOutlineLogout />}
        </ButtonIcon>
      </li>
    </StyledHeaderMenu>
  );
};

export default HeaderMenu;
