import React, { useEffect, useState } from "react";
import './App.css'
import { useAuth } from "./Context/Authentication";
import AuthenticatedApp from "./Pages/AuthenticatedApp";
import UnauthenticatedApp from "./Pages/UnauthenticatedApp";
import AuthenticatedAdmin from "./Pages/AuthenticatedAdmin";

function App() {
  const auth = useAuth()

  return auth?.isAuthenticated ? (
    localStorage?.role === 'admin' ?
      <AuthenticatedAdmin />
      : localStorage?.role === 'customer' ?
        <AuthenticatedApp />
        :
        <UnauthenticatedApp />
  )
    : <UnauthenticatedApp />
}

export default App