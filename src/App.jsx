import GlobalStyle from "./styles/GlobalStyle";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Cabins from "./pages/Cabins";
import Bookings from "./pages/Bookings";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Users from "./pages/Users";
import Account from "./pages/Account";
import AppLayout from "./ui/AppLayout";
import supabase from "./services/supabase";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import BookingDetails from "./pages/BookingDetails";
import CheckinBooking from "./features/check-in-out/CheckinBooking";
import Checkin from "./pages/Checkin";

function App() {
  useEffect(() => {
    (async () => {
      let { data: cabins, error } = await supabase.from("cabins").select("*");
      console.log(cabins);
    })();
  }, []);
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path="login" element={<Login />} />

            <Route element={<AppLayout />}>
              <Route
                index
                element={<Navigate to="dashboard" replace={true} />}
              />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="cabins" element={<Cabins />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="bookings/:bookingId" element={<BookingDetails />} />
              <Route path="checkin/:bookingId" element={<Checkin />} />
              <Route path="settings" element={<Settings />} />
              <Route path="users" element={<Users />} />
              <Route path="account" element={<Account />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
