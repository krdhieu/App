import nhanvienService from '../services/nhanvienService';
import quyenService from '../services/quyenService';
import taikhoanService from '../services/taikhoanService';
import bcrypt from 'bcryptjs';
import connectDB from '../configs/connectDB';

// hien thi trang them tai khoan
let getCreateAccount = async (req, res) => {
    let { alert } = req.query;
    let allNhanVien = await nhanvienService.getAllNhanVien();
    let allQuyen = await quyenService.getAllQuyen();

    return res.render('createAccount.ejs', {
        allQuyen: allQuyen,
        allNhanVien: allNhanVien,
        alert,
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
        return res.redirect(
            '/get-create-account?alert=' + encodeURIComponent('backspace')
        );
    }
    //kiem tra tai khoan da ton tai hay chua
    let check = await taikhoanService.getOneAccount(email);
    if (check.length === 1) {
        return res.redirect(
            '/get-create-account?alert=' + encodeURIComponent('taikhoantontai')
        );
    }
    let checkNV = await nhanvienService.checkNhanVienTonTai(idNhanVien);
    if (checkNV.length !== 1) {
        return res.redirect(
            '/get-create-account?alert=' + encodeURIComponent('nhanvienktontai')
        );
    }
    let checkNVCoTK = await taikhoanService.checkNhanVienDaCoTaiKhoan(
        idNhanVien
    );
    if (checkNVCoTK.length >= 1) {
        return res.redirect(
            '/get-create-account?alert=' +
                encodeURIComponent('nhanviendacotaikhoan')
        );
    }
    //ma hoa mat khau
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    let data = { email, hash, quyen, idNhanVien };
    //them tai khoan
    await taikhoanService.createAccount(data);
    return res.redirect(
        '/get-create-account?alert=' + encodeURIComponent('thanhcong')
    );
};

// hien thi ta ca tai khoan - phan trang
let manageAccount = async (req, res) => {
    let { alert } = req.query;

    let page = parseInt(req.query.page) || 1;
    let perpage = 5;

    let allAccount = await taikhoanService.getAllAccount();
    // phan trang
    let numOfResults = allAccount.length;
    let numOfPages = Math.ceil(numOfResults / perpage);

    if (page > numOfPages) {
        return res.redirect(
            '/manage-account?page=' + encodeURIComponent(numOfPages)
        );
    } else if (page < 1) {
        return res.redirect('/manage-account?page=' + encodeURIComponent('1'));
    }
    let begin = (page - 1) * perpage;
    // let end = page * perpage;
    // let [accountPerpage] = await connectDB.execute(
    //     `SELECT * FROM taikhoan LIMIT ${perpage} OFFSET ${begin}`
    // );
    let accountPerpage = await taikhoanService.paginationAccount(
        perpage,
        begin
    );
    // console.log('>>>>>perpage', accountPerpage);
    /// hien thi lien ket den 5 trang truoc trang hien tai
    let iterator = page - 5 < 1 ? 1 : page - 5;
    // console.log('iterator>>>>>>>>>>>>>', iterator);

    let endingLink = iterator + 9 <= numOfPages ? iterator + 9 : numOfPages;
    // if (endingLink < page + 4) {
    //     iterator -= page + 4 - numOfPages;
    // }
    return res.render('manageAccount.ejs', {
        allAccount: accountPerpage,
        page,
        iterator,
        endingLink,
        numOfPages,
        perpage,
        alert,
    });
};

// tim tai khoan theo then tai khoan
let searchAccountByName = async (req, res) => {
    let { accountName } = req.body;
    if (!accountName) {
        return res.redirect('/manage-account');
    }
    let allAccount = await taikhoanService.searchAccountByName(accountName);
    let soKetQua = allAccount.length;
    return res.render('searchAccountByName.ejs', {
        allAccount: allAccount,
        soKetQua,
    });
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
    let hash = bcrypt.hashSync(process.env.PASSWORD_RESET, salt);
    await taikhoanService.resetPassword(email, hash);
    return res.redirect('/manage-account');
};

// hien thi trang doi mat khau

let getChangePassword = (req, res) => {
    let { emailLogin, nhanVienId, roleId } = req;
    let { alert } = req.query;
    return res.render('changePassword.ejs', {
        emailLogin: emailLogin,
        alert,
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
        return res.redirect('/get-change-password');
    }
    // console.log(account);
    let check = await bcrypt.compareSync(oldPassword, account[0].matkhau);
    if (!check) {
        return res.redirect(
            '/get-change-password?alert=' + encodeURIComponent('1')
        );
    }
    if (newPassword1 !== newPassword2) {
        return res.redirect(
            '/get-change-password?alert=' + encodeURIComponent('2')
        );
    }
    let salt = await bcrypt.genSaltSync(10);
    let hash = await bcrypt.hashSync(newPassword1, salt);
    await taikhoanService.resetPassword(email, hash);
    return res.redirect(
        '/get-change-password?alert=' + encodeURIComponent('0')
    );
};

// xoa tai khoan

let deleteAccount = async (req, res) => {
    let { email } = req.body;
    await taikhoanService.deleteAccount(email);
    return res.redirect(
        '/manage-account?alert=' + encodeURIComponent('xoataikhoanthanhcong')
    );
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
    searchAccountByName: searchAccountByName,
    deleteAccount: deleteAccount,
};
