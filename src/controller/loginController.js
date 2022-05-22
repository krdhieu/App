import bcrypt from 'bcryptjs';
import login from '../services/loginService';
import jwt from 'jsonwebtoken';
// hien thi trang login
let getLogin = (req, res) => {
    let { alert } = req.query;
    return res.render('loginView.ejs', {
        alert: alert,
    });
};
// xu ly login
let handleLogin = async (req, res) => {
    let { email, password } = req.body;

    if (!email || !password) {
        return res.redirect('/');
    }
    let user = await login.handleLogin(email);
    if (!user) {
        return res.redirect('/?alert=' + encodeURIComponent('wrong'));
    }
    let check = await bcrypt.compareSync(password, user.matkhau);
    if (!check) {
        return res.redirect('/?alert=' + encodeURIComponent('wrong'));
    }
    const accessToken = jwt.sign(
        {
            email: user.tentaikhoan,
            nhanVienId: user.manhanvien,
            roleId: user.maquyen,
        },
        process.env.JWT_ACCESS_KEY,
        {
            expiresIn: '2d',
        }
    );
    const refreshToken = jwt.sign(
        {
            email: user.tentaikhoan,
            nhanVienId: user.manhanvien,
            roleId: user.maquyen,
        },
        process.env.JWT_REFRESH_KEY,
        {
            expiresIn: '365d',
        }
    );
    res.cookie('access_token', 'Bearer ' + accessToken);
    return res.redirect('/home');
};
//xu ly logout
const handleLogout = (req, res) => {
    res.clearCookie('access_token');
    return res.redirect('/');
};
// hien thi trang home

const getHome = (req, res) => {
    return res.render('home.ejs');
};
module.exports = {
    getLogin: getLogin,
    handleLogin: handleLogin,
    handleLogout: handleLogout,
    getHome: getHome,
};
