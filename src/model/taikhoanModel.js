import connectDB from '../configs/connectDB';

const getTaiKhoanByEmailAndMatKhau = async (email, password) => {
    let [data] = await connectDB.execute(
        'SELECT * FROM taikhoan WHERE tentaikhoan=? and matkhau=?',
        [email, password]
    );

    return data;
};

module.exports = {
    getTaiKhoanByEmailAndMatKhau,
};
