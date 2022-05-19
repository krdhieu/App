import req from 'express/lib/request';
import connectDB from '../configs/connectDB';
import jwt from 'jsonwebtoken';
import chuanhoachuoi from '../services/chuanhoachuoi';

let viewNhanvien = async (req, res) => {
    let search = '';
    if (req.query.search != null) {
        search = req.query.search;
    }
    console.log(search)
    const [phongban, fields_phongban] = await connectDB.execute('SELECT * FROM phongban ');
    const [chucvu, fields_chucvu] = await connectDB.execute('SELECT * FROM chucvu ');
    const [rows, fields] = await connectDB.execute("SELECT * FROM `nhanvien` INNER JOIN phongban On nhanvien.maphongban = phongban.maphongban INNER JOIN chucvu ON nhanvien.machucvu = chucvu.machucvu where tennhanvien LIKE ? ", ['%' + search + '%']);
    return res.render('shownhanvien.ejs', { dataNhanvien: rows, dataPhongban: phongban, dataChucvu: chucvu });
}
let editNhanvien = async (req, res) => {
    let manhanvien = req.params.manhanvien;
    let [user] = await connectDB.execute('SELECT * FROM `nhanvien` where manhanvien = ?', [manhanvien]);
    const [phongban, fields_phongban] = await connectDB.execute('SELECT * FROM phongban ');
    const [chucvu, fields_chucvu] = await connectDB.execute('SELECT * FROM chucvu ');
    return res.render('suanhanvien.ejs', { dataNhanvien: user[0], dataPhongban: phongban, dataChucvu: chucvu });
}

let uploadNhanvien = async (req, res) => {
    let { manhanvien, maphongban, machucvu, trinhdohocvan, tennhanvien, gioitinh, ngaysinh, ngayvaolam, sdt } = req.body;
    if (!manhanvien || !maphongban || !machucvu || !trinhdohocvan || !tennhanvien || !gioitinh || !ngaysinh || !ngayvaolam || !sdt) {
        res.redirect('/quanlynhanvien');
    }
    tennhanvien = chuanhoachuoi.chuanhoaten(tennhanvien);
    trinhdohocvan = chuanhoachuoi.chuanhoa(trinhdohocvan);
    await connectDB.execute('update nhanvien set maphongban = ?, machucvu =? , trinhdohocvan = ?,tennhanvien = ?,gioitinh = ?,ngaysinh = ?,ngayvaolam = ?,sdt = ? where manhanvien = ?',
        [maphongban, machucvu, trinhdohocvan, tennhanvien, gioitinh, ngaysinh, ngayvaolam, sdt, manhanvien]);
    return res.redirect('/quanlynhanvien')
}


//-------- theem nhan vien
let addNhanvien = async (req, res) => {
    let { maphongban, machucvu, trinhdohocvan, tennhanvien, gioitinh, ngaysinh, ngayvaolam, sdt } = req.body;
    if (!maphongban || !machucvu || !trinhdohocvan || !tennhanvien || !gioitinh || !ngaysinh || !ngayvaolam || !sdt) {
        return res.redirect('/quanlynhanvien');
    }
    tennhanvien = chuanhoachuoi.chuanhoaten(tennhanvien);
    trinhdohocvan = chuanhoachuoi.chuanhoa(trinhdohocvan);
    for (let i = 0; i < sdt.length; i++) {
        if (sdt[i] >= '0' && sdt[i] <= '9') {
        }
        else {
            return res.status(200).send('<p>sai dinh dang dien thoai <a href="/quanlynhanvien">Trở về</a></p>');
        }
    }
    await connectDB.execute('INSERT INTO nhanvien(maphongban, machucvu, trinhdohocvan, tennhanvien, gioitinh, ngaysinh, ngayvaolam, sdt)  VALUES (?,?,?,?,?,?,?,? )',
        [maphongban, machucvu, trinhdohocvan, tennhanvien, gioitinh, ngaysinh, ngayvaolam, sdt]);
    return res.redirect('/quanlynhanvien')
}
let nghiviecNhanvien = async (req, res) => {
    let { manhanvien } = req.body;
    await connectDB.execute('update nhanvien set trangthai = ? where manhanvien = ?', [0, manhanvien]);
    return res.redirect('/quanlynhanvien');
}

let thongtinNhanvien = async (req, res) => {
    // if (!req.cookies.access_token) {
    //     return res.redirect('/');
    // }
    // const access_token = req.cookies.access_token.split(' ')[1];
    // let payLoad = jwt.verify(access_token, process.env.JWT_ACCESS_KEY);
    const [nhanvien] = await connectDB.execute('SELECT * FROM nhanvien where manhanvien = ?', [2]);
    res.render('thongtincanhan.ejs', { dataNhanvien: nhanvien[0] });
}
let uploadNhanvienuser = async (req, res) => {
    let { manhanvien, tennhanvien, gioitinh, ngaysinh, ngayvaolam, sdt } = req.body;
    if (!manhanvien || !tennhanvien || !gioitinh || !ngaysinh || !ngayvaolam || !sdt) {
        res.redirect('/quanlynhanvien');
    }
    tennhanvien = chuanhoachuoi.chuanhoaten(tennhanvien)
    await connectDB.execute('update nhanvien set  tennhanvien = ?,gioitinh = ?,ngaysinh = ?,ngayvaolam = ?,sdt = ? where manhanvien = ?',
        [tennhanvien, gioitinh, ngaysinh, ngayvaolam, sdt, manhanvien]);
    return res.redirect('/thongtincanhan')
}
let suaNhanvienuser = async (req, res) => {
    // const access_token = req.cookies.access_token.split(' ')[1];
    // let payLoad = jwt.verify(access_token, process.env.JWT_ACCESS_KEY);
    const [nhanvien] = await connectDB.execute('SELECT * FROM nhanvien where manhanvien = ?', [2]);
    res.render('suanhanvien-user.ejs', { dataNhanvien: nhanvien[0] });
}

module.exports = {
    viewNhanvien, editNhanvien, uploadNhanvien, addNhanvien, nghiviecNhanvien, thongtinNhanvien, uploadNhanvienuser, suaNhanvienuser
}