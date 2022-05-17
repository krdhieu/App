import connectDB from '../configs/connectDB';

let getSangKienDaDuyet = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let [sangKien] = await connectDB.execute(
                `SELECT sangkien.*, dotsangkien.ten , trangthaisangkien.trangthai 
                FROM sangkien 
                JOIN dotsangkien on sangkien.id_dot = dotsangkien.id 
                JOIN trangthaisangkien on sangkien.id_trangthai = trangthaisangkien.id where sangkien.id_trangthai=2`
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
                `SELECT sangkien.*, dotsangkien.ten , trangthaisangkien.trangthai 
                FROM sangkien 
                JOIN dotsangkien on sangkien.id_dot = dotsangkien.id 
                JOIN trangthaisangkien on sangkien.id_trangthai = trangthaisangkien.id where sangkien.id=?`,
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
