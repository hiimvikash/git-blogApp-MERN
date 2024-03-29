import React, { useState } from 'react'


function validateUsername(username) {
    // Regular expression to match username
    // const regex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d@_&!]{5,}$/;
    const regex = /^[a-zA-Z0-9@_&!.]{4,}$/;

    // Test the username against the regular expression
    return regex.test(username);
}

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    let [errorMessage, setErrorMessage] = useState(false);
    let [message, setMessage] = useState("");

    
    const register = async (e)=>{
        e.preventDefault();

        if(validateUsername(username) === false || password.length < 4){
            setErrorMessage(true);
            setMessage(`minimum length should be four and allowed special characters are @ _ & ! .`)
            return;
        }

        const response = await fetch('http://localhost:4000/user/register', {
            method : 'POST',
            headers : {'Content-Type': 'application/json',},
            body : JSON.stringify({username, password})
        })

        console.log(response)
        let rd = await response.json();
        setMessage(rd.message);

        if(!response.ok){
            setErrorMessage(true);
        }else{
            setErrorMessage(false);
        }
    }
  return (
    <form className='register' onSubmit={register}>
        <h1>Register</h1>
        <input type="text" placeholder='username' value={username} onChange={(e)=>setUsername(e.target.value)}/>
        <input type="password" placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button type='submit'>Register</button>
        <p style={{ color: errorMessage ? "rgb(252, 74, 74, 0.737)" : "green", fontWeight : "600", marginTop : "6px"}}>{message}</p>
    </form>
  )
}

export default Register