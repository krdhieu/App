import nhanvienService from '../services/nhanvienService';
import quyenService from '../services/quyenService';
import taikhoanService from '../services/taikhoanService';
import bcrypt from 'bcryptjs';
// hien thi trang them tai khoan
let getCreateAccount = async (req, res) => {
    let allNhanVien = await nhanvienService.getAllNhanVien();
    let allQuyen = await quyenService.getAllQuyen();
    console.log('>>allnhanvien', allNhanVien);
    console.log('>>allquyen', allQuyen);
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
// hien thi ta ca tai khoan
let manageAccount = async (req, res) => {
    let allAccount = await taikhoanService.getAllAccount();
    return res.render('manageAccount.ejs', { allAccount });
};
// hien thi trang sua tai khoan
let getEditAccount = async (req, res) => {
    let email = req.query.email;
    if (!email) {
        return res.redirect('/manage-account');
    }
    let account = await taikhoanService.getOneAccount(email);
    if (account.length !== 1) {
        return res.redirect('/manage-account');
    }
    let allQuyen = await quyenService.getAllQuyen();
    return res.render('editAccount.ejs', {
        account: account,
        allQuyen: allQuyen,
    });
};

//thuc hien sua quyen cua tai khoan
let editRole = async (req, res) => {
    let { email, quyen } = req.body;
    if (!email || !quyen) {
        return res.redirect('/get-edit-account');
    }
    await taikhoanService.editRole(email, quyen);
    return res.redirect('/manage-account');
};
// admin reset pass word
let resetPassword = async (req, res) => {
    let { email } = req.query;
    if (!email) {
        return res.redirect('/get-edit-account');
    }
    let account = await taikhoanService.getOneAccount(email);
    if (account.length !== 1) {
        return res.redirect('/get-edit-account');
    }
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync('12345', salt);
    await taikhoanService.resetPassword(email, hash);
    return res.redirect('/manage-account');
};

// hien thi trang doi mat khau

let getChangePassword = (req, res) => {
    let { emailLogin, nhanVienId, roleId } = req;
    return res.render('changePassword.ejs', {
        emailLogin: emailLogin,
    });
};

// nguoi dung doi mat khau
let changePassword = async (req, res) => {
    let { email, newPassword1, newPassword2, oldPassword } = req.body;
    if (!email || !newPassword1 || !newPassword2 || !oldPassword) {
        return res.send('Missing required parameter!!');
    }

    let account = await taikhoanService.getOneAccount(email);
    if (account.length !== 1) {
        return res.send('email khong ton tai');
    }
    console.log(account);
    let check = await bcrypt.compareSync(oldPassword, account[0].matkhau);
    if (!check) {
        return res.send('mat khau cu khong chinh xac');
    }
    if (newPassword1 !== newPassword2) {
        return res.send('Mat khau moi khong khop');
    }
    let salt = await bcrypt.genSaltSync(10);
    let hash = await bcrypt.hashSync(newPassword1, salt);
    await taikhoanService.resetPassword(email, hash);
    return res.send('doi mat khau thanh cong');
};

module.exports = {
    getCreateAccount: getCreateAccount,
    createAccount: createAccount,
    manageAccount: manageAccount,
    getEditAccount: getEditAccount,
    editRole: editRole,
    resetPassword: resetPassword,
    changePassword: changePassword,
    getChangePassword: getChangePassword,
};
