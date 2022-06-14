import chamDiemService from '../services/chamDiemService';
import sangKienService from '../services/sangKienService';
import nguoiThamGiaService from '../services/nguoiThamGiaService';
import hoiDongKhoaHocService from '../services/hoiDongKhoaHocService';
import nhanXetService from '../services/nhanXetService';
import danhGiaSKService from '../services/danhGiaSKService';
import diemTrungBinhService from '../services/diemTrungBinhService';
import khenThuongService from '../services/khenThuongService';
import xepLoaiService from '../services/xepLoaiService';

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
    if (check === 'ok') {
        let dtb = await diemTrungBinhService.getDiemByMaSangKien(sangKienId);
        let { tbmucdich, tbnoidung, tbungdung, tbtrinhbay } = dtb[0];
        let tbt = (tbmucdich + tbnoidung + tbungdung + tbtrinhbay) / 4;
        console.log(tbt);
        let maXL;
        if (9 < tbt && tbt <= 10) {
            maXL = 1;
        }
        if (8 < tbt && tbt <= 9) {
            maXL = 2;
        }
        if (6 < tbt && tbt <= 8) {
            maXL = 3;
        }
        if (5 <= tbt && tbt <= 6) {
            maXL = 4;
        }
        if (tbt < 5) {
            maXL = 5;
        }

        // kiem tra xem sang kien co danh gia chua
        let checkDanhGiaByMaSangKien =
            await danhGiaSKService.checkDanhGiaByMaSK(sangKienId);
        let checkKhenThuong = await khenThuongService.checkKhenThuong(
            sangKienId
        );
        // sang kien chua co danh gia thi them danh gia xep loai
        if (checkDanhGiaByMaSangKien.length === 0) {
            await danhGiaSKService.createDanhGiaSangKien(sangKienId, maXL);
            // kiem tra xem co khen thuong chua neu chua co thi them khen thuong

            let xepLoai = await xepLoaiService.getAllLoaiXepLoai();
            let mucThuong;
            if (maXL === 1) {
                mucThuong = xepLoai[0].mucthuong;
            }
            if (maXL === 2) {
                mucThuong = xepLoai[1].mucthuong;
            }
            if (maXL === 3) {
                mucThuong = xepLoai[2].mucthuong;
            }
            if (maXL === 4) {
                mucThuong = xepLoai[3].mucthuong;
            }
            if (maXL === 5) {
                mucThuong = xepLoai[4].mucthuong;
            }
            console.log('mucthuong', mucThuong);
            if (checkKhenThuong.length === 0) {
                await khenThuongService.createKhenThuong(sangKienId, mucThuong);
            } else {
                await khenThuongService.updateKhenThuongByMaSK(
                    sangKienId,
                    mucThuong
                );
            }
        } else {
            // co danh gia roi thi sua danh gia xep loai theo trung binh tong diem
            let maxeploaicu = checkDanhGiaByMaSangKien[0].maxeploai;
            await danhGiaSKService.editDanhGiaSangKien(
                sangKienId,
                maXL,
                maxeploaicu
            );
            let xepLoai = await xepLoaiService.getAllLoaiXepLoai();
            let mucThuong;

            if (maXL === 1) {
                mucThuong = xepLoai[0].mucthuong;
            }
            if (maXL === 2) {
                mucThuong = xepLoai[1].mucthuong;
            }
            if (maXL === 3) {
                mucThuong = xepLoai[2].mucthuong;
            }
            if (maXL === 4) {
                mucThuong = xepLoai[3].mucthuong;
            }
            if (maXL === 5) {
                mucThuong = xepLoai[4].mucthuong;
            }
            console.log('mucthuong', mucThuong);

            if (checkKhenThuong.length === 0) {
                await khenThuongService.createKhenThuong(sangKienId, mucThuong);
            } else {
                await khenThuongService.updateKhenThuongByMaSK(
                    sangKienId,
                    mucThuong
                );
            }
        }
    }
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

    if (check === 'ok') {
        let dtb = await diemTrungBinhService.getDiemByMaSangKien(sangKienId);
        let { tbmucdich, tbnoidung, tbungdung, tbtrinhbay } = dtb[0];
        let tbt = (tbmucdich + tbnoidung + tbungdung + tbtrinhbay) / 4;
        console.log(tbt);
        let maXL;
        if (9 < tbt && tbt <= 10) {
            maXL = 1;
        }
        if (8 < tbt && tbt <= 9) {
            maXL = 2;
        }
        if (6 < tbt && tbt <= 8) {
            maXL = 3;
        }
        if (5 <= tbt && tbt <= 6) {
            maXL = 4;
        }
        if (tbt < 5) {
            maXL = 5;
        }
        let checkDanhGiaByMaSangKien =
            await danhGiaSKService.checkDanhGiaByMaSK(sangKienId);
        let checkKhenThuong = await khenThuongService.checkKhenThuong(
            sangKienId
        );
        if (checkDanhGiaByMaSangKien.length === 0) {
            await danhGiaSKService.createDanhGiaSangKien(sangKienId, maXL);

            let xepLoai = await xepLoaiService.getAllLoaiXepLoai();
            let mucThuong;
            console.log(xepLoai);
            if (maXL === 1) {
                mucThuong = xepLoai[0].mucthuong;
            }
            if (maXL === 2) {
                mucThuong = xepLoai[1].mucthuong;
            }
            if (maXL === 3) {
                mucThuong = xepLoai[2].mucthuong;
            }
            if (maXL === 4) {
                mucThuong = xepLoai[3].mucthuong;
            }
            if (maXL === 5) {
                mucThuong = xepLoai[4].mucthuong;
            }
            if (checkKhenThuong.length === 0) {
                await khenThuongService.createKhenThuong(sangKienId, mucThuong);
            } else {
                await khenThuongService.updateKhenThuongByMaSK(
                    sangKienId,
                    mucThuong
                );
            }
        } else {
            let maxeploaicu = checkDanhGiaByMaSangKien[0].maxeploai;
            await danhGiaSKService.editDanhGiaSangKien(
                sangKienId,
                maXL,
                maxeploaicu
            );
            let checkKhenThuong = await khenThuongService.checkKhenThuong(
                sangKienId
            );
            console.log('checkKhenthuong', checkKhenThuong);
            let xepLoai = await xepLoaiService.getAllLoaiXepLoai();
            let mucThuong;
            console.log(xepLoai);
            if (maXL === 1) {
                mucThuong = xepLoai[0].mucthuong;
            }
            if (maXL === 2) {
                mucThuong = xepLoai[1].mucthuong;
            }
            if (maXL === 3) {
                mucThuong = xepLoai[2].mucthuong;
            }
            if (maXL === 4) {
                mucThuong = xepLoai[3].mucthuong;
            }
            if (maXL === 5) {
                mucThuong = xepLoai[4].mucthuong;
            }
            console.log('mucthuong', mucThuong);

            if (checkKhenThuong.length === 0) {
                await khenThuongService.createKhenThuong(sangKienId, mucThuong);
            } else {
                await khenThuongService.updateKhenThuongByMaSK(
                    sangKienId,
                    mucThuong
                );
            }
        }
    }
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
