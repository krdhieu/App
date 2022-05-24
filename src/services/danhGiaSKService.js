const { default: connectDB } = require('../configs/connectDB');

//them danh gia
let createDanhGiaSangKien = (masangkien, maxeploai) => {
    return new Promise(async (resolve, reject) => {
        try {
            await connectDB.execute(
                `INSERT INTO danhgiasangkien(masangkien, maxeploai) VALUES (?,?)`,
                [masangkien, maxeploai]
            );
            resolve('ok');
        } catch (e) {
            reject(e);
        }
    });
};
// kiem tra danh gia ton tai chua
let checkDanhGia = (maSangKien, maXepLoai) => {
    return new Promise(async (resolve, reject) => {
        try {
            let [check] = await connectDB.execute(
                `SELECT * FROM danhgiasangkien WHERE masangkien = ? and maxeploai=?`,
                [maSangKien, maXepLoai]
            );
            resolve(check);
        } catch (e) {
            reject(e);
        }
    });
};
// sua danh gia

let editDanhGiaSangKien = (masangkien, maxeploaimoi, maxeploaicu) => {
    return new Promise(async (resolve, reject) => {
        try {
            await connectDB.execute(
                `UPDATE danhgiasangkien SET maxeploai=? WHERE masangkien=? AND maxeploai=?`,
                [maxeploaimoi, masangkien, maxeploaicu]
            );
            resolve('ok');
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createDanhGiaSangKien,
    editDanhGiaSangKien,
    checkDanhGia,
};
