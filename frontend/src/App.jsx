import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreateBook from "./pages/CreateBook";
import DeleteBook from "./pages/DeleteBook";
import EditBook from "./pages/EditBook";
import ShowBook from "./pages/ShowBook";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/book/add" element={<CreateBook />}></Route>
      <Route path="/book/view/:id" element={<ShowBook />}></Route>
      <Route path="/book/edit/:id" element={<EditBook />}></Route>
      <Route path="/book/delete/:id" element={<DeleteBook />}></Route>
    </Routes>
  );
};

export default App;
