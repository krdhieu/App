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
import lichSuHanhDongController from '../controller/lichSuHanhDongController';
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
const storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + '/src/addnhanvien');
    },

    filename: async function (req, file, cb) {
        cb(
            null,
            'nhanvien' +
            path.extname(file.originalname)
        );
    },
});
// check duoi file
const Filter = function (req, file, cb) {
    //Accept file only
    if (!file.originalname.match(/\.(PDF|pdf)$/)) {
        req.fileValidationError = 'Only PDF files are allowed!';
        return cb(new Error('Only PDF files are allowed!'), false);
    }
    cb(null, true);
};
const Filter2 = function (req, file, cb) {
    //Accept file only
    if (!file.originalname.match(/\.(xlsx)$/)) {
        req.fileValidationError = 'Only xlsx files are allowed!';
        return cb(new Error('Only PDF files are allowed!'), false);
    }
    cb(null, true);
};
let upload = multer({ storage: storage, fileFilter: Filter });
let upload2 = multer({ storage: storage2, fileFilter: Filter2 });
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
    // ch????c vu?? h????i ??????ng
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
    // th??m ch????c vu?? h????i ??????ng csdl
    router.post(
        '/addchucvuhd',
        verifyAccessToken.verifyAccessTokenAdmin,
        chucvuhdController.addChucvuhd
    );
    // x????p loa??i
    router.get(
        '/quanlyxeploai',
        verifyAccessToken.verifyAccessTokenAdmin,
        xeploaiController.viewXeploai
    ); //chinh
    /// ba??ng s????a x????p loa??i
    router.get(
        '/quanlyxeploai/sua/:maxeploai',
        verifyAccessToken.verifyAccessTokenAdmin,
        xeploaiController.editXeploai
    );
    // s????a x????p loa??i csdl
    router.post(
        '/uploadxeploai',
        verifyAccessToken.verifyAccessTokenAdmin,
        xeploaiController.uploadXeploai
    );
    //router.post('/addxeploai', xeploaiController.addXeploai);
    // tra??ng tha??i sa??ng ki????n

    router.get(
        '/quanlytrangthaisangkien',
        verifyAccessToken.verifyAccessTokenAdmin,
        trangthaisangkienController.viewTrangthaisangkien
    ); //chinh
    // ba??ng s????a tra??ng tha??i sa??ng ki????n
    router.get(
        '/quanlytrangthaisangkien/sua/:matrangthai',
        verifyAccessToken.verifyAccessTokenAdmin,
        trangthaisangkienController.editTrangthaisangkien
    );
    // s????a tra??ng tha??i sa??ng kien csdl
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

    // t???o nh??n vi??n
    router.get(
        '/quanlynhanvien',
        verifyAccessToken.verifyAccessTokenAdmin,
        nhanvienController.viewNhanvien
    ); //chinh
    // s????a th??ng tin nh??n vi??n admin
    router.get(
        '/quanlynhanvien/sua/:manhanvien',
        verifyAccessToken.verifyAccessTokenAdmin,
        nhanvienController.editNhanvien
    );
    // s????a th??ng tin nh??n vi??n admin csdl
    router.post(
        '/uploadnhanvien',
        verifyAccessToken.verifyAccessTokenAdmin,
        nhanvienController.uploadNhanvien
    );
    // th??m nh??n vi??n csdl
    router.post(
        '/addnhanvien',
        verifyAccessToken.verifyAccessTokenAdmin,
        nhanvienController.addNhanvien
    );
    // theem nhieeuf nhan vien
    router.post(
        '/addnhieunhanvien',
        verifyAccessToken.verifyAccessTokenAdmin,
        upload2.single('profile_file'),
        nhanvienController.addMultiNhanvien
    );
    // router.get(
    //     '/quanlynhanvien',
    //     verifyAccessToken.verifyAccessTokenAdmin,
    //     nhanvienController.viewNhanvien
    // );
    // chuy????n tra??ng tha??i nh??n vi??n sang nghi?? vi????c
    router.get(
        '/setnghiviec',
        verifyAccessToken.verifyAccessTokenAdmin,
        nhanvienController.nghiviecNhanvien
    );
    // hi????n th??ng tin nh??n vi????t m????c ca?? nh??n
    router.get(
        '/thongtincanhan',
        verifyAccessToken.verifyAccessTokenMiddleware,
        nhanvienController.thongtinNhanvien
    );
    // s????a th??ng tin nh??n vi??n
    router.post(
        '/suanhanvien-user',
        verifyAccessToken.verifyAccessTokenMiddleware,
        nhanvienController.suaNhanvienuser
    );
    // s????a th??ng tin nh??n vi??n m????c nh??n vi??n
    router.post(
        '/uploadnhanvien-user',
        verifyAccessToken.verifyAccessTokenMiddleware,
        nhanvienController.uploadNhanvienuser
    );

    // t???o sang kien

    router.get(
        '/quanlysangkien',
        verifyAccessToken.verifyAccessTokenAdmin,
        sangkienController.viewSangkien
    );
    // duy????t sa??ng ki??n
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
    // th??m ty?? l???? vai tro?? va??o sa??ng ki????n
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

    // t???o ??????t sa??ng ki????n
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
    // x??a ?????t s??ng ki???n
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
    router.post(
        '/delete-taikhoan',
        verifyAccessToken.verifyAccessTokenAdmin,
        manageAccountController.deleteAccount
    );
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
    // khong dung nua comment lai
    // router.post(
    //     '/search-khenthuong-dot',
    //     verifyAccessToken.verifyAccessTokenAdmin,

    //     khenThuongController.getAllKhenThuong
    // );
    // set trang thai hoan thanh sang kien co trang thai la dang thuc hien
    router.post(
        '/hoanthanh-tatca-sangkien',
        verifyAccessToken.verifyAccessTokenAdmin,
        khenThuongController.setTrangThaiHoanThanhTatCaSK
    );
    //tat ca sang kien
    router.get(
        '/tatcaxeploai',
        verifyAccessToken.verifyAccessTokenAdmin,
        danhGiaSangKienController.tatCaXepLoai
    );
    router.get(
        '/lichsuhanhdong',
        verifyAccessToken.verifyAccessTokenAdmin,
        lichSuHanhDongController.hienThiToanBoLichSu
    );
    router.post(
        '/getActionFromTo',
        verifyAccessToken.verifyAccessTokenAdmin,
        lichSuHanhDongController.timKiemHanhDongTuNgayDenNgay
    );

    return app.use('/', router);
};

export default initRouter;
