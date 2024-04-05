import React, { useState } from 'react'
import {Navigate} from "react-router-dom";
import { useUserInfo } from '../context/UserContext';

import Cookies from 'js-cookie';

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [redirect, setRedirect] = useState(false);
  const{setUserInfo, setIsLoggedIn} = useUserInfo();
  const login = async(e)=>{
    e.preventDefault();

    const response = await fetch('http://localhost:4000/user/login', {
      method : 'POST',
      headers : {'Content-Type': 'application/json',},
      body : JSON.stringify({username, password}),
      credentials: 'include'
    })
    const rd = await response.json();
    if(!response.ok){
      setMessage(rd.message);
    }else{
      console.log("I will navigate")
      Cookies.set("token", rd.token);
      setUserInfo(rd.info);
      setIsLoggedIn(true);
      setRedirect(true);
    }
  }
  
  if(redirect){
    return <Navigate to={'/'} />
  }

  return (
    <form className='login' onSubmit={login}>
        <h1>Login</h1>
        <input type="text" placeholder='username' value={username} onChange={(e)=>setUsername(e.target.value)}/>
        <input type="password" placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button type='submit'>Login</button>
        <p style={{ color: "rgb(252, 74, 74, 0.737)", fontWeight : "600", marginTop : "6px"}}>{message}</p>
    </form>
  )
}

export default Login