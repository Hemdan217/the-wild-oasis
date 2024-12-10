import React from "react";
import styled from "styled-components";
import Heading from "./Heading";
const StyledHeader = styled.header`
  padding: 1.2rem 2.4rem;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
`;
const Header = () => {
  return (
    <>
      <StyledHeader>
        <Heading as="h2">Header of the website</Heading>
      </StyledHeader>
    </>
  );
};

export default Header;
