import React from "react";
import styled from "styled-components";
import useCurrentUser from "./../features/authentication/useCurrentUser";
import UserAvatar from "../features/authentication/UserAvatar";
import { MdOutlineLogout } from "react-icons/md";
import ButtonIcon from "./ButtonIcon";
import SpinnerMini from "./SpinnerMini";
import useLogout from "../features/authentication/useLogout";
const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 2.4rem;
  justify-content: flex-end;
  align-items: center;
`;
const HeaderMenu = () => {
  const { user } = useCurrentUser();
  const { logout, isLoading } = useLogout();
  return (
    <StyledHeaderMenu>
      <li>
        <UserAvatar user={user} />
      </li>
      <li>{user.app_metadata?.fullName || "Hemdan"}</li>
      <li>
        <ButtonIcon onClick={logout} disabled={isLoading}>
          {isLoading ? <SpinnerMini /> : <MdOutlineLogout />}
        </ButtonIcon>
      </li>
    </StyledHeaderMenu>
  );
};

export default HeaderMenu;
