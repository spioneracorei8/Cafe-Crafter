import React from "react";
import HomePage from "./Pages/HomePage";
import PageNotFound from "./Pages/PageNotFound";
import './App.css'
import { Routes, Route } from "react-router-dom"
import Register from "./Pages/Register";
import Login from "./Pages/Login";
function App() {



  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/pageNotFound" element={<PageNotFound />} />
        <Route path="/Coffee-Beans-Arabica" element={<PageNotFound />} />
        <Route path="/Coffee-Beans-Robusta" element={<PageNotFound />} />
        <Route path="/Coffee-Beans-Liberica" element={<PageNotFound />} />
        <Route path="/Coffee-Roasts-Light" element={<PageNotFound />} />
        <Route path="/Coffee-Roasts-Medium" element={<PageNotFound />} />
        <Route path="/Coffee-Roasts-Dark" element={<PageNotFound />} />
        <Route path="/Coffee-Explore-About" element={<PageNotFound />} />
        <Route path="/Coffee-Explore-Events" element={<PageNotFound />} />
        <Route path="/Coffee-Explore-Community" element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App