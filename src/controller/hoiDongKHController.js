import moment from 'moment';
import hoiDongKhoaHocService from '../services/hoiDongKhoaHocService';
import thanhVienHDKHService from '../services/thanhVienHDKHService';
import chuVuHDKH from '../services/chucVuHDKHService';
import lichSuHanhDongService from '../services/lichSuHanhDongService';
// trang tao moi hdkh
const getCreateHDKH = (req, res) => {
    let { alert } = req.query;
    return res.render('createHDKH.ejs', { alert });
};

// thuc hien tao moi hdkh
const createHDKH = async (req, res) => {
    let { nhiemVu, ngayThanhLap } = req.body;
    if (!nhiemVu || !ngayThanhLap) {
        return res.send('Missing require parameter');
    }
    let HDKH = await hoiDongKhoaHocService.checkStateHDKH();
    if (HDKH.length >= 1) {
        return res.redirect(
            '/get-create-hdkh?alert=' + encodeURIComponent('1')
        );
    }
    await hoiDongKhoaHocService.createHDKH(ngayThanhLap, nhiemVu.trim());
    return res.redirect('/get-create-hdkh?alert=' + encodeURIComponent('0'));
};

//trang quan ly hdkh
const getAllHDKH = async (req, res) => {
    let allHDKH = await hoiDongKhoaHocService.getAllHDKH();
    return res.render('manageHoiDongKH.ejs', { allHDKH: allHDKH });
};

//trang thong tin chi tiet cua 1 hdkh
const getDetailHDKH = async (req, res) => {
    let { id, alert } = req.query;

    if (!id) {
        return res.send('Khong tim thay ma hoi dong');
    }

    let detail = await hoiDongKhoaHocService.getDetailHDKH(id);
    if (detail.length === 0) {
        return res.send('HDKH does not exist');
    }
    let allChucVu = await chuVuHDKH.getAllChucVuHDKH();
    let allThanhVien =
        await thanhVienHDKHService.getAllThanhVienHDKHJoinNhanVienJoinChucVu(
            id
        );

    return res.render('detailHDKH.ejs', {
        detail: detail[0],
        allChucVu,
        allThanhVien,
        alert,
    });
};

//trang sua hoi dong khoa hoc
let getEditHDKH = async (req, res) => {
    let { id, alert } = req.query;
    if (!id) {
        return res.send('Missing required parameter');
    }
    let hDKH = await hoiDongKhoaHocService.getDetailHDKH(id);
    if (hDKH.length === 0) {
        return res.send('HDKH does not exist');
    }
    return res.render('editHDKH.ejs', { hDKH: hDKH[0], alert: alert });
};

//sua thong tin hoi dong khoa hoc
let editHDKH = async (req, res) => {
    let { id, ngayThanhLap, nhiemVu } = req.body;
    if (!id || !ngayThanhLap) {
        return res.send('missing required parameter');
    }
    await hoiDongKhoaHocService.editHDKH(id, nhiemVu, ngayThanhLap);
    let nhanVienId = req.nhanVienId;
    let hanhDong = `Sửa thông tin Hội đồng có mã: ${id}`;
    let hientai = moment().utcOffset('+0700').format();
    await lichSuHanhDongService.themLichSu(nhanVienId, hanhDong, hientai);
    return res.redirect(
        `/get-edit-hdkh?id=${id}&alert=` + encodeURIComponent('1')
    );
};

// ket thuc nhhiem ky hdkh
let changeStateHDKH = async (req, res) => {
    let { id } = req.query;
    if (!id) {
        return res.send('missing id');
    }
    let currentDate = moment().utcOffset('+0700').format('YYYY-MM-DD');
    await hoiDongKhoaHocService.changeStateHDKH(currentDate, id);
    let nhanVienId = req.nhanVienId;
    let hanhDong = `Kết thúc nhiệm kỳ hội đồng có mã: ${id}`;
    let hientai = moment().utcOffset('+0700').format();
    await lichSuHanhDongService.themLichSu(nhanVienId, hanhDong, hientai);
    return res.redirect('/get-hdkh');
};

module.exports = {
    getCreateHDKH: getCreateHDKH,
    getAllHDKH: getAllHDKH,
    createHDKH: createHDKH,
    getDetailHDKH: getDetailHDKH,
    getEditHDKH: getEditHDKH,
    editHDKH: editHDKH,
    changeStateHDKH: changeStateHDKH,
};
