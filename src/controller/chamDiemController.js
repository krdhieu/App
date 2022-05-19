import chamDiemService from '../services/chamDiemService';
import sangKienService from '../services/sangKienService';
import nguoiThamGiaService from '../services/nguoiThamGiaService';
import hoiDongKhoaHocService from '../services/hoiDongKhoaHocService';
//hien trhi trang cham diem
let getChamDiemPage = async (req, res) => {
    let sangKien = await sangKienService.getSangKienDaDuyet();

    return res.render('chamDiem.ejs', { sangKien });
};
// lay thong tin chi tiet sangkien can cham
let getDetailSangKien = async (req, res) => {
    let { id } = req.query;
    if (!id) {
        return res.send('Missing required parameter');
    }
    let detailSangKien = await sangKienService.getDetailSangKien(id);
    if (detailSangKien.length !== 1) {
        return res.send('khong ton tai sang kien nay');
    }
    let nguoiThamGia = await nguoiThamGiaService.getNguoiThamGia(id);
    let thanhVienHDDaDangNhap =
        await hoiDongKhoaHocService.getThanhVienHDDaDangNhap(req.nhanVienId);
    if (thanhVienHDDaDangNhap.length !== 1) {
        return res.send('Khong phai thanh vien hoi dong trong dot nay');
    }
    // console.log('>>detail', detailSangKien);
    // console.log('thanhvien da dang nhap', thanhVienHDDaDangNhap);
    // console.log('nguoitham gia', nguoiThamGia);
    return res.render('detailSangKienChamDiem.ejs', {
        detailSangKien: detailSangKien[0],
        thanhVienHDDaDangNhap: thanhVienHDDaDangNhap[0],
        nguoiThamGia,
    });
};
// cham diem
let createChiTietChamDiem = async (req, res) => {
    let {
        sangKienId,
        thanhVienHDId,
        diemMucDich,
        diemNoiDung,
        diemUngDung,
        diemTrinhBay,
    } = req.body;
    if (
        !sangKienId ||
        !thanhVienHDId ||
        !diemMucDich ||
        !diemNoiDung ||
        !diemUngDung ||
        !diemTrinhBay
    ) {
        return res.send('Missing required parameter');
    }
    let checkDaChamDiem = await chamDiemService.checkDaChamDiem(
        thanhVienHDId,
        sangKienId
    );
    if (checkDaChamDiem.length !== 0) {
        return res.send('ban da cham diem sang kien nay roi');
    }
    // console.log(
    //     'chi tiet cham diem',
    //     sangKienId,
    //     thanhVienHDId,
    //     diemMucDich,
    //     diemNoiDung,
    //     diemUngDung,
    //     diemTrinhBay
    // );

    let check = await chamDiemService.createChiTietChamDiem(
        thanhVienHDId,
        sangKienId,
        diemMucDich,
        diemNoiDung,
        diemUngDung,
        diemTrinhBay
    );
    return res.send(check);
};

module.exports = {
    getChamDiemPage: getChamDiemPage,
    getDetailSangKien: getDetailSangKien,
    createChiTietChamDiem: createChiTietChamDiem,
};
