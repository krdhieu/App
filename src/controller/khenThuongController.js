import sangKienService from '../services/sangKienService';
import khenThuongService from '../services/khenThuongService';
import dotSangKienService from '../services/dotSangKienService';
let getKhenThuong = async (req, res) => {
    let { alert } = req.query;
    let sangKien =
        await sangKienService.getSangKienDangThucHienLeftJoinDanhGiaAndMucThuongByMaSangKien();
    if (sangKien.length === 0) {
        return res.render('khenThuong.ejs', { sangKien, alert: 0 });
    }
    return res.render('khenThuong.ejs', { sangKien, alert });
};

let createUpdateKhenThuong = async (req, res) => {
    let { maSangKien, maMucThuongHienTai, mucThuongMoi } = req.body;
    if (!maSangKien) {
        return res.redirect('/get-khen-thuong');
    }
    console.log(maSangKien, maMucThuongHienTai, mucThuongMoi);
    // kiem tra xem da khen thuong hay chua neu khen thuong roi thi doi muc thuong
    let checkKhenThuong = await khenThuongService.checkKhenThuong(maSangKien);
    if (checkKhenThuong.length === 0) {
        await khenThuongService.createKhenThuong(maSangKien, mucThuongMoi);
        return res.redirect(
            '/get-khen-thuong?alert=' + encodeURIComponent('1')
        );
    }
    await khenThuongService.updateKhenThuong(maMucThuongHienTai, mucThuongMoi);

    return res.redirect('/get-khen-thuong?alert=' + encodeURIComponent('1'));
};

// trang tat ca khen thuong

let getAllKhenThuong = async (req, res) => {
    let { maDotTimKiem } = req.body;
    if (!maDotTimKiem) {
        let allKhenThuong = await khenThuongService.getAllKhenThuong();
        let allDot = await dotSangKienService.getAllDot();
        console.log(allDot);
        return res.render('tatCaKhenThuong.ejs', {
            allKhenThuong,
            allDot,
        });
    }
    let allKhenThuong = await khenThuongService.getAllKhenThuongTheoDot(
        maDotTimKiem
    );
    let allDot = await dotSangKienService.getAllDot();
    console.log(allDot);
    return res.render('tatCaKhenThuong.ejs', {
        allKhenThuong,
        allDot,
    });
};
// sau khi khen thuong tat ca sang kien set trang thai hoan thanh tat ca sang kien co ma trang thai la 2(dang thuc hien)
let setTrangThaiHoanThanhTatCaSK = async (req, res) => {
    let { hoanThanh } = req.body;
    console.log(hoanThanh);
    if (hoanThanh === '1') {
        await khenThuongService.setTrangThaiHoanThanhTatCaSK();
        return res.redirect('/get-khen-thuong');
    }
    return res.redirect('/get-khen-thuong');
};

module.exports = {
    getKhenThuong,
    createUpdateKhenThuong,
    getAllKhenThuong,
    setTrangThaiHoanThanhTatCaSK,
};
