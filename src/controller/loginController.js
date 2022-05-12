import bcrypt from 'bcryptjs';
import login from '../services/loginService';
let getLogin = (req, res) => {
    return res.render('loginView.ejs');
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
    let check = await bcrypt.compareSync(password, 123);
    if (!check) {
        return res.redirect('/');
    }
    return res.render('home.ejs');
};
module.exports = {
    getLogin: getLogin,
    handleLogin: handleLogin,
};
