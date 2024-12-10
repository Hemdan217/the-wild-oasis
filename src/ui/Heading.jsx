import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) => props.as == "h1" && "font-size: 2.4rem;"}
  ${(props) =>
    props.as == "h4" &&
    css`
      font-size: 1.8rem;
      color: var(--color-grey-600);
    `}
  line-height: 1.8rem;
  margin-bottom: 2.4rem;

  color: var(--color-grey-800);
  font-weight: 700;
`;

export default Heading;
