import connectDB from '../configs/connectDB';

let getAllThanhVienHDKH = (idHDKH) => {
    return new Promise(async (resolve, reject) => {
        try {
            let [allThanhVien] = await connectDB.execute(
                `SELECT * FROM thanhvienhoidong WHERE id_hoidong = ?`,
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
                `SELECT tennhanvien, thanhvienhoidong.id as thanhVienHoiDongId,
                nhanvien.id as nhanVienId,chucvuhd.id as chucVuId,tenchucvu
                 FROM thanhvienhoidong INNER JOIN nhanvien ON thanhvienhoidong.id_nhanvien = nhanvien.id 
                JOIN chucvuhd  ON thanhvienhoidong.id_chucvu = chucvuhd.id
                WHERE thanhvienhoidong.id_hoidong=? `,
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
                `INSERT INTO thanhvienhoidong (id,id_hoidong,id_nhanvien,id_chucvu) values(null,?,?,?)`,
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
                'UPDATE thanhvienhoidong set id_chucvu=?, id_nhanvien=? WHERE id =?',
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
