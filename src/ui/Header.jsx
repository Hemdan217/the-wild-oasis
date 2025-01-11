import React from "react";
import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
const StyledHeader = styled.header`
  padding: 1.2rem 2.4rem;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
`;
const Header = () => {
  return (
    <>
      <StyledHeader>
        <HeaderMenu />
      </StyledHeader>
    </>
  );
};

export default Header;
