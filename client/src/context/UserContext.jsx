import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from 'js-cookie';
// 1. create a new context
const UserContext = createContext();

// 2. Set-up your Provider component
export function UserProvider({children}){
    const [userInfo,setUserInfo] = useState({});

    let is = false
    const [isLoggedIn, setIsLoggedIn] = useState(is); // Set initial state as needed

    return(
        <UserContext.Provider value = {{userInfo, setUserInfo, isLoggedIn, setIsLoggedIn}}>
            {children}
        </UserContext.Provider>
    )
}

// 3. custom hook to Consume ThemeContext
export function useUserInfo() {
    return useContext(UserContext);
}
