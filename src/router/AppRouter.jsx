import React from "react";
import Home from "../pages/home/Home";
import { Route, Routes } from "react-router-dom";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default AppRouter;
