import danhGiaSK from '../services/danhGiaSKService';
import sangKienService from '../services/sangKienService';
import diemTrungBinhService from '../services/diemTrungBinhService';
import dotSangKienService from '../services/dotSangKienService';
import lichSuHanhDongService from '../services/lichSuHanhDongService';
import moment from 'moment';

// xep loai|| sua xep loai sang kien
let createUpdateDanhGiaSK = async (req, res) => {
    let { maSangKien, maXepLoaiMoi, maXepLoaiCu } = req.body;
    if (!maSangKien || !maXepLoaiMoi) {
        return res.redirect('/danhgia-sangkien');
    }

    let checkDanhGiaTonTai = await danhGiaSK.checkDanhGia(
        maSangKien,
        maXepLoaiCu
    );
    // console.log(checkDanhGiaTonTai);
    if (checkDanhGiaTonTai.length >= 1) {
        await danhGiaSK.editDanhGiaSangKien(
            maSangKien,
            maXepLoaiMoi,
            maXepLoaiCu
        );
        let nhanVienId = req.nhanVienId;
        let hanhDong = `Thay đổi xếp loại của sáng kiến ${maSangKien}`;
        let hientai = moment().utcOffset('+0700').format();
        await lichSuHanhDongService.themLichSu(nhanVienId, hanhDong, hientai);
        return res.redirect(
            '/danhgia-sangkien?alert=' + encodeURIComponent('2')
        );
    }
    await danhGiaSK.createDanhGiaSangKien(maSangKien, maXepLoaiMoi);
    let nhanVienId = req.nhanVienId;
    let hanhDong = `Thay đổi xếp loại của sáng kiến ${maSangKien}`;
    let hientai = moment().utcOffset('+0700').format();
    await lichSuHanhDongService.themLichSu(nhanVienId, hanhDong, hientai);
    return res.redirect('/danhgia-sangkien?alert=' + encodeURIComponent('2'));
};

// hien thi tat ca sang kien co xep loai + diem trung binh tong cac muc
let tatCaXepLoai = async (req, res) => {
    let { maDotTimKiem } = req.query;
    let allDot = await dotSangKienService.getAllDot();
    if (maDotTimKiem) {
        let sangKienCoXepLoai =
            await sangKienService.getSangKienCoXepLoaiTheoDot(maDotTimKiem);
        let tatCaThongTin = [];
        for (let i = 0; i < sangKienCoXepLoai.length; i++) {
            let diem = await diemTrungBinhService.getDiemByMaSangKien(
                sangKienCoXepLoai[i].masangkien
            );
            tatCaThongTin.push({
                sangKien: sangKienCoXepLoai[i],
                diem: diem[0],
            });
        }

        return res.render('tatCaXepLoai.ejs', { tatCaThongTin, allDot });
    }
    console.log(maDotTimKiem);
    // sai khong lam dc
    // let tatCaThongTin = await Promise.all(
    //     sangKienCoXepLoai.map(async (item) => {
    //         let diem = await diemTrungBinhService.getDiemByMaSangKien(
    //             item.masangkien
    //         );
    //         return { sangKien: item, diem };
    //     })
    // );
    let sangKienCoXepLoai = await sangKienService.getSangKienCoXepLoai();
    let tatCaThongTin = [];
    for (let i = 0; i < sangKienCoXepLoai.length; i++) {
        let diem = await diemTrungBinhService.getDiemByMaSangKien(
            sangKienCoXepLoai[i].masangkien
        );
        tatCaThongTin.push({ sangKien: sangKienCoXepLoai[i], diem: diem[0] });
    }
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>', tatCaThongTin[0].sangKien);

    return res.render('tatCaXepLoai.ejs', { tatCaThongTin, allDot });
};
module.exports = {
    createUpdateDanhGiaSK,
    tatCaXepLoai,
};
