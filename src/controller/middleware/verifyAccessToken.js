import jwt from 'jsonwebtoken';
import quyenService from '../../services/quyenService';

const verifyAccessTokenMiddleware = (req, res, next) => {
    if (!req.cookies.access_token) {
        return res.redirect('/');
    }
    const access_token = req.cookies.access_token.split(' ')[1];
    jwt.verify(access_token, process.env.JWT_ACCESS_KEY, (err, payload) => {
        if (err) {
            return res.render('sessionExpired.ejs');
        } else {
            console.log(payload);
            next();
        }
    });
};

const verifyAccessTokenAndAdminAuth = async (req, res, next) => {
    if (!req.cookies.access_token) {
        return res.redirect('/');
    }
    const access_token = req.cookies.access_token.split(' ')[1];
    try {
        let payload = jwt.verify(access_token, process.env.JWT_ACCESS_KEY);
        let check = await quyenService.checkQuyen(payload.roleId);
        if (check !== 'ADMIN') {
            return res.send('ADMIN only!!!');
        }
        req.emailLogin = payload.email;
        req.nhanVienId = payload.nhanVienId;
        req.roleId = payload.roleId;
    } catch (error) {
        return res.render('sessionExpired.ejs');
    }
    next();
};

module.exports = {
    verifyAccessTokenMiddleware: verifyAccessTokenMiddleware,
    verifyAccessTokenAndAdminAuth: verifyAccessTokenAndAdminAuth,
};
