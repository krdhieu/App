import chamDiemService from '../services/chamDiemService';
import sangKienService from '../services/sangKienService';
import nguoiThamGiaService from '../services/nguoiThamGiaService';
import hoiDongKhoaHocService from '../services/hoiDongKhoaHocService';
import nhanXetService from '../services/nhanXetService';
//hien trhi trang cham diem
let getChamDiemPage = async (req, res) => {
    let { alert } = req.query;

    if (!alert) {
        let sangKien = await sangKienService.getSangKienDaDuyet();
        return res.render('chamDiem.ejs', { sangKien });
    }

    let sangKien = await sangKienService.getSangKienDaDuyet();

    return res.render('chamDiem.ejs', { sangKien, alert });
};
// lay thong tin chi tiet sangkien can cham
let getDetailSangKien = async (req, res) => {
    //id sang kien
    let { id } = req.query;
    if (!id) {
        return res.send('Missing required parameter');
    }
    let detailSangKien = await sangKienService.getDetailSangKien(id);
    if (detailSangKien.length !== 1) {
        return res.send('khong ton tai sang kien nay');
    }

    if (detailSangKien[0].trangthaidotsangkien !== 1) {
        return res.send('Sáng kiến này trong đợt đã kết thúc');
    }
    let nguoiThamGia = await nguoiThamGiaService.getNguoiThamGia(id);
    let thanhVienHDDaDangNhap =
        await hoiDongKhoaHocService.getThanhVienHDDaDangNhap(req.nhanVienId);
    if (thanhVienHDDaDangNhap.length !== 1) {
        return res.redirect(
            '/get-cham-diem?alert=' +
                encodeURIComponent('khonglathanhvienhoidong')
        );
    }
    let diemDaCham = await chamDiemService.getChiTietDiemOfThanhVien(
        detailSangKien[0].masangkien,
        thanhVienHDDaDangNhap[0].mathanhvien
    );

    let showDiemDaCham;
    if (diemDaCham.length === 1) {
        showDiemDaCham = [...diemDaCham];
    }
    let { alert } = req.query;
    let nhanXet;
    nhanXet = await nhanXetService.getNhanXet(
        thanhVienHDDaDangNhap[0].mathanhvien,
        id
    );
    return res.render('detailSangKienChamDiem.ejs', {
        detailSangKien: detailSangKien[0],
        thanhVienHDDaDangNhap: thanhVienHDDaDangNhap[0],
        nguoiThamGia,
        showDiemDaCham: showDiemDaCham,
        alert,
        nhanXet,
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
    // khong can thiet nhung co cung dc
    if (checkDaChamDiem.length !== 0) {
        return res.send('ban da cham diem sang kien nay roi');
    }

    let check = await chamDiemService.createChiTietChamDiem(
        thanhVienHDId,
        sangKienId,
        diemMucDich,
        diemNoiDung,
        diemUngDung,
        diemTrinhBay
    );
    return res.redirect(
        `/detail-sangkien?id=${sangKienId}&&alert=` +
            encodeURIComponent('suadiemthanhcong')
    );
};
// sua chi tiet diem
let editChiTietChamDiem = async (req, res) => {
    let {
        thanhVienHDId,
        sangKienId,
        diemMucDich,
        diemNoiDung,
        diemUngDung,
        diemTrinhBay,
    } = req.body;
    if (
        !thanhVienHDId ||
        !sangKienId ||
        !diemMucDich ||
        !diemNoiDung ||
        !diemUngDung ||
        !diemTrinhBay
    ) {
        return res.send('sua diem khong thanh cong');
    }

    let check = await chamDiemService.editChiTietDiem(
        thanhVienHDId,
        sangKienId,
        diemMucDich,
        diemNoiDung,
        diemUngDung,
        diemTrinhBay
    );

    return res.redirect(
        `/detail-sangkien?id=${sangKienId}&&alert=` +
            encodeURIComponent('suadiemthanhcong')
    );
};

module.exports = {
    getChamDiemPage: getChamDiemPage,
    getDetailSangKien: getDetailSangKien,
    createChiTietChamDiem: createChiTietChamDiem,
    editChiTietChamDiem: editChiTietChamDiem,
};
