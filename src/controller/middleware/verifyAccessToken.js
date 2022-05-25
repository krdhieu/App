import jwt from 'jsonwebtoken';
import quyenService from '../../services/quyenService';
// khong dung
const verifyAccessTokenMiddleware = async (req, res, next) => {
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

// kiem tra la nhan vien hoac admin khong phai giam khao thi cho truy cap trang

let verifyAccessTokenGiamKhao = async (req, res, next) => {
    if (!req.cookies.access_token) {
        return res.redirect('/');
    }
    const access_token = req.cookies.access_token.split(' ')[1];
    try {
        let payLoad = jwt.verify(access_token, process.env.JWT_ACCESS_KEY);
        let check = await quyenService.checkQuyen(payLoad.roleId);
        if (check !== 'GIAMKHAO' && check !== 'ADMIN') {
            return res.redirect('/' + encodeURIComponent('1'));
        }
        req.emailLogin = payLoad.email;
        req.nhanVienId = payLoad.nhanVienId;
        req.roleId = payLoad.roleId;
    } catch (error) {
        return res.render('sessionExpired.ejs');
    }
    next();
};

// kiem tra quyen admin

const verifyAccessTokenAdmin = async (req, res, next) => {
    if (!req.cookies.access_token) {
        return res.redirect('/');
    }
    const access_token = req.cookies.access_token.split(' ')[1];
    try {
        let payLoad = jwt.verify(access_token, process.env.JWT_ACCESS_KEY);
        let check = await quyenService.checkQuyen(payLoad.roleId);
        if (check !== 'ADMIN') {
            return res.redirect('/home?alert=' + encodeURIComponent('1'));
        }
        req.emailLogin = payLoad.email;
        req.nhanVienId = payLoad.nhanVienId;
        req.roleId = payLoad.roleId;
    } catch (error) {
        return res.render('sessionExpired.ejs');
    }
    next();
};

// check nhan vien
const verifyAccessTokenNhanVien = async (req, res, next) => {
    if (!req.cookies.access_token) {
        return res.redirect('/');
    }
    const access_token = req.cookies.access_token.split(' ')[1];
    try {
        let payLoad = jwt.verify(access_token, process.env.JWT_ACCESS_KEY);
        let check = await quyenService.checkQuyen(payLoad.roleId);
        if (
            check !== 'ADMIN' &&
            check !== 'NHANVIEN' &&
            check !== 'TRUONGPHONG'
        ) {
            return res.redirect('/home?alert=' + encodeURIComponent('1'));
        }
        req.emailLogin = payLoad.email;
        req.nhanVienId = payLoad.nhanVienId;
        req.roleId = payLoad.roleId;
    } catch (error) {
        return res.render('sessionExpired.ejs');
    }
    next();
};

// check truong phong + admin
const verifyAccessTokenTruongPhong = async (req, res, next) => {
    if (!req.cookies.access_token) {
        return res.redirect('/');
    }
    const access_token = req.cookies.access_token.split(' ')[1];
    try {
        let payLoad = jwt.verify(access_token, process.env.JWT_ACCESS_KEY);
        let check = await quyenService.checkQuyen(payLoad.roleId);
        if (check !== 'ADMIN' && check !== 'TRUONGPHONG') {
            return res.redirect('/home?alert=' + encodeURIComponent('1'));
        }
        req.emailLogin = payLoad.email;
        req.nhanVienId = payLoad.nhanVienId;
        req.roleId = payLoad.roleId;
    } catch (error) {
        return res.render('sessionExpired.ejs');
    }
    next();
};

//kiem tra la quyen admin hoac giam khao
// const verifyAccessTokenAndAdminGiamKhao = async (req, res, next) => {
//     if (!req.cookies.access_token) {
//         return res.redirect('/');
//     }
//     const access_token = req.cookies.access_token.split(' ')[1];
//     try {
//         let payLoad = jwt.verify(access_token, process.env.JWT_ACCESS_KEY);
//         let check = await quyenService.checkQuyen(payLoad.roleId);
//         if (check !== 'ADMIN' && check !== 'GIAMKHAO') {
//             return res.redirect(`/home?alert=`+encodeURIComponent('1'));
//         }
//         req.emailLogin = payLoad.email;
//         req.nhanVienId = payLoad.nhanVienId;
//         req.roleId = payLoad.roleId;
//     } catch (error) {
//         return res.render('sessionExpired.ejs');
//     }
//     next();
// };

module.exports = {
    verifyAccessTokenGiamKhao,
    verifyAccessTokenAdmin,
    verifyAccessTokenNhanVien,
    verifyAccessTokenTruongPhong,
    verifyAccessTokenMiddleware,
};
