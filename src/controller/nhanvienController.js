import req from 'express/lib/request';
import connectDB from '../configs/connectDB';
import jwt from 'jsonwebtoken';
import chuanhoachuoi from '../services/chuanhoachuoi';
import moment from 'moment';

let viewNhanvien = async (req, res) => {
    let search = '';
    let { searchPhongban, searchChucvu } = req.query;
    let { alert } = req.query;
    if (req.query.search != null) {
        search = req.query.search;
    }
    const [phongban, fields_phongban] = await connectDB.execute('SELECT * FROM phongban ');
    const [chekgiamdoc] = await connectDB.execute('SELECT count(*) as soluong from nhanvien where machucvu = 1');
    const [chekphogiamdoc] = await connectDB.execute('SELECT count(*) as soluong from nhanvien where machucvu = 2');
    const [chucvu] = await connectDB.execute('SELECT * FROM chucvu');
    if (!searchPhongban && !searchChucvu) {
        const [rows, fields] = await connectDB.execute(`SELECT * FROM nhanvien 
        INNER JOIN phongban On nhanvien.maphongban = phongban.maphongban 
        INNER JOIN chucvu ON nhanvien.machucvu = chucvu.machucvu where tennhanvien LIKE ? `,
            ['%' + search + '%']);
        return res.render('shownhanvien.ejs', { dataNhanvien: rows, dataPhongban: phongban, dataChucvu: chucvu, alert: alert, chekgiamdoc: chekgiamdoc[0], chekphogiamdoc: chekphogiamdoc[0] });
    }
    if (searchPhongban && searchChucvu) {
        const [rows, fields] = await connectDB.execute(`SELECT * FROM nhanvien 
        INNER JOIN phongban On nhanvien.maphongban = phongban.maphongban 
        INNER JOIN chucvu ON nhanvien.machucvu = chucvu.machucvu where nhanvien.maphongban = ? and  nhanvien.machucvu = ? and  tennhanvien LIKE ? `,
            [searchPhongban, searchChucvu, '%' + search + '%']);
        return res.render('shownhanvien.ejs', { dataNhanvien: rows, dataPhongban: phongban, dataChucvu: chucvu, alert: alert, chekgiamdoc: chekgiamdoc[0], chekphogiamdoc: chekphogiamdoc[0] });
    }
    else {
        if (searchPhongban) {
            const [rows, fields] = await connectDB.execute(`SELECT * FROM nhanvien 
            INNER JOIN phongban On nhanvien.maphongban = phongban.maphongban 
            INNER JOIN chucvu ON nhanvien.machucvu = chucvu.machucvu where nhanvien.maphongban = ? and tennhanvien LIKE ? `,
                [searchPhongban, '%' + search + '%']);
            return res.render('shownhanvien.ejs', { dataNhanvien: rows, dataPhongban: phongban, dataChucvu: chucvu, alert: alert, chekgiamdoc: chekgiamdoc[0], chekphogiamdoc: chekphogiamdoc[0] });
        }
        if (searchChucvu) {
            const [rows, fields] = await connectDB.execute(`SELECT * FROM nhanvien 
            INNER JOIN phongban On nhanvien.maphongban = phongban.maphongban 
            INNER JOIN chucvu ON nhanvien.machucvu = chucvu.machucvu where nhanvien.machucvu = ? and tennhanvien LIKE ? `,
                [searchChucvu, '%' + search + '%']);
            return res.render('shownhanvien.ejs', { dataNhanvien: rows, dataPhongban: phongban, dataChucvu: chucvu, alert: alert, chekgiamdoc: chekgiamdoc[0], chekphogiamdoc: chekphogiamdoc[0] });
        }
    }

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
    let checkngaysinh = moment(ngaysinh).format('YYYYMMDD');
    let checkngayvaolam = moment(ngayvaolam).format('YYYYMMDD');
    if (checkngayvaolam - checkngaysinh < 180000) {
        return res.redirect('/quanlynhanvien?alert=' + encodeURIComponent('2'));
    }
    for (let i = 0; i < sdt.length; i++) {
        if (sdt[i] >= '0' && sdt[i] <= '9') {
        }
        else {
            return res.redirect('/quanlynhanvien?alert=' + encodeURIComponent('1'));
            //return res.status(200).send('<p>sai dinh dang dien thoai <a href="/quanlynhanvien">Trở về</a></p>');
        }
    }
    await connectDB.execute('INSERT INTO nhanvien(maphongban, machucvu, trinhdohocvan, tennhanvien, gioitinh, ngaysinh, ngayvaolam, sdt)  VALUES (?,?,?,?,?,?,?,? )',
        [maphongban, machucvu, trinhdohocvan, tennhanvien, gioitinh, ngaysinh, ngayvaolam, sdt]);
    return res.redirect('/quanlynhanvien?alert=' + encodeURIComponent('3'));
}
let nghiviecNhanvien = async (req, res) => {
    let { manhanvien } = req.query;
    await connectDB.execute('update nhanvien set trangthai = ? where manhanvien = ?', [0, manhanvien]);
    await connectDB.execute('update taikhoan set maquyen = ? where manhanvien = ?', [5, manhanvien]);
    return res.redirect('/quanlynhanvien');
}

let thongtinNhanvien = async (req, res) => {
    let { manhanvien } = req.query;
    if (manhanvien) {
        const [nhanvien] = await connectDB.execute('SELECT * FROM nhanvien where manhanvien = ?', [manhanvien]);
        res.render('thongtincanhan.ejs', { dataNhanvien: nhanvien[0] });
    }
    const [nhanvien] = await connectDB.execute('SELECT * FROM nhanvien where manhanvien = ?', [req.nhanVienId]);
    res.render('thongtincanhan.ejs', { dataNhanvien: nhanvien[0] });
}
let uploadNhanvienuser = async (req, res) => {
    let { manhanvien, tennhanvien, gioitinh, ngaysinh, ngayvaolam, sdt } = req.body;
    if (!manhanvien || !tennhanvien || !gioitinh || !ngaysinh || !ngayvaolam || !sdt) {
        res.redirect('/quanlynhanvien');
    }
    for (let i = 0; i < sdt.length; i++) {
        if (sdt[i] >= '0' && sdt[i] <= '9') {
        }
        else {
            return res.status(200).send('<p>sai dinh dang dien thoai <a href="/quanlynhanvien">Trở về</a></p>');
        }
    }
    tennhanvien = chuanhoachuoi.chuanhoaten(tennhanvien)
    await connectDB.execute('update nhanvien set  tennhanvien = ?,gioitinh = ?,ngaysinh = ?,ngayvaolam = ?,sdt = ? where manhanvien = ?',
        [tennhanvien, gioitinh, ngaysinh, ngayvaolam, sdt, manhanvien]);
    return res.redirect('/thongtincanhan')
}
let suaNhanvienuser = async (req, res) => {
    const [nhanvien] = await connectDB.execute('SELECT * FROM nhanvien where manhanvien = ?', [req.nhanVienId]);
    res.render('suanhanvien-user.ejs', { dataNhanvien: nhanvien[0] });
}

module.exports = {
    viewNhanvien, editNhanvien, uploadNhanvien, addNhanvien, nghiviecNhanvien, thongtinNhanvien, uploadNhanvienuser, suaNhanvienuser
}