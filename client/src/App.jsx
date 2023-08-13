import React, { useEffect, useState } from "react";
import './App.css'
import axios from "axios";
import { useAuth } from "./Context/Authentication";
import AuthenticatedApp from "./Pages/AuthenticatedApp";
import UnauthenticatedApp from "./Pages/UnauthenticatedApp";
import AuthenticatedAdmin from "./Pages/AuthenticatedAdmin";

function App() {
  const auth = useAuth()
 

  return auth.isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />

}

export default App