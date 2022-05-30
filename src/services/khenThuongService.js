import connectDB from '../configs/connectDB';

let createKhenThuong = (maSangKien, mucKhenThuong) => {
    return new Promise(async (resolve, reject) => {
        try {
            await connectDB.execute(
                `INSERT INTO khenthuong (masangkien,muckhenthuong) values (?,?)`,
                [maSangKien, mucKhenThuong]
            );
            resolve('ok');
        } catch (e) {
            reject(e);
        }
    });
};

let updateKhenThuong = (maKhenThuong, mucKhenThuong) => {
    return new Promise(async (resolve, reject) => {
        try {
            await connectDB.execute(
                `UPDATE  khenthuong set muckhenthuong= ? WHERE makhenthuong =?`,
                [mucKhenThuong, maKhenThuong]
            );
            resolve('ok');
        } catch (e) {
            reject(e);
        }
    });
};

let checkKhenThuong = (maSangKien) => {
    return new Promise(async (resolve, reject) => {
        try {
            let [khenThuong] = await connectDB.execute(
                `SELECT * FROM khenthuong WHERE masangkien = ?`,
                [maSangKien]
            );
            resolve(khenThuong);
        } catch (e) {
            reject(e);
        }
    });
};

/* 
lay thong tin sang kien co khen thuong bao gom masangkien, tensangkien, dotsangkien, xeploai, muckhenthuong
*/
let getAllKhenThuong = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let [allKhenThuong] =
                await connectDB.execute(`SELECT khenthuong.*, khenthuong.masangkien,
                 sangkien.tensangkien, dotsangkien.tendotsangkien,
                 xeploai.tenxeploai
                FROM khenthuong 
                LEFT JOIN sangkien on khenthuong.masangkien = sangkien.masangkien 
                LEFT JOIN dotsangkien ON sangkien.madotsangkien = dotsangkien.madotsangkien
                LEFT JOIN danhgiasangkien on danhgiasangkien.masangkien = khenthuong.masangkien
                LEFT JOIN xeploai on xeploai.maxeploai= danhgiasangkien.maxeploai`);
            resolve(allKhenThuong);
        } catch (e) {
            reject(e);
        }
    });
};

let getAllKhenThuongTheoDot = (maDotTimKiem) => {
    return new Promise(async (resolve, reject) => {
        try {
            let [allKhenThuong] = await connectDB.execute(
                `SELECT khenthuong.*, khenthuong.masangkien,
                 sangkien.tensangkien, dotsangkien.tendotsangkien,
                 xeploai.tenxeploai
                FROM khenthuong 
                LEFT JOIN sangkien on khenthuong.masangkien = sangkien.masangkien 
                LEFT JOIN dotsangkien ON sangkien.madotsangkien = dotsangkien.madotsangkien
                LEFT JOIN danhgiasangkien on danhgiasangkien.masangkien = khenthuong.masangkien
                LEFT JOIN xeploai on xeploai.maxeploai= danhgiasangkien.maxeploai WHERE dotsangkien.madotsangkien=?`,
                [maDotTimKiem]
            );
            resolve(allKhenThuong);
        } catch (e) {
            reject(e);
        }
    });
};

// hoan thanh sang kien khi cham diem xong
let setTrangThaiHoanThanhTatCaSK = () => {
    return new Promise(async (resolve, reject) => {
        try {
            await connectDB.execute(
                `UPDATE sangkien SET matrangthai= '3'  WHERE  matrangthai= '2'`
            );
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = {
    createKhenThuong,
    updateKhenThuong,
    checkKhenThuong,
    getAllKhenThuong,
    getAllKhenThuongTheoDot,
    setTrangThaiHoanThanhTatCaSK,
};
