import React from "react";
import RegAndLogin from "../RegisterLogin/RegAndLog";
import UserManage from "../userManage/userManage";
import { Routes, Route } from "react-router-dom";

const Root = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<RegAndLogin />} />
        <Route path="/usermanagement" element={<UserManage />} />
      </Routes>
    </>
  );
};

export default Root;
