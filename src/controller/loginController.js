import express from 'express';
import login from '../services/loginService';
let getLogin = (req, res) => {
    res.render('loginView.ejs');
};

let handleLogin = async (req, res) => {
    let { email, password } = req.body;
    if (!email || !password) {
        return res.redirect('/');
    }
    let user = await login.handleLogin(email);
    if (user.length !== 1) {
        return res.redirect('/');
    }
    res.render('home.ejs');
};
module.exports = {
    getLogin: getLogin,
    handleLogin: handleLogin,
};
