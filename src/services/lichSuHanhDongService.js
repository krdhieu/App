import connectDB from '../configs/connectDB';

let themLichSu = (maNhanVien, hanhDong, ngayGio) => {
    return new Promise(async (resolve, reject) => {
        try {
            await connectDB.execute(
                `INSERT INTO lichsuhanhdong (manhanvien,hanhdong,ngaygio) values (?,?,?)`,
                [maNhanVien, hanhDong, ngayGio]
            );
            resolve('ok');
        } catch (e) {
            reject(e);
        }
    });
};

let hienThiToanBoLichSu = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let [lichSu] = await connectDB.execute(
                `SELECT * FROM lichsuhanhdong inner join nhanvien on nhanvien.manhanvien= lichsuhanhdong.manhanvien`
            );
            resolve(lichSu);
        } catch (e) {
            reject(e);
        }
    });
};

let lichSuPerPage = (perpage, begin) => {
    return new Promise(async (resolve, reject) => {
        try {
            let [lichSu] = await connectDB.execute(
                `SELECT * FROM lichsuhanhdong inner join nhanvien on nhanvien.manhanvien= lichsuhanhdong.manhanvien LIMIT ? OFFSET ?`,
                [perpage, begin]
            );
            resolve(lichSu);
        } catch (e) {
            reject(e);
        }
    });
};

let hienThiToanBoLichSuFromTo = (fromDate, toDate) => {
    return new Promise(async (resolve, reject) => {
        try {
            let [lichSu] = await connectDB.execute(
                `SELECT * FROM lichsuhanhdong inner join nhanvien on nhanvien.manhanvien= lichsuhanhdong.manhanvien where lichsuhanhdong.ngaygio BETWEEN 
                ? AND ?`,
                [fromDate, toDate]
            );
            resolve(lichSu);
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = {
    themLichSu,
    hienThiToanBoLichSu,
    hienThiToanBoLichSuFromTo,
    lichSuPerPage,
};
