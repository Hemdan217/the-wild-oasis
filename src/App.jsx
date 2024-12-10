import { useState } from "react";

import GlobalStyle from "./styles/GlobalStyle";

import styled from "styled-components";
import Heading from "./ui/Heading";
import Button from "./ui/Button";

const AppDiv = styled.div`
  display: flex;
  font-size: 5rem;
  &:hover {
    color: red;
  }
`;

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <GlobalStyle />

      <AppDiv>
        <div>This is test</div>
        <Heading as="h4">This is testing</Heading>
        <Heading as="h1">This is testing</Heading>
        <Button variation="primary" size="small">
          This{" "}
        </Button>
      </AppDiv>
    </>
  );
}

export default App;
