import express from 'express';
import loginController from '../controller/loginController';
import manageAccountController from '../controller/manageAccountController';
import phongbanController from '../controller/phongbanController';
import chucvuController from '../controller/chucvuController';
import chucvuhdController from '../controller/chucvuhdController';
import xeploaiController from '../controller/xeploaiController';
import trangthaisangkienController from '../controller/trangthaisangkienController';
import sangkienController from '../controller/sangkienController';
import dotsangkienController from '../controller/dotsangkienController';
import verifyAccessToken from '../controller/middleware/verifyAccessToken';
import hoiDongKHController from '../controller/hoiDongKHController';
import nhanvienController from '../controller/nhanvienController';
import { route } from 'express/lib/application';
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

    router.get(
        '/quanlytrangthaisangkien',
        trangthaisangkienController.viewTrangthaisangkien
    );
    router.get(
        '/quanlytrangthaisangkien/sua/:id',
        trangthaisangkienController.editTrangthaisangkien
    );
    router.post(
        '/uploadtrangthaisangkien',
        trangthaisangkienController.uploadTrangthaisangkien
    );
    router.post(
        '/addtrangthaisangkien',
        trangthaisangkienController.addTrangthaisangkien
    );
    // tạo nhân viên
    router.get('/quanlynhanvien', nhanvienController.viewNhanvien);
    router.get('/quanlynhanvien/sua/:id', nhanvienController.editNhanvien);
    router.post('/uploadnhanvien', nhanvienController.uploadNhanvien);
    router.post('/addnhanvien', nhanvienController.addNhanvien);

    // tạo nhân viên
    router.get('/quanlysangkien', sangkienController.viewSangkien);
    //router.get('/quanlysangkien/:id', nhanvienController.editNhanvien);
    //router.post('/uploadsangkien', sangkienController.uploadSangkien);
    router.post('/addsangkien', sangkienController.addSangkien);
    router.get('/create-sangkien', sangkienController.createSangkien);
    // tạo đợt sáng kiến
    router.get('/quanlydotsangkien', dotsangkienController.viewDotsangkien);
    router.post('/adddotsangkien', dotsangkienController.addDotsangkien);

    //trang chi tiet hoi dong khoa hoc
    router.get('/get-detail-hdkh', hoiDongKHController.getDetailHDKH);
    // trang them moi hoi dong khoa hoc
    router.get('/get-create-hdkh', hoiDongKHController.getCreateHDKH);
    //trang quan ly hoi dong khoa hoc
    router.post('/create-hdkh', hoiDongKHController.createHDKH);
    router.get(
        '/get-hdkh',
        verifyAccessToken.verifyAccessTokenAndAdminAuth,
        hoiDongKHController.getAllHDKH
    );
    // tao tai khoan
    router.post('/create-account', manageAccountController.createAccount);
    //mo trang tao tai khoan
    router.get(
        '/get-create-account',
        verifyAccessToken.verifyAccessTokenAndAdminAuth,
        manageAccountController.getCreateAccount
    );
    // trang sua quyen tai khoan
    router.get('/get-edit-account', manageAccountController.getEditAccount);
    // trang quan ly tai khoan
    router.get('/manage-account', manageAccountController.manageAccount);
    //dang xuat
    router.get('/logout', loginController.handleLogout);
    //sua quyen cua tai khoan
    router.post('/edit-role', manageAccountController.editRole);
    // trang doi mat khau
    router.get(
        '/get-change-password',
        verifyAccessToken.verifyAccessTokenMiddleware,
        manageAccountController.getChangePassword
    );
    // thuc hien doi mat khau
    router.post(
        '/change-password',
        verifyAccessToken.verifyAccessTokenMiddleware,
        manageAccountController.changePassword
    );
    //thuc hien reset mat khau
    router.get('/reset-password', manageAccountController.resetPassword);
    // trang chu
    router.get(
        '/home',
        verifyAccessToken.verifyAccessTokenMiddleware,
        loginController.getHome
    );
    //xu ly dang nhap
    router.post('/', loginController.handleLogin);
    //trang dang nhap
    router.get('/', loginController.getLogin);

    return app.use('/', router);
};

export default initRouter;
