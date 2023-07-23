import React from "react";
import './App.css'
import { useAuth } from "./Context/Authentication";
import AuthenticatedApp from "./Pages/AuthenticatedApp";
import UnauthenticatedApp from "./Pages/UnauthenticatedApp";

function App() {
  const auth = useAuth()

  return auth.isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />

}

export default App