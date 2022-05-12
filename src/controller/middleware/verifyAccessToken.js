import jwt from 'jsonwebtoken';
import quyenService from '../../services/quyenService';

const verifyAccessTokenMiddleware = (req, res, next) => {
    if (!req.cookies.access_token) {
        return res.redirect('/');
    }
    const access_token = req.cookies.access_token.split(' ')[1];
    try {
        let payLoad = jwt.verify(access_token, process.env.JWT_ACCESS_KEY);
        req.emailLogin = payLoad.email;
        req.nhanVienId = payLoad.nhanVienId;
        req.roleId = payLoad.roleId;
    } catch (e) {
        return res.render('sessionExpired.ejs');
    }
    next();
};

const verifyAccessTokenAndAdminAuth = async (req, res, next) => {
    if (!req.cookies.access_token) {
        return res.redirect('/');
    }
    const access_token = req.cookies.access_token.split(' ')[1];
    try {
        let payLoad = jwt.verify(access_token, process.env.JWT_ACCESS_KEY);
        let check = await quyenService.checkQuyen(payLoad.roleId);
        if (check !== 'ADMIN') {
            return res.send('ADMIN only!!!');
        }
        req.emailLogin = payLoad.email;
        req.nhanVienId = payLoad.nhanVienId;
        req.roleId = payLoad.roleId;
    } catch (error) {
        return res.render('sessionExpired.ejs');
    }
    next();
};

module.exports = {
    verifyAccessTokenMiddleware: verifyAccessTokenMiddleware,
    verifyAccessTokenAndAdminAuth: verifyAccessTokenAndAdminAuth,
};
