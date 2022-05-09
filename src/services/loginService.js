import connectDB from '../configs/connectDB';
// trả về thông tin tài khoản đăng nhập
let handleLogin = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let [user] = await connectDB.execute(
                'SELECT * FROM taikhoan where tentaikhoan =?',
                [email]
            );
            resolve(user);
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    handleLogin: handleLogin,
};
