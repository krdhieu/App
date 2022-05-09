import connectDB from '../configs/connectDB';
// them tai khoan moi
let createAccount = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await connectDB.execute(
                'INSERT INTO `taikhoan`(`tentaikhoan`, `matkhau`, `id_nhanvien`, `id_quyen`) VALUES (?,?,?,?)',
                [data.email, data.hash, data.idNhanVien, data.quyen]
            );
            resolve('ok');
        } catch (e) {
            reject(e);
        }
    });
};
//lay thong tin tai khoan bang email middle ware
let getOneAccount = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let [account] = await connectDB.execute(
                'SELECT * FROM `taikhoan` WHERE `tentaikhoan`= ?',
                [email]
            );
            resolve(account);
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createAccount: createAccount,
    getOneAccount: getOneAccount,
};
