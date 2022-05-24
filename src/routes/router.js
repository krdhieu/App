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
import nhanXetController from '../controller/nhanXetController';
import jwt from 'jsonwebtoken';
import path from 'path';
import multer from 'multer';
var appRoot = require('app-root-path');
import thanhVienHDKHController from '../controller/thanhVienHDKHController';
import chamDiemController from '../controller/chamDiemController';
import downloadAttachFileController from '../controller/downloadAttachFileController';
import connectDB from '../configs/connectDB';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + '/src/files');
    },

    filename: async function (req, file, cb) {
        const access_token = req.cookies.access_token.split(' ')[1];
        let payLoad = jwt.verify(access_token, process.env.JWT_ACCESS_KEY);

        let [sangkien] = await connectDB.execute(
            'SELECT * FROM `sangkien` INNER JOIN nguoithamgia ON sangkien.masangkien = nguoithamgia.masangkien WHERE manhanvien = ? and matrangthai = 2',
            [payLoad.nhanVienId]
        );
        cb(
            null,
            'sangkien-' +
            sangkien[0].masangkien +
            path.extname(file.originalname)
        );
    },
});

const Filter = function (req, file, cb) {
    // Accept file only
    if (!file.originalname.match(/\.(PDF|pdf)$/)) {
        req.fileValidationError = 'Only PDF files are allowed!';
        return cb(new Error('Only PDF files are allowed!'), false);
    }
    cb(null, true);
};
let upload = multer({ storage: storage, fileFilter: Filter });
const initRouter = (app) => {
    //phong ban
    router.get('/quanlyphongban', phongbanController.viewPhongBan); ////chinh
    router.get('/quanlyphongban/sua/:maphongban', phongbanController.editPhongBan);
    router.post('/uploadphongban', phongbanController.uploadPhongban);
    router.post('/addphongban', phongbanController.addPhongban);
    // chuc vu
    router.get('/quanlychucvu', chucvuController.viewChucvu); //chinh
    router.get('/quanlychucvu/sua/:machucvu', chucvuController.editChucvu);
    router.post('/uploadchucvu', chucvuController.uploadChucvu);
    router.post('/addchucvu', chucvuController.addChucvu);
    // chức vụ hội đồng
    router.get('/quanlychucvuhd', chucvuhdController.viewChucvuhd); //chinh
    router.get(
        '/quanlychucvuhd/sua/:machucvuhd',
        chucvuhdController.editChucvuhd
    );
    router.post('/uploadchucvuhd', chucvuhdController.uploadChucvuhd);
    router.post('/addchucvuhd', chucvuhdController.addChucvuhd);
    // xếp loại
    router.get('/quanlyxeploai', xeploaiController.viewXeploai); //chinh
    router.get('/quanlyxeploai/sua/:maxeploai', xeploaiController.editXeploai);
    router.post('/uploadxeploai', xeploaiController.uploadXeploai);
    //router.post('/addxeploai', xeploaiController.addXeploai);
    // trạng thái sáng kiến

    router.get(
        '/quanlytrangthaisangkien',
        trangthaisangkienController.viewTrangthaisangkien
    ); //chinh
    router.get(
        '/quanlytrangthaisangkien/sua/:matrangthai',
        trangthaisangkienController.editTrangthaisangkien
    );
    router.post(
        '/uploadtrangthaisangkien',
        trangthaisangkienController.uploadTrangthaisangkien
    );
    // router.post(
    //     '/addtrangthaisangkien',
    //     trangthaisangkienController.addTrangthaisangkien
    // );
    // tạo nhân viên
    router.get('/quanlynhanvien', nhanvienController.viewNhanvien); //chinh
    router.get(
        '/quanlynhanvien/sua/:manhanvien',
        nhanvienController.editNhanvien
    );
    router.post('/uploadnhanvien', nhanvienController.uploadNhanvien);
    router.post('/addnhanvien', nhanvienController.addNhanvien);
    router.get('/quanlynhanvien', nhanvienController.viewNhanvien);
    router.post('/setnghiviec', nhanvienController.nghiviecNhanvien);
    router.get(
        '/thongtincanhan',
        verifyAccessToken.verifyAccessTokenMiddleware,
        nhanvienController.thongtinNhanvien
    );
    router.post(
        '/suanhanvien-user',
        verifyAccessToken.verifyAccessTokenMiddleware,
        nhanvienController.suaNhanvienuser
    );
    router.post(
        '/uploadnhanvien-user',
        verifyAccessToken.verifyAccessTokenMiddleware,
        nhanvienController.uploadNhanvienuser
    );
    // tạo sang kien

    router.get('/quanlysangkien', sangkienController.viewSangkien);
    router.get(
        '/quanlyduyetsangkien',
        verifyAccessToken.verifyAccessTokenMiddleware,
        sangkienController.quanlyduyetSangkien
    );
    router.get(
        '/quanlysangkien/duyet/:masangkien',
        sangkienController.duyetSangkien
    );
    router.get(
        '/quanlysangkien/huy/:masangkien',
        sangkienController.huySangkien
    );
    router.post('/quanlysangkien/huysangkien', sangkienController.huy1Sangkien);
    router.post(
        '/addsangkien',
        verifyAccessToken.verifyAccessTokenMiddleware,
        sangkienController.addSangkien
    );
    router.get('/create-sangkien', sangkienController.createSangkien);
    router.get(
        '/chitietsangkien',
        verifyAccessToken.verifyAccessTokenMiddleware,
        sangkienController.detailSangkien
    );
    router.post(
        '/upload-file',
        upload.single('profile_file'),
        sangkienController.UploadProfileFile
    );
    router.get('/home/history', verifyAccessToken.verifyAccessTokenMiddleware, sangkienController.history);

    // tạo đợt sáng kiến
    router.get('/quanlydotsangkien', dotsangkienController.viewDotsangkien); //chinh
    router.post('/adddotsangkien', dotsangkienController.addDotsangkien);
    router.get('/editdotsangkien', dotsangkienController.suaDotsangkien);
    router.post('/uploaddotsangkien', dotsangkienController.uploadDotsangkien);
    router.get('/ketthucdot', dotsangkienController.ketthucDotsangkien);
    //-----------------------------------------------------------------------------------------------------------//
    //-----------------------------------------------------------------------------------------------------------//
    //sua nhan xet
    router.post('/edit-nhanxet', nhanXetController.editNhanXet);
    // them nhan xet
    router.post('/create-nhanxet', nhanXetController.createNhanXet);
    // cham diem sang kien
    router.post(
        '/edit-chitiet-chamdiem',
        verifyAccessToken.verifyAccessTokenAndAdminGiamKhao,
        chamDiemController.editChiTietChamDiem
    );
    router.post(
        '/create-chitiet-chamdiem',
        verifyAccessToken.verifyAccessTokenAndAdminGiamKhao,
        chamDiemController.createChiTietChamDiem
    );
    // hien thi trang chi tiet sang kien de cham diem
    router.get(
        '/detail-sangkien',
        verifyAccessToken.verifyAccessTokenAndAdminGiamKhao,
        chamDiemController.getDetailSangKien
    );
    router.get('/get-cham-diem', chamDiemController.getChamDiemPage);
    //sua thong tin thanh vien hd
    router.post('/edit-thanhvien-hd', thanhVienHDKHController.editThanhVienHD);
    //them thong tin thanh vien hd
    router.post(
        '/create-thanhvien-hd',
        thanhVienHDKHController.createThanhVienHD
    );
    // ket thuc nhiem ky hoi dong khoa hoc
    router.get('/change-status-hdkh', hoiDongKHController.changeStateHDKH);
    //sua hoi dong khoa hoc
    router.post('/edit-hdkh', hoiDongKHController.editHDKH);
    //trang sua hoi dong khoa hoc
    router.get('/get-edit-hdkh', hoiDongKHController.getEditHDKH);
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
    //tim kiem tai khoan theo ten tai khoan
    router.post(
        '/get-account-byname',
        manageAccountController.searchAccountByName
    );
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
    router.get('/download/file/', downloadAttachFileController.download);
    return app.use('/', router);
};

export default initRouter;
