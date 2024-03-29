const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {createTokenForUser} = require('../service/authentication');

const {Schema, model} = mongoose;

const userSchema = new Schema({
  username: {type: String, required: true, min: 4, unique: true},
  password: {type: String, required: true},
});



userSchema.static("matchPasswordAndGenerateToken", async function(username, password){
    const user = await this.findOne({ username });
    if(!user) throw new Error("User not found!");

    const passok = await bcrypt.compare(password, user.password);
    

    if (!passok) throw new Error("Wrong Credentials");

    const token = createTokenForUser({ ...user._doc, password: undefined });
    return token;
});

const User = model('user', userSchema);

module.exports = User;