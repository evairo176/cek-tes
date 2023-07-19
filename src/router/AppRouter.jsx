import React from "react";
import Home from "../pages/home/Home";
import { Route, Routes } from "react-router-dom";
import Post from "../pages/post/Post";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/post" element={<Post />} />
    </Routes>
  );
}

export default AppRouter;
