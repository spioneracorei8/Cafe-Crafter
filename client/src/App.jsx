import React, { useEffect, useState } from "react";
import './App.css'
import { useAuth } from "./Context/Authentication";
import AuthenticatedApp from "./Pages/AuthenticatedApp";
import UnauthenticatedApp from "./Pages/UnauthenticatedApp";
import AuthenticatedAdmin from "./Pages/AuthenticatedAdmin";

function App() {
  const auth = useAuth()
  
  return auth?.isAuthenticated ? (
    auth?.state?.user?.role === 'admin' ? (
      <AuthenticatedAdmin />
    ) : (
      <AuthenticatedApp />
    )
  ) : (
    <UnauthenticatedApp />
  );

}

export default App