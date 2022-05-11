import express from 'express';
import loginController from '../controller/loginController';
import createAccountController from '../controller/createAccountController';
import phongbanController from '../controller/phongbanController';
import chucvuController from '../controller/chucvuController';
import chucvuhdController from '../controller/chucvuhdController';
import xeploaiController from '../controller/xeploaiController';
import trangthaisangkienController from '../controller/trangthaisangkienController';

import verifyAccessToken from '../controller/middleware/verifyAccessToken';

import nhanvienController from '../controller/nhanvienController';

const router = express.Router();

const initRouter = (app) => {
    //phong ban
    router.get('/quanlyphongban', phongbanController.viewPhongBan);
    router.get('/quanlyphongban/sua/:id', phongbanController.editPhongBan);
    router.post('/uploadphongban', phongbanController.uploadPhongban);
    router.post('/addphongban', phongbanController.addPhongban);
    // chuc vu
    router.get('/quanlychucvu', chucvuController.viewChucvu);
    router.get('/quanlychucvu/sua/:id', chucvuController.editChucvu);
    router.post('/uploadchucvu', chucvuController.uploadChucvu);
    router.post('/addchucvu', chucvuController.addChucvu);
    // chức vụ hội đồng
    router.get('/quanlychucvuhd', chucvuhdController.viewChucvuhd);
    router.get('/quanlychucvuhd/sua/:id', chucvuhdController.editChucvuhd);
    router.post('/uploadchucvuhd', chucvuhdController.uploadChucvuhd);
    router.post('/addchucvuhd', chucvuhdController.addChucvuhd);
    // xếp loại
    router.get('/quanlyxeploai', xeploaiController.viewXeploai);
    router.get('/quanlyxeploai/sua/:id', xeploaiController.editXeploai);
    router.post('/uploadxeploai', xeploaiController.uploadXeploai);
    router.post('/addxeploai', xeploaiController.addXeploai);
    // trạng thái sáng kiến

    router.get('/quanlytrangthaisangkien', trangthaisangkienController.viewTrangthaisangkien);
    router.get('/quanlytrangthaisangkien/sua/:id', trangthaisangkienController.editTrangthaisangkien);
    router.post('/uploadtrangthaisangkien', trangthaisangkienController.uploadTrangthaisangkien);
    router.post('/addtrangthaisangkien', trangthaisangkienController.addTrangthaisangkien);
    // tạo nhân viên
    router.get('/quanlynhanvien', nhanvienController.viewNhanvien);
    router.get('/quanlynhanvien/sua/:id', nhanvienController.editNhanvien);
    router.post('/uploadnhanvien', nhanvienController.uploadNhanvien);
    router.post('/addnhanvien', nhanvienController.addNhanvien);

    // tao tai khoan
    router.post('/create-account', createAccountController.createAccount);
    //mo trang tao tai khoan
    router.get(
        '/get-create-account',
        verifyAccessToken.verifyAccessTokenAndAdminAuth,
        createAccountController.getCreateAccount
    );
    router.get('/logout', loginController.handleLogout);
    //trang dang nhap
    router.post('/login', loginController.handleLogin);
    router.get('/', loginController.getLogin);
    return app.use('/', router);
};

export default initRouter;
