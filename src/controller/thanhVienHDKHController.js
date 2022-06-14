import thanhVienHDKHService from '../services/thanhVienHDKHService';
import nhanVienService from '../services/nhanvienService';
import chamDiemService from '../services/chamDiemService';
import nhanXetService from '../services/nhanXetService';
import lichSuHanhDongService from '../services/lichSuHanhDongService';
import moment from 'moment';

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
    let nhanVienId = req.nhanVienId;
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
    if (isSuccess === 'ok') {
        let hanhDong = 'Sửa thành viên hội đồng';
        let hientai = moment().utcOffset('+0700').format();
        await lichSuHanhDongService.themLichSu(nhanVienId, hanhDong, hientai);
    }

    return res.redirect(
        `/get-detail-hdkh?id=${idHDKH}&alert=${encodeURIComponent(
            'suathanhcong'
        )}`
    );
};

let deleteThanhVienKhongCoRangBuoc = async (req, res) => {
    let { idThanhVienHD, idHDKH } = req.body;
    let nhanVienId = req.nhanVienId;
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

        let hanhDong = 'Xóa thành viên hội đồng';
        let hientai = moment().utcOffset('+0700').format();
        await lichSuHanhDongService.themLichSu(nhanVienId, hanhDong, hientai);

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
