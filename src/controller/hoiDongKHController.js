import moment from 'moment';
import hoiDongKhoaHocService from '../services/hoiDongKhoaHocService';
import thanhVienHDKHService from '../services/thanhVienHDKHService';
import chuVuHDKH from '../services/chucVuHDKHService';
// trang tao moi hdkh
const getCreateHDKH = (req, res) => {
    return res.render('createHDKH.ejs');
};

// thuc hien tao moi hdkh
const createHDKH = async (req, res) => {
    let { nhiemVu, ngayThanhLap } = req.body;
    if (!nhiemVu || !ngayThanhLap) {
        return res.send('Missing require parameter');
    }
    let HDKH = await hoiDongKhoaHocService.checkStateHDKH();
    if (HDKH.length >= 1) {
        return res.send(
            'Khong the them hoi dong moi khi co hoi dong chua ket thuc nhiem ky'
        );
    }
    await hoiDongKhoaHocService.createHDKH(ngayThanhLap, nhiemVu.trim());
    return res.send('done');
};

//trang quan ly hdkh
const getAllHDKH = async (req, res) => {
    let allHDKH = await hoiDongKhoaHocService.getAllHDKH();
    return res.render('manageHoiDongKH.ejs', { allHDKH: allHDKH });
};

//trang thong tin chi tiet cua 1 hdkh
const getDetailHDKH = async (req, res) => {
    let { id } = req.query;
    if (!id) {
        return res.send('Missing required parameter');
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
    // console.log('all thanh vien', allThanhVien);
    // console.log('detail', detail);
    // console.log('all chuc vu', allChucVu);
    return res.render('detailHDKH.ejs', {
        detail: detail[0],
        allChucVu,
        allThanhVien,
    });
};

//trang sua hoi dong khoa hoc
let getEditHDKH = async (req, res) => {
    let { id } = req.query;
    if (!id) {
        return res.send('Missing required parameter');
    }
    let hDKH = await hoiDongKhoaHocService.getDetailHDKH(id);
    if (hDKH.length === 0) {
        return res.send('HDKH does not exist');
    }
    return res.render('editHDKH.ejs', { hDKH: hDKH[0] });
};

//sua thong tin hoi dong khoa hoc
let editHDKH = async (req, res) => {
    let { id, ngayThanhLap, nhiemVu } = req.body;
    if (!id || !ngayThanhLap) {
        return res.send('missing required parameter');
    }
    await hoiDongKhoaHocService.editHDKH(id, nhiemVu, ngayThanhLap);

    return res.redirect('/get-hdkh');
};

// ket thuc nhhiem ky hdkh
let changeStateHDKH = async (req, res) => {
    let { id } = req.query;
    if (!id) {
        return res.send('missing id');
    }

    let currentDate = moment().utcOffset('+0700').format('YYYY-MM-DD');

    await hoiDongKhoaHocService.changeStateHDKH(currentDate, id);
    return res.send('done');
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