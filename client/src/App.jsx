import React from "react";
import HomePage from "./Pages/HomePage";
import PageNotFound from "./Pages/PageNotFound";
import './App.css'
import { Routes, Route } from "react-router-dom"
import Register from "./Pages/Register";
function App() {



  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/pageNotFound" element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App