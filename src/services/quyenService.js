import connectDB from '../configs/connectDB';
// lay tat ca thong tin trong bang quyen han
let getAllQuyen = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let [allQuyen] = await connectDB.execute('SELECT * FROM quyen');
            resolve(allQuyen);
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    getAllQuyen: getAllQuyen,
};
