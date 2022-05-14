import connectDB from '../configs/connectDB';

let getAllChucVuHDKH = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let allChucVu = await connectDB.execute(`SELECT * FROM chucvuhd`);
            resolve(allChucVu[0]);
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    getAllChucVuHDKH: getAllChucVuHDKH,
};
