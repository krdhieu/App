import connectDB from '../configs/connectDB';

let getAllDot = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let [allDot] = await connectDB.execute(`SELECT * FROM dotsangkien`);
            resolve(allDot);
        } catch (e) {
            reject(e);
        }
    });
};

let getDotHienTai = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let [dotHienTai] = await connectDB.execute(
                `SELECT * FROM dotsangkien WHERE dotsangkien.trangthai=1`
            );
            resolve(dotHienTai);
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    getAllDot,
    getDotHienTai,
};
