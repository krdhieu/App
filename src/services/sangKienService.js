import connectDB from '../configs/connectDB';
// hien thi nhung sang kien
let getSangKienDaDuyet = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let [sangKien] = await connectDB.execute(
                `SELECT sangkien.*, dotsangkien.tendotsangkien , trangthaisangkien.tentrangthai 
                FROM sangkien 
                JOIN dotsangkien on sangkien.madotsangkien = dotsangkien.madotsangkien 
                JOIN trangthaisangkien on sangkien.matrangthai = trangthaisangkien.matrangthai where sangkien.matrangthai=2`
            );
            resolve(sangKien);
        } catch (e) {
            reject(e);
        }
    });
};
// chi tiet sang kien hien thi trong trang cham diem
let getDetailSangKien = (idSangKien) => {
    return new Promise(async (resolve, reject) => {
        try {
            let [detailSangKien] = await connectDB.execute(
                `SELECT sangkien.*, dotsangkien.tendotsangkien , trangthaisangkien.tentrangthai 
                FROM sangkien 
                JOIN dotsangkien on sangkien.madotsangkien = dotsangkien.madotsangkien
                JOIN trangthaisangkien on sangkien.matrangthai = trangthaisangkien.matrangthai where sangkien.masangkien=?`,
                [idSangKien]
            );
            resolve(detailSangKien);
        } catch (e) {
            reject(e);
        }
    });
};
//lay tat ca sang kien trang thai dang thuc hien
let getSangKienDangThucHien = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let [sangkien] = await connectDB.execute(
                `SELECT * FROM sangkien WHERE matrangthai=2`
            );
            resolve(sangkien);
        } catch (e) {
            reject(e);
        }
    });
};
// lay thong tin sang kien + danh gia sang kien + xep loai co trang thai dang thuc hien
let getSangKienDangThucHienLeftJoinDanhGia = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let [sangkien] = await connectDB.execute(
                `SELECT sangkien.*,danhgiasangkien.maxeploai,xeploai.tenxeploai 
                FROM sangkien 
                LEFT JOIN danhgiasangkien on sangkien.masangkien= danhgiasangkien.masangkien 
                LEFT JOIN xeploai ON xeploai.maxeploai= danhgiasangkien.maxeploai
                WHERE sangkien.matrangthai=2`
            );
            resolve(sangkien);
        } catch (e) {
            reject(e);
        }
    });
};

// lay thong tin sang kien + danh gia sang kien + xep loai -  ma sang kien

let getSangKienDangThucHienLeftJoinDanhGiaByMaSangKien = (maSangKien) => {
    return new Promise(async (resolve, reject) => {
        try {
            let [sangkien] = await connectDB.execute(
                `SELECT sangkien.*,danhgiasangkien.maxeploai,xeploai.tenxeploai 
                FROM sangkien 
                LEFT JOIN danhgiasangkien on sangkien.masangkien= danhgiasangkien.masangkien 
                LEFT JOIN xeploai ON xeploai.maxeploai= danhgiasangkien.maxeploai
                WHERE sangkien.masangkien=?`,
                [maSangKien]
            );
            resolve(sangkien);
        } catch (e) {
            reject(e);
        }
    });
};

/// lay thong tin sang kien + xep loai + muc thuong hien tai

let getSangKienDangThucHienLeftJoinDanhGiaAndMucThuongByMaSangKien = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let [sangkien] = await connectDB.execute(
                `SELECT sangkien.*,danhgiasangkien.maxeploai,xeploai.tenxeploai ,muckhenthuong,makhenthuong
                FROM sangkien 
                LEFT JOIN danhgiasangkien on sangkien.masangkien= danhgiasangkien.masangkien 
                LEFT JOIN xeploai ON xeploai.maxeploai= danhgiasangkien.maxeploai
                LEFT JOIN khenthuong ON khenthuong.masangkien = sangkien.masangkien
                WHERE sangkien.matrangthai=2`
            );
            resolve(sangkien);
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    getSangKienDaDuyet,
    getDetailSangKien,
    getSangKienDangThucHien,
    getSangKienDangThucHienLeftJoinDanhGia,
    getSangKienDangThucHienLeftJoinDanhGiaByMaSangKien,
    getSangKienDangThucHienLeftJoinDanhGiaAndMucThuongByMaSangKien,
};
