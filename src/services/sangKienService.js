import connectDB from '../configs/connectDB';

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
module.exports = {
    getSangKienDaDuyet: getSangKienDaDuyet,
    getDetailSangKien: getDetailSangKien,
};
