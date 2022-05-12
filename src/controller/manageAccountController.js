import nhanvienService from '../services/nhanvienService';
import quyenService from '../services/quyenService';
import taikhoanService from '../services/taikhoanService';
import bcrypt from 'bcryptjs';
// hien thi trang them tai khoan
let getCreateAccount = async (req, res) => {
    let allNhanVien = await nhanvienService.getAllNhanVien();
    let allQuyen = await quyenService.getAllQuyen();
    return res.render('createAccount.ejs', {
        allQuyen: allQuyen,
        allNhanVien: allNhanVien,
    });
};

//xu ly them tai khoan
let createAccount = async (req, res) => {
    //du lieu tao tai khoan post request truyen len
    let { email, password, quyen, idNhanVien } = req.body;
    if (!email || !password || !quyen || !idNhanVien) {
        return res.redirect('/get-create-account');
    }
    //check password có khoảng trắng hay không
    let haveBackspace = [...password].some((item) => {
        return item === ' ';
    });
    if (haveBackspace) {
        return res.send('Not allow backspace in password');
    }
    //kiem tra tai khoan da ton tai hay chua
    let check = await taikhoanService.getOneAccount(email);
    if (check.length === 1) {
        return res.send('Account already exists');
    }
    //ma hoa mat khau
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    let data = { email, hash, quyen, idNhanVien };
    //them tai khoan
    await taikhoanService.createAccount(data);
    return res.send('ok');
};

let manageAccount = async (req, res) => {
    let allAccount = await taikhoanService.getAllAccount();
    return res.render('manageAccount.ejs', { allAccount });
};

let getEditAccount = async (req, res) => {
    let email = req.query.email;
    if (!email) {
        res.redirect('/manage-account');
    }
    let account = await taikhoanService.getOneAccount(email);
    if (account.length !== 1) {
        res.redirect('/manage-account');
    }
    return res.render('editAccount.ejs');
};
module.exports = {
    getCreateAccount: getCreateAccount,
    createAccount: createAccount,
    manageAccount: manageAccount,
    getEditAccount: getEditAccount,
};
