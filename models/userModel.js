const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required:[true, "Please add a name"]
    },
    password:{
        type: String,
        required: [true, "Please add a password"],
        minLength: [6,"Password must be up to 6 characters"]
    },
});

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next();
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
});

const User = mongoose.model("UserData", userSchema);
module.exports = User;