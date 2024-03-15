import React, {useState} from "react";
import Signup from "./Components/Signup";
import "./style.css"
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import {Routes, Route} from "react-router-dom"

const App=()=>{
  const [token, setToken] =useState("")
  return(
    <div>
      {/* <Signup setToken={setToken}/>
      <Login setToken={setToken}/>
      <Dashboard token={token}/> */}

      <Routes>
        <Route path="/" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </div>
  )
}

export default App
