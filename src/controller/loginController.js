import bcrypt from 'bcryptjs';
import login from '../services/loginService';
import jwt from 'jsonwebtoken';
let getLogin = (req, res) => {
    return res.render('loginView.ejs', {
        wrong: '',
    });
};
///////
let handleLogin = async (req, res) => {
    let { email, password } = req.body;
    if (!email || !password) {
        return res.redirect('/');
    }
    let user = await login.handleLogin(email);
    if (!user) {
        return res.render('loginView.ejs', {
            wrong: `'${email}' or password does not exist`,
        });
    }
    let check = await bcrypt.compareSync(password, user.matkhau);
    if (!check) {
        return res.redirect('/');
    }
    const accessToken = jwt.sign(
        {
            email: user.tentaikhoan,
            nhanVienId: user.id_nhanvien,
            roleId: user.id_quyen,
        },
        process.env.JWT_ACCESS_KEY,
        {
            expiresIn: '2d',
        }
    );
    const refreshToken = jwt.sign(
        {
            email: user.tentaikhoan,
            nhanVienId: user.id_nhanvien,
            roleId: user.id_quyen,
        },
        process.env.JWT_REFRESH_KEY,
        {
            expiresIn: '365d',
        }
    );
    res.cookie('access_token', 'Bearer ' + accessToken);
    return res.render('home.ejs');
};

const handleLogout = (req, res) => {
    res.clearCookie('access_token');
    res.redirect('/');
};

module.exports = {
    getLogin: getLogin,
    handleLogin: handleLogin,
    handleLogout: handleLogout,
};
