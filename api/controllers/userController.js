const User = require('../model/userModel');
const bcrypt = require('bcrypt')
const {validateToken} = require('../service/authentication');

async function handleUserRegistration(req, res) {
    const {username, password} = req.body;
    // Confirm data
    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate username
    const duplicate = await User.findOne({ username }).lean();

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    // Hash password 
    const hashedPwd = await bcrypt.hash(password, 10) // salt rounds
    try {
        const user = await User.create({username, "password" : hashedPwd});
        if (user) { //created 
           return res.status(201).json({ message: `New user "${username}" created` })
        } else {
            return res.status(400).json({ message: 'Invalid user data received' })
        }
    } catch (error) {
        return res.status(400).json({message : error.message});
    }
    res.json("All ok");
}

async function handleUserLogin(req, res) {
    const {username, password} = req.body;
    // Confirm data
    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    try {
        const token = await User.matchPasswordAndGenerateToken(username, password);
        // If the user is successfully authenticated, set the token
        // res.cookie("token", token);

        const info = validateToken(token);
        res.status(200).json({message : "Succefully loggedin", info, token });
    } 
    catch (error) {
        res.status(400).json({message : error.message});
    }
}


async function handleUserVerification(req, res){
    if(req.user === null){
        res.status(401).json({message : "Unauthenticated", info : null});
    }else{
        res.status(200).json({message: `Verified as ${req.user?.username}`, info : req.user});
    }
}

async function handleUserLogout(req, res){
    res.clearCookie("token");
    res.json({message : "logout"});
}


module.exports = {handleUserRegistration, handleUserLogin, handleUserVerification, handleUserLogout};