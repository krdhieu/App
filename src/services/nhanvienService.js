import connectDB from '../configs/connectDB';

// lấy thông tin tất cả nhân viên
let getAllNhanVien = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let [allNhanVien] = await connectDB.execute(
                'SELECT * FROM nhanvien'
            );
            resolve(allNhanVien);
        } catch (e) {
            reject(e);
        }
    });
};
//kiem tra nhan vien co ton tai khong
let checkNhanVienTonTai = (idNhanVien) => {
    return new Promise(async (resolve, reject) => {
        try {
            let [check] = await connectDB.execute(
                'SELECT * FROM nhanvien WHERE manhanvien=?',
                [idNhanVien]
            );
            resolve(check);
        } catch (error) {
            reject(error);
        }
    });
};

// thong tin nhan vien dang nhap
let thongTinNhanVienDangNhap = (maNhanVienDangNhap) => {
    return new Promise(async (resolve, reject) => {
        try {
            let [thongtin] = await connectDB.execute(
                `SELECT * FROM nhanvien 
                INNER JOIN phongban on nhanvien.maphongban = phongban.maphongban 
                INNER JOIN chucvu on chucvu.machucvu = nhanvien.machucvu WHERE nhanvien.manhanvien = ?`,
                [maNhanVienDangNhap]
            );
            resolve(thongtin);
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = {
    getAllNhanVien: getAllNhanVien,
    checkNhanVienTonTai: checkNhanVienTonTai,
    thongTinNhanVienDangNhap: thongTinNhanVienDangNhap,
};
