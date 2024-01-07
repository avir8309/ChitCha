import React from "react";
import { useState } from "react";
import Button from '@mui/material/Button';
import Register from "./Register";
import Login from "./login";
function FirstPage() {
  const [isRegistered, setisRegistered] = useState(true);
  const toggle=()=>{
    setisRegistered(!isRegistered);
  }

  return (
    <div className="flex flex-col justify-center items-center">
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "20vh" }}>
      <Button variant="contained" onClick={toggle}>
        
        {isRegistered ? <p>Register</p> : <p>Login</p>}
      </Button>
      
        </div>
        <div>
        {isRegistered ? <Register/> : <Login/>}
        </div>

    </div>
    
    
  );
}

export default FirstPage;
