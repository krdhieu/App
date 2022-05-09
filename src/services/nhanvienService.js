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

module.exports = {
    getAllNhanVien: getAllNhanVien,
};
