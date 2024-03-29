import { Link, Navigate, useNavigate } from "react-router-dom"
import { useUserInfo } from "../context/UserContext"
import { useEffect, useState } from "react";


function Header() {
  const{userInfo, setUserInfo, setIsLoggedIn} = useUserInfo();
  const navigate = useNavigate();

  useEffect(() => {
    async function verifyUser() {
      try {
        const response = await fetch('http://localhost:4000/user/verify', { credentials: 'include' });
        const rd = await response.json();
        if (!response.ok) {
          console.log(rd.message);
        } else {
          console.log("I am from header",rd.message);
          setUserInfo(rd.info);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
    verifyUser(); // Call the async function immediately
  }, []);

  
  async function logout(){
    await fetch('http://localhost:4000/user/logout', {credentials: 'include'});
    setUserInfo({});
    setIsLoggedIn(false);
    navigate('/');
  }
  
  
  const username = userInfo?.username;
  return (
    <header>
        <Link to="/allblogs" className="logo">Blogify</Link>
        <nav>
          {username && (
          <>
            <Link to="/create">Create Blog</Link>
            <Link to="/">My Blogs</Link>
            <a onClick={logout} style={{cursor:"pointer"}}>Logout</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
        </nav>
    </header>
  )
}

export default Header