import thanhVienHDKHService from '../services/thanhVienHDKHService';
import nhanVienService from '../services/nhanvienService';
import chamDiemService from '../services/chamDiemService';
import nhanXetService from '../services/nhanXetService';

let createThanhVienHD = async (req, res) => {
    let { idNhanVien, idChucVu, idHDKH } = req.body;
    if (!idChucVu || !idNhanVien || !idHDKH) {
        return res.redirect(
            `/get-detail-hdkh?id=${idHDKH}&alert=${encodeURIComponent('1')}`
        );
    }

    let check = await nhanVienService.checkNhanVienTonTai(idNhanVien);
    // nhan vien k ton tai
    if (check.length !== 1) {
        return res.redirect(
            `/get-detail-hdkh?id=${idHDKH}&alert=${encodeURIComponent('2')}`
        );
    }
    let checkThanhVienHD = await thanhVienHDKHService.checkThanhVienHD(
        idNhanVien,
        idHDKH
    );
    // kiem tra xem trong hoi dong chua
    if (checkThanhVienHD.length !== 0) {
        return res.redirect(
            `/get-detail-hdkh?id=${idHDKH}&alert=${encodeURIComponent('3')}`
        );
    }
    await thanhVienHDKHService.createThanhVien(idHDKH, idNhanVien, idChucVu);
    // them thanh cong
    return res.redirect(
        `/get-detail-hdkh?id=${idHDKH}&alert=${encodeURIComponent('0')}`
    );
};

let editThanhVienHD = async (req, res) => {
    let { idThanhVienHD, idNhanVien, idChucVu, idHDKH } = req.body;
    if (!idChucVu || !idThanhVienHD || !idNhanVien || !idHDKH) {
        return res.send('missing required parameter');
    }

    //idHDKH la ma thanh vien
    let check = await nhanVienService.checkNhanVienTonTai(idNhanVien);
    if (check.length !== 1) {
        return res.redirect(
            `/get-detail-hdkh?id=${idHDKH}&alert=${encodeURIComponent('2')}`
        );
    }

    let isSuccess = await thanhVienHDKHService.editThanhVienHD(
        idNhanVien,
        idChucVu,
        idThanhVienHD
    );
    return res.redirect(
        `/get-detail-hdkh?id=${idHDKH}&alert=${encodeURIComponent(
            'suathanhcong'
        )}`
    );
};

let deleteThanhVienKhongCoRangBuoc = async (req, res) => {
    let { idThanhVienHD, idHDKH } = req.body;
    console.log(idThanhVienHD);
    let checkChiTietChamDiem = await chamDiemService.checkChamDiemDelThanhVien(
        idThanhVienHD
    );
    let checkNhanXet = await nhanXetService.checkNhanXetDelThanhVien(
        idThanhVienHD
    );
    if (checkNhanXet.length === 0 && checkChiTietChamDiem.length === 0) {
        await thanhVienHDKHService.deleteThanhVienKhongCoRangBuoc(
            idThanhVienHD
        );
        return res.redirect(
            '/get-detail-hdkh?id=' +
                encodeURIComponent(idHDKH) +
                '&alert=' +
                encodeURIComponent('xoathanhvienthanhcong')
        );
    } else {
        return res.redirect(
            '/get-detail-hdkh?id=' +
                encodeURIComponent(idHDKH) +
                '&alert=' +
                encodeURIComponent('xoathanhvienkhongthanhcong')
        );
    }
};

module.exports = {
    createThanhVienHD: createThanhVienHD,
    editThanhVienHD: editThanhVienHD,
    deleteThanhVienKhongCoRangBuoc,
};
