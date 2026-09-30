const User = require("../models/users");
const { setUser } = require('../service/auth');


async function handleUserSignup(req,res){
    const {name, email, password} = req.body;
    await User.create({
        name,
        email,
        password,
    })

    return res.render('home');
}

async function handleUserLogin(req,res){
    const {email, password} = req.body;
    const user = await User.findOne({email, password})
    // console.log('inside handleUser Loign', user)
    // console.log('controllers.user.js',req.user)
    if(!user) {
        return res.render("login",{
            error: "Invalid Username or Password",
        });
    }

    const token = setUser(user);
    res.cookie('token',token);
    return res.redirect("/");

    // return res.json({token})
}


module.exports = {
    handleUserSignup,
    handleUserLogin,
}