import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import useCurrentUser from "../features/authentication/useCurrentUser";
import Spinner from "./Spinner";
const StyledLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;
const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow-y: scroll;
`;
const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
`;
const AppLayout = () => {
  const { user, isLoading } = useCurrentUser();
  console.log(isLoading);
  console.log(user);
  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <Spinner />
      </div>
    );

  if (user?.role !== "authenticated") return <Navigate to="/login" replace />;
  return (
    <StyledLayout>
      <Header />
      <Sidebar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledLayout>
  );
};

export default AppLayout;
