import { get } from 'express/lib/response';
import connectDB from '../configs/connectDB';
// them tai khoan moi
let createAccount = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await connectDB.execute(
                'INSERT INTO `taikhoan`(`tentaikhoan`, `matkhau`, `manhanvien`, `maquyen`) VALUES (?,?,?,?)',
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
//lay thong tin tat ca tai khoan + loai quyen + ten nhanvien trong he thong
let getAllAccount = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let [allAccount] = await connectDB.execute(
                'SELECT * FROM `taikhoan` INNER JOIN nhanvien on taikhoan.manhanvien=nhanvien.manhanvien INNER JOIN quyen on quyen.maquyen=taikhoan.maquyen'
            );
            resolve(allAccount);
        } catch (e) {
            reject(e);
        }
    });
};
// sửa quyền
let editRole = (email, roleId) => {
    return new Promise(async (resolve, reject) => {
        try {
            await connectDB.execute(
                'UPDATE taikhoan set maquyen=? where tentaikhoan=?',
                [roleId, email]
            );
            resolve('ok');
        } catch (e) {
            reject(e);
        }
    });
};

//reset password doi mat khau
let resetPassword = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            await connectDB.execute(
                'UPDATE taikhoan set matkhau=? where tentaikhoan=?',
                [password, email]
            );
            resolve('ok');
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createAccount: createAccount,
    getOneAccount: getOneAccount,
    getAllAccount: getAllAccount,
    editRole: editRole,
    resetPassword: resetPassword,
};
