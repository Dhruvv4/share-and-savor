import React from "react";
import Loading from "./Loading";
import { useSelector } from "react-redux";
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";
import Header from "@/components/Header";

const Layout = () => {
  let user = useSelector((state) => state.user);

  return (
    <>
      <div className="flex h-full flex-col">
        <Header />
        <div className="h-full">
          <Outlet />
        </div>
        <Toaster />
      </div>
      {user?.isLoading && <Loading />}
    </>
  );
};

export default Layout;
