import hoiDongKhoaHocService from '../services/hoiDongKhoaHocService';
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
    console.log(allHDKH);
    return res.render('manageHoiDongKH.ejs', { allHDKH });
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

    return res.render('detailHDKH.ejs', { detail: detail[0] });
};
module.exports = {
    getCreateHDKH: getCreateHDKH,
    getAllHDKH: getAllHDKH,
    createHDKH: createHDKH,
    getDetailHDKH: getDetailHDKH,
};
