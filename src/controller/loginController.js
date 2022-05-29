import bcrypt from 'bcryptjs';
import login from '../services/loginService';
import jwt from 'jsonwebtoken';
import dotSangKienService from '../services/dotSangKienService';
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

const getHome = async (req, res) => {
    let { alert } = req.query;
    let dotHienTai = await dotSangKienService.getDotHienTai();

    if (dotHienTai.length === 1) {
        return res.render('home.ejs', { dotHienTai, alert });
    }

    return res.render('home.ejs', {
        message: 'Hiện không có đợt sáng kiến',
        alert,
    });
};
module.exports = {
    getLogin: getLogin,
    handleLogin: handleLogin,
    handleLogout: handleLogout,
    getHome: getHome,
};
