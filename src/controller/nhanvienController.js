import req from 'express/lib/request';
import connectDB from '../configs/connectDB';
import jwt from 'jsonwebtoken';
import chuanhoachuoi from '../services/chuanhoachuoi';

let viewNhanvien = async (req, res) => {
    let search = '';
    let { searchPhongban, searchChucvu } = req.query;
    if (req.query.search != null) {
        search = req.query.search;
    }
    const [phongban, fields_phongban] = await connectDB.execute('SELECT * FROM phongban ');
    const [chucvu, fields_chucvu] = await connectDB.execute('SELECT * FROM chucvu ');
    if (!searchPhongban && !searchChucvu) {
        const [rows, fields] = await connectDB.execute(`SELECT * FROM nhanvien 
        INNER JOIN phongban On nhanvien.maphongban = phongban.maphongban 
        INNER JOIN chucvu ON nhanvien.machucvu = chucvu.machucvu where tennhanvien LIKE ? `,
            ['%' + search + '%']);
        return res.render('shownhanvien.ejs', { dataNhanvien: rows, dataPhongban: phongban, dataChucvu: chucvu });
    }
    if (searchPhongban && searchChucvu) {
        const [rows, fields] = await connectDB.execute(`SELECT * FROM nhanvien 
        INNER JOIN phongban On nhanvien.maphongban = phongban.maphongban 
        INNER JOIN chucvu ON nhanvien.machucvu = chucvu.machucvu where nhanvien.maphongban = ? and  nhanvien.machucvu = ? and  tennhanvien LIKE ? `,
            [searchPhongban, searchChucvu, '%' + search + '%']);
        return res.render('shownhanvien.ejs', { dataNhanvien: rows, dataPhongban: phongban, dataChucvu: chucvu });
    }
    else {
        if (searchPhongban) {
            const [rows, fields] = await connectDB.execute(`SELECT * FROM nhanvien 
            INNER JOIN phongban On nhanvien.maphongban = phongban.maphongban 
            INNER JOIN chucvu ON nhanvien.machucvu = chucvu.machucvu where nhanvien.maphongban = ? and tennhanvien LIKE ? `,
                [searchPhongban, '%' + search + '%']);
            return res.render('shownhanvien.ejs', { dataNhanvien: rows, dataPhongban: phongban, dataChucvu: chucvu });
        }
        if (searchChucvu) {
            const [rows, fields] = await connectDB.execute(`SELECT * FROM nhanvien 
            INNER JOIN phongban On nhanvien.maphongban = phongban.maphongban 
            INNER JOIN chucvu ON nhanvien.machucvu = chucvu.machucvu where nhanvien.machucvu = ? and tennhanvien LIKE ? `,
                [searchChucvu, '%' + search + '%']);
            return res.render('shownhanvien.ejs', { dataNhanvien: rows, dataPhongban: phongban, dataChucvu: chucvu });
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
    let { manhanvien } = req.queryw;
    await connectDB.execute('update nhanvien set trangthai = ? where manhanvien = ?', [0, manhanvien]);
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