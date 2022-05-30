import connectDB from '../configs/connectDB';
//kiem tra giam khao da nhan xet hay chua, moi giam khao chi duoc nhan xet 1 lan / 1 sang kien
let getNhanXet = (maThanhVien, maSangKien) => {
    return new Promise(async (resolve, reject) => {
        try {
            let [check] = await connectDB.execute(
                `SELECT * FROM nhanxet WHERE mathanhvien=? and masangkien=?`,
                [maThanhVien, maSangKien]
            );
            resolve(check);
        } catch (e) {
            reject(e);
        }
    });
};
// them nhan xet cho sang kien
let createNhanXet = (maThanhVien, maSangKien, nhanXet, thoiGianNX) => {
    return new Promise(async (resolve, reject) => {
        try {
            await connectDB.execute(
                `INSERT INTO nhanxet (manhanxet,mathanhvien,masangkien,noidung,thoigiannhanxet) values(null,?,?,?,?)`,
                [maThanhVien, maSangKien, nhanXet, thoiGianNX]
            );
            resolve('ok');
        } catch (e) {
            reject(e);
        }
    });
};

let editNhanXet = (mathanhvien, masangkien, noidung, thoigiannhanxet) => {
    return new Promise(async (resolve, reject) => {
        try {
            await await connectDB.execute(
                `UPDATE nhanxet set noidung=?, thoigiannhanxet =? WHERE mathanhvien=? AND masangkien=?`,
                [noidung, thoigiannhanxet, mathanhvien, masangkien]
            );
            resolve('ok');
        } catch (e) {
            reject(e);
        }
    });
};

let checkNhanXetDelThanhVien = (idThanhVien) => {
    return new Promise(async (resolve, reject) => {
        try {
            let [check] = await connectDB.execute(
                `SELECT * FROM nhanxet WHERE mathanhvien=?`,
                [idThanhVien]
            );
            resolve(check);
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = {
    getNhanXet,
    createNhanXet,
    checkNhanXetDelThanhVien: checkNhanXetDelThanhVien,
    editNhanXet,
};
