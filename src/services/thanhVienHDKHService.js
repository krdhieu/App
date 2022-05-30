import connectDB from '../configs/connectDB';

let getAllThanhVienHDKH = (idHDKH) => {
    return new Promise(async (resolve, reject) => {
        try {
            let [allThanhVien] = await connectDB.execute(
                `SELECT * FROM thanhvienhoidong WHERE mahoidong = ?`,
                [idHDKH]
            );
            resolve(allThanhVien);
        } catch (e) {
            reject(e);
        }
    });
};

let getAllThanhVienHDKHJoinNhanVienJoinChucVu = (idHDKH) => {
    return new Promise(async (resolve, reject) => {
        try {
            let [allThanhVien] = await connectDB.execute(
                `SELECT tennhanvien, thanhvienhoidong.mathanhvien,
                nhanvien.manhanvien ,chucvuhd.machucvuhd , tenchucvuhd
                 FROM thanhvienhoidong INNER JOIN nhanvien ON thanhvienhoidong.manhanvien = nhanvien.manhanvien
                JOIN chucvuhd  ON thanhvienhoidong.machucvuhd = chucvuhd.machucvuhd
                WHERE thanhvienhoidong.mahoidong=? `,
                [idHDKH]
            );
            resolve(allThanhVien);
        } catch (e) {
            reject(e);
        }
    });
};

let createThanhVien = (idHDKH, idNhanVien, idChucVuHD) => {
    return new Promise(async (resolve, reject) => {
        try {
            await connectDB.execute(
                `INSERT INTO thanhvienhoidong (mathanhvien,mahoidong,manhanvien,machucvuhd) values(null,?,?,?)`,
                [idHDKH, idNhanVien, idChucVuHD]
            );
            resolve('success');
        } catch (e) {
            reject(e);
        }
    });
};

let editThanhVienHD = (idThanhVienHD, idChucVu, idHDKH) => {
    return new Promise(async (resolve, reject) => {
        try {
            await connectDB.execute(
                'UPDATE thanhvienhoidong set machucvuhd=?, manhanvien=? WHERE mathanhvien =?',
                [idChucVu, idThanhVienHD, idHDKH]
            );
            resolve('ok');
        } catch (error) {
            reject(error);
        }
    });
};
// kiem tra thanh vien nay da trong hoi dong hien tai hay chua
let checkThanhVienHD = (maNhanVien, maHoiDong) => {
    return new Promise(async (resolve, reject) => {
        try {
            let [check] = await connectDB.execute(
                `SELECT * FROM thanhvienhoidong WHERE manhanvien=? and mahoidong=?`,
                [maNhanVien, maHoiDong]
            );
            resolve(check);
        } catch (e) {
            reject(e);
        }
    });
};

let deleteThanhVienKhongCoRangBuoc = (maThanhVien) => {
    return new Promise(async (resolve, reject) => {
        try {
            await connectDB.execute(
                `DELETE FROM thanhvienhoidong WHERE mathanhvien=?`,
                [maThanhVien]
            );
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = {
    getAllThanhVienHDKH,
    createThanhVien: createThanhVien,
    editThanhVienHD: editThanhVienHD,
    getAllThanhVienHDKHJoinNhanVienJoinChucVu:
        getAllThanhVienHDKHJoinNhanVienJoinChucVu,
    checkThanhVienHD,
    deleteThanhVienKhongCoRangBuoc,
};
