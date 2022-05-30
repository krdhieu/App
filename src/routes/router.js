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
import diemTrungBinhController from '../controller/diemTrungBinhController';
import danhGiaSangKienController from '../controller/danhGiaSangKienController';
import khenThuongController from '../controller/khenThuongController';
import jwt from 'jsonwebtoken';
import path from 'path';
import multer from 'multer';
var appRoot = require('app-root-path');
import thanhVienHDKHController from '../controller/thanhVienHDKHController';
import chamDiemController from '../controller/chamDiemController';
import downloadAttachFileController from '../controller/downloadAttachFileController';
import connectDB from '../configs/connectDB';

const router = express.Router();

// luu tru file tren may
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
// check duoi file
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
    router.get(
        '/quanlyphongban',
        verifyAccessToken.verifyAccessTokenAdmin,
        phongbanController.viewPhongBan
    ); ////chinh
    // bang sua phong ban
    router.get(
        '/quanlyphongban/sua/:maphongban',
        verifyAccessToken.verifyAccessTokenAdmin,
        phongbanController.editPhongBan
    );
    // sua phong ban csdl
    router.post(
        '/uploadphongban',
        verifyAccessToken.verifyAccessTokenAdmin,
        phongbanController.uploadPhongban
    );
    // them phong ban csdl
    router.post(
        '/addphongban',
        verifyAccessToken.verifyAccessTokenAdmin,
        phongbanController.addPhongban
    );
    // chuc vu
    router.get(
        '/quanlychucvu',
        verifyAccessToken.verifyAccessTokenAdmin,
        chucvuController.viewChucvu
    ); //chinh
    router.get(
        '/quanlychucvu/sua/:machucvu',
        verifyAccessToken.verifyAccessTokenAdmin,
        chucvuController.editChucvu
    );
    // sua chuc vu csdl
    router.post(
        '/uploadchucvu',
        verifyAccessToken.verifyAccessTokenAdmin,
        chucvuController.uploadChucvu
    );
    //them chuc vu csdl
    router.post(
        '/addchucvu',
        verifyAccessToken.verifyAccessTokenAdmin,
        chucvuController.addChucvu
    );
    // chức vụ hội đồng
    router.get(
        '/quanlychucvuhd',
        verifyAccessToken.verifyAccessTokenAdmin,
        chucvuhdController.viewChucvuhd
    ); //chinh
    router.get(
        '/quanlychucvuhd/sua/:machucvuhd',
        verifyAccessToken.verifyAccessTokenAdmin,
        chucvuhdController.editChucvuhd
    );
    // sua chuc vu hoi dong csdl
    router.post(
        '/uploadchucvuhd',
        verifyAccessToken.verifyAccessTokenAdmin,
        chucvuhdController.uploadChucvuhd
    );
    // thêm chức vụ hội đồng csdl
    router.post(
        '/addchucvuhd',
        verifyAccessToken.verifyAccessTokenAdmin,
        chucvuhdController.addChucvuhd
    );
    // xếp loại
    router.get(
        '/quanlyxeploai',
        verifyAccessToken.verifyAccessTokenAdmin,
        xeploaiController.viewXeploai
    ); //chinh
    /// bảng sửa xếp loại
    router.get(
        '/quanlyxeploai/sua/:maxeploai',
        verifyAccessToken.verifyAccessTokenAdmin,
        xeploaiController.editXeploai
    );
    // sửa xếp loại csdl
    router.post(
        '/uploadxeploai',
        verifyAccessToken.verifyAccessTokenAdmin,
        xeploaiController.uploadXeploai
    );
    //router.post('/addxeploai', xeploaiController.addXeploai);
    // trạng thái sáng kiến

    router.get(
        '/quanlytrangthaisangkien',
        verifyAccessToken.verifyAccessTokenAdmin,
        trangthaisangkienController.viewTrangthaisangkien
    ); //chinh
    // bảng sửa trạng thái sáng kiến
    router.get(
        '/quanlytrangthaisangkien/sua/:matrangthai',
        verifyAccessToken.verifyAccessTokenAdmin,
        trangthaisangkienController.editTrangthaisangkien
    );
    // sửa trạng thái sáng kien csdl
    router.post(
        '/uploadtrangthaisangkien',
        verifyAccessToken.verifyAccessTokenAdmin,
        trangthaisangkienController.uploadTrangthaisangkien
    );
    // router.post(
    //     '/addtrangthaisangkien',
    //     verifyAccessToken.verifyAccessTokenAdmin,
    //     trangthaisangkienController.addTrangthaisangkien
    // );

    // tạo nhân viên
    router.get(
        '/quanlynhanvien',
        verifyAccessToken.verifyAccessTokenAdmin,
        nhanvienController.viewNhanvien
    ); //chinh
    // sửa thông tin nhân viên admin
    router.get(
        '/quanlynhanvien/sua/:manhanvien',
        verifyAccessToken.verifyAccessTokenAdmin,
        nhanvienController.editNhanvien
    );
    // sửa thông tin nhân viên admin csdl
    router.post(
        '/uploadnhanvien',
        verifyAccessToken.verifyAccessTokenAdmin,
        nhanvienController.uploadNhanvien
    );
    // thêm nhân viên csdl
    router.post(
        '/addnhanvien',
        verifyAccessToken.verifyAccessTokenAdmin,
        nhanvienController.addNhanvien
    );
    // router.get(
    //     '/quanlynhanvien',
    //     verifyAccessToken.verifyAccessTokenAdmin,
    //     nhanvienController.viewNhanvien
    // );
    // chuyển trạng thái nhân viên sang nghỉ việc
    router.get(
        '/setnghiviec',
        verifyAccessToken.verifyAccessTokenAdmin,
        nhanvienController.nghiviecNhanvien
    );
    // hiện thông tin nhân viết mức cá nhân
    router.get(
        '/thongtincanhan',
        verifyAccessToken.verifyAccessTokenMiddleware,
        nhanvienController.thongtinNhanvien
    );
    // sửa thông tin nhân viên
    router.post(
        '/suanhanvien-user',
        verifyAccessToken.verifyAccessTokenMiddleware,
        nhanvienController.suaNhanvienuser
    );
    // sửa thông tin nhân viên mức nhân viên
    router.post(
        '/uploadnhanvien-user',
        verifyAccessToken.verifyAccessTokenMiddleware,
        nhanvienController.uploadNhanvienuser
    );

    // tạo sang kien

    router.get(
        '/quanlysangkien',
        verifyAccessToken.verifyAccessTokenAdmin,
        sangkienController.viewSangkien
    );
    // duyệt sáng kiên
    router.get(
        '/quanlyduyetsangkien',
        verifyAccessToken.verifyAccessTokenTruongPhong,
        sangkienController.quanlyduyetSangkien
    );
    // chi tiet duyet sang kien
    router.get(
        '/chitietduyetsangkien',
        verifyAccessToken.verifyAccessTokenTruongPhong,
        sangkienController.chitietduyetSangkien
    );
    // xet duyet sang kien
    router.get(
        '/quanlysangkien/duyet/:masangkien',
        verifyAccessToken.verifyAccessTokenTruongPhong,
        sangkienController.duyetSangkien
    );
    // ly do huy sang kien
    router.get(
        '/quanlysangkien/huy/:masangkien',
        verifyAccessToken.verifyAccessTokenTruongPhong,
        sangkienController.huySangkien
    );
    // huy sang kien
    router.post(
        '/quanlysangkien/huysangkien',
        verifyAccessToken.verifyAccessTokenTruongPhong,
        sangkienController.huy1Sangkien
    );
    // them sang kien vao csdl
    router.post(
        '/addsangkien',
        verifyAccessToken.verifyAccessTokenNhanVien,
        sangkienController.addSangkien
    );
    // bang them sang kien
    router.get(
        '/create-sangkien',
        verifyAccessToken.verifyAccessTokenNhanVien,
        sangkienController.createSangkien
    );
    // thêm tỷ lệ vai trò vào sáng kiến
    router.post(
        '/settylevaitro',
        verifyAccessToken.verifyAccessTokenNhanVien,
        sangkienController.tylevaitro
    );
    //chi tiet sang kien dang thuc hien
    router.get(
        '/chitietsangkien',
        verifyAccessToken.verifyAccessTokenNhanVien,
        sangkienController.detailSangkien
    );
    // chi tiet sang kien admin
    router.get(
        '/detailsangkien',
        verifyAccessToken.verifyAccessTokenNhanVien,
        sangkienController.chitietSangkien
    );
    // nhan vien tien hanh upload file
    router.post(
        '/upload-file',
        verifyAccessToken.verifyAccessTokenNhanVien,
        upload.single('profile_file'),
        sangkienController.UploadProfileFile
    );
    //lich su sang kien
    router.get(
        '/home/history',
        verifyAccessToken.verifyAccessTokenNhanVien,
        sangkienController.history
    );

    // tạo đợt sáng kiến
    router.get(
        '/quanlydotsangkien',
        verifyAccessToken.verifyAccessTokenAdmin,
        dotsangkienController.viewDotsangkien
    ); //chinh
    router.post(
        '/adddotsangkien',
        verifyAccessToken.verifyAccessTokenAdmin,
        dotsangkienController.addDotsangkien
    );
    // bang sua dot sang kien
    router.get(
        '/editdotsangkien',
        verifyAccessToken.verifyAccessTokenAdmin,
        dotsangkienController.suaDotsangkien
    );
    // sua dot sang kien voi csdl
    router.post(
        '/uploaddotsangkien',
        verifyAccessToken.verifyAccessTokenAdmin,
        dotsangkienController.uploadDotsangkien
    );
    // ket thuc dot sang kien hien tai
    router.get(
        '/ketthucdot',
        verifyAccessToken.verifyAccessTokenAdmin,
        dotsangkienController.ketthucDotsangkien
    );
    // xóa đợt sáng kiến
    router.get(
        '/xoadotsangkien',
        verifyAccessToken.verifyAccessTokenAdmin,
        dotsangkienController.xoaDotsangkien
    );
    //-----------------------------------------------------------------------------------------------------------//
    //-----------------------------------------------------------------------------------------------------------//
    //sua nhan xet
    router.post(
        '/edit-nhanxet',
        verifyAccessToken.verifyAccessTokenGiamKhao,
        nhanXetController.editNhanXet
    );
    // them nhan xet
    router.post(
        '/create-nhanxet',
        verifyAccessToken.verifyAccessTokenGiamKhao,
        nhanXetController.createNhanXet
    );
    // cham diem sang kien
    router.post(
        '/edit-chitiet-chamdiem',
        verifyAccessToken.verifyAccessTokenGiamKhao,

        chamDiemController.editChiTietChamDiem
    );
    router.post(
        '/create-chitiet-chamdiem',
        verifyAccessToken.verifyAccessTokenGiamKhao,

        chamDiemController.createChiTietChamDiem
    );
    // hien thi trang chi tiet sang kien de cham diem
    router.get(
        '/detail-sangkien',
        verifyAccessToken.verifyAccessTokenGiamKhao,
        chamDiemController.getDetailSangKien
    );
    //hien thi trang danh sach cham diem
    router.get(
        '/get-cham-diem',
        verifyAccessToken.verifyAccessTokenGiamKhao,
        chamDiemController.getChamDiemPage
    );
    //sua thong tin thanh vien hd
    router.post(
        '/edit-thanhvien-hd',
        verifyAccessToken.verifyAccessTokenAdmin,
        thanhVienHDKHController.editThanhVienHD
    );
    //them thong tin thanh vien hd
    router.post(
        '/create-thanhvien-hd',
        verifyAccessToken.verifyAccessTokenAdmin,
        thanhVienHDKHController.createThanhVienHD
    );

    //xoa thanh vien hd
    router.post(
        '/delete-thanhvien-hd',
        verifyAccessToken.verifyAccessTokenAdmin,
        thanhVienHDKHController.deleteThanhVienKhongCoRangBuoc
    );
    // ket thuc nhiem ky hoi dong khoa hoc
    router.get(
        '/change-status-hdkh',
        verifyAccessToken.verifyAccessTokenAdmin,
        hoiDongKHController.changeStateHDKH
    );
    //sua hoi dong khoa hoc
    router.post(
        '/edit-hdkh',
        verifyAccessToken.verifyAccessTokenAdmin,
        hoiDongKHController.editHDKH
    );
    //trang sua hoi dong khoa hoc
    router.get(
        '/get-edit-hdkh',
        verifyAccessToken.verifyAccessTokenAdmin,

        hoiDongKHController.getEditHDKH
    );
    //trang chi tiet hoi dong khoa hoc
    router.get(
        '/get-detail-hdkh',
        verifyAccessToken.verifyAccessTokenAdmin,
        hoiDongKHController.getDetailHDKH
    );
    // trang them moi hoi dong khoa hoc
    router.get(
        '/get-create-hdkh',
        verifyAccessToken.verifyAccessTokenAdmin,
        hoiDongKHController.getCreateHDKH
    );
    //trang quan ly hoi dong khoa hoc
    router.post(
        '/create-hdkh',
        verifyAccessToken.verifyAccessTokenAdmin,
        hoiDongKHController.createHDKH
    );
    router.get(
        '/get-hdkh',
        verifyAccessToken.verifyAccessTokenAdmin,
        hoiDongKHController.getAllHDKH
    );
    // tao tai khoan
    router.post(
        '/create-account',
        verifyAccessToken.verifyAccessTokenAdmin,
        manageAccountController.createAccount
    );
    //tim kiem tai khoan theo ten tai khoan
    router.post(
        '/get-account-byname',
        verifyAccessToken.verifyAccessTokenAdmin,

        manageAccountController.searchAccountByName
    );
    //mo trang tao tai khoan
    router.get(
        '/get-create-account',
        verifyAccessToken.verifyAccessTokenAdmin,

        manageAccountController.getCreateAccount
    );
    // trang sua quyen tai khoan
    router.get(
        '/get-edit-account',
        verifyAccessToken.verifyAccessTokenAdmin,
        manageAccountController.getEditAccount
    );
    // trang quan ly tai khoan
    router.get(
        '/manage-account',
        verifyAccessToken.verifyAccessTokenAdmin,
        manageAccountController.manageAccount
    );
    //dang xuat
    router.get('/logout', loginController.handleLogout);
    //xoa tai khoan
    router.post('/delete-taikhoan', manageAccountController.deleteAccount);
    //sua quyen cua tai khoan
    router.post(
        '/edit-role',
        verifyAccessToken.verifyAccessTokenAdmin,

        manageAccountController.editRole
    );
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
    router.get(
        '/reset-password',
        verifyAccessToken.verifyAccessTokenAdmin,

        manageAccountController.resetPassword
    );
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
    router.get(
        '/download/file/',
        verifyAccessToken.verifyAccessTokenGiamKhao,
        downloadAttachFileController.download
    );
    //hien thi trang diem trung binh sang kien + action xep loai + xem chi tiet diem sk
    router.get(
        '/danhgia-sangkien',
        verifyAccessToken.verifyAccessTokenAdmin,
        diemTrungBinhController.getDiemByMaSangKien
    );
    // create update xep loai sang kien
    router.post(
        '/xep-loai-sk',
        verifyAccessToken.verifyAccessTokenAdmin,
        danhGiaSangKienController.createUpdateDanhGiaSK
    );
    // chi tiet diem + xep loai sang kien + nhan xet
    router.get(
        '/chitietdiem-xeploai-nhanxet',
        verifyAccessToken.verifyAccessTokenAdmin,
        diemTrungBinhController.chiTietDiemDanhGiaXepLoaiNhanXet
    );
    //trang khen thuong nhuwng sang kien dang thuc hien (trong dot nay)
    router.get(
        '/get-khen-thuong',
        verifyAccessToken.verifyAccessTokenAdmin,
        khenThuongController.getKhenThuong
    );
    // tao khen thuong moi va cap nhat khen thuong
    router.post(
        '/khen-thuong',
        verifyAccessToken.verifyAccessTokenAdmin,
        khenThuongController.createUpdateKhenThuong
    );
    // hien thi tat ca khen thuong
    router.get(
        '/get-all-khenthuong',
        verifyAccessToken.verifyAccessTokenAdmin,
        khenThuongController.getAllKhenThuong
    );
    // tim kiem khen thuong theo dot
    router.post(
        '/search-khenthuong-dot',
        khenThuongController.getAllKhenThuong
    );
    // set trang thai hoan thanh sang kien co trang thai la dang thuc hien
    router.post(
        '/hoanthanh-tatca-sangkien',
        khenThuongController.setTrangThaiHoanThanhTatCaSK
    );
    return app.use('/', router);
};

export default initRouter;
