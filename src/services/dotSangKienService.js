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

module.exports = {
    getAllDot,
};
