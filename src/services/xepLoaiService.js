import connectDB from '../configs/connectDB';

// lấy loại xếp loại
let getAllLoaiXepLoai = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let [allLoai] = await connectDB.execute(`SELECT * FROM xeploai`);
            resolve(allLoai);
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    getAllLoaiXepLoai: getAllLoaiXepLoai,
};
