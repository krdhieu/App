import sangKienService from '../services/sangKienService';
import diemTrungBinhService from '../services/diemTrungBinhService';
import xepLoaiService from '../services/xepLoaiService';
import chamDiemService from '../services/chamDiemService';
/// hien thi diem cua nhung sang kien co trang thai dang thuc hien - trang xep loai sang kien
let getDiemByMaSangKien = async (req, res) => {
    let sangKienDangThucHien =
        await sangKienService.getSangKienDangThucHienLeftJoinDanhGia();
    let { alert } = req.query;
    if (sangKienDangThucHien.length === 0) {
        return res.render('danhGiaSangKien.ejs', {
            alert: 1,
        });
    }
    // console.log(sangKienDangThucHien);
    let diemSangKien = [];
    for (let i = 0; i < sangKienDangThucHien.length; i++) {
        let diem = await diemTrungBinhService.getDiemByMaSangKien(
            sangKienDangThucHien[i].masangkien
        );
        diemSangKien.push({
            masangkien: sangKienDangThucHien[i].masangkien,
            tensangkien: sangKienDangThucHien[i].tensangkien,
            maxeploai: sangKienDangThucHien[i].maxeploai,
            tenxeploai: sangKienDangThucHien[i].tenxeploai,
            diem: diem[0],
        });
    }
    let loaiXepLoai = await xepLoaiService.getAllLoaiXepLoai();

    return res.render('diemTrungBinh.ejs', {
        diemSangKien: diemSangKien,
        loaiXepLoai: loaiXepLoai,
        alert,
    });
};

// chi tiet diem + xep loai + nhan xet sang kien (sang kien dang thuc hien + sang kien da hoan thanh)

let chiTietDiemDanhGiaXepLoaiNhanXet = async (req, res) => {
    let { masangkien } = req.query;
    console.log(req.query);
    if (!masangkien) {
        return res.send('Wrong!');
    }
    let thongTinSangKien = [];
    let sangKien =
        await sangKienService.getSangKienDangThucHienLeftJoinDanhGiaByMaSangKien(
            masangkien
        );

    let diem = await diemTrungBinhService.getDiemByMaSangKien(masangkien);
    thongTinSangKien.push({
        sangKien: sangKien[0],
        diem: diem[0],
    });

    let allChiTietDiem = await chamDiemService.getAllChiTietDiemOfSangKien(
        masangkien
    );
    return res.render('chiTietXepLoai.ejs', {
        thongTinSangKien: thongTinSangKien[0],
        allChiTietDiem,
    });
};

module.exports = {
    getDiemByMaSangKien: getDiemByMaSangKien,
    chiTietDiemDanhGiaXepLoaiNhanXet,
};
