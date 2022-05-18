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

module.exports = {
    getAllNhanVien: getAllNhanVien,
    checkNhanVienTonTai: checkNhanVienTonTai,
};
