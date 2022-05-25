import thanhVienHDKHService from '../services/thanhVienHDKHService';
import nhanVienService from '../services/nhanvienService';
import connectDB from '../configs/connectDB';

let createThanhVienHD = async (req, res) => {
    let { idNhanVien, idChucVu, idHDKH } = req.body;
    if (!idChucVu || !idNhanVien || !idHDKH) {
        return res.redirect(
            `/get-detail-hdkh?id=${idHDKH}&alert=${encodeURIComponent('1')}`
        );
    }

    let check = await nhanVienService.checkNhanVienTonTai(idNhanVien);
    if (check.length !== 1) {
        return res.redirect(
            `/get-detail-hdkh?id=${idHDKH}&alert=${encodeURIComponent('2')}`
        );
    }
    let checkThanhVienHD = await thanhVienHDKHService.checkThanhVienHD(
        idNhanVien,
        idHDKH
    );
    if (checkThanhVienHD.length !== 0) {
        return res.redirect(
            `/get-detail-hdkh?id=${idHDKH}&alert=${encodeURIComponent('3')}`
        );
    }
    await thanhVienHDKHService.createThanhVien(idHDKH, idNhanVien, idChucVu);
    return res.redirect(
        `/get-detail-hdkh?id=${idHDKH}&alert=${encodeURIComponent('0')}`
    );
};

let editThanhVienHD = async (req, res) => {
    let { idHDKH, idNhanVien, idChucVu } = req.body;
    if (!idChucVu || !idHDKH || !idNhanVien) {
        return res.send('missing required parameter');
    }
    let check = await nhanVienService.checkNhanVienTonTai(idNhanVien);
    if (check.length !== 1) {
        return res.send('id nhan vien khong ton tai');
    }
    // s
    let isSuccess = await thanhVienHDKHService.editThanhVienHD(
        idNhanVien,
        idChucVu,
        idHDKH
    );
    return res.send(isSuccess);
};

module.exports = {
    createThanhVienHD: createThanhVienHD,
    editThanhVienHD: editThanhVienHD,
};
