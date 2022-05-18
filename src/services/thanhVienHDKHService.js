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

module.exports = {
    getAllThanhVienHDKH,
    createThanhVien: createThanhVien,
    editThanhVienHD: editThanhVienHD,
    getAllThanhVienHDKHJoinNhanVienJoinChucVu:
        getAllThanhVienHDKHJoinNhanVienJoinChucVu,
};
