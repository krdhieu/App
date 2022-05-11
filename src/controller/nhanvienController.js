import req from 'express/lib/request';
import connectDB from '../configs/connectDB';
var format = require('date-format');

let viewNhanvien = async (req, res) => {
    const [phongban, fields_phongban] = await connectDB.execute('SELECT * FROM phongban ');
    const [chucvu, fields_chucvu] = await connectDB.execute('SELECT * FROM chucvu ');
    const [rows, fields] = await connectDB.execute('SELECT * FROM `nhanvien` INNER JOIN phongban On nhanvien.id_phongban = phongban.id INNER JOIN chucvu ON nhanvien.id_chucvu=chucvu.id ');
    return res.render('shownhanvien.ejs', { dataNhanvien: rows, dataPhongban: phongban, dataChucvu: chucvu });
}
let editNhanvien = async (req, res) => {
    let id = req.params.id;
    let [user] = await connectDB.execute('SELECT * FROM `nhanvien` where nhanvien.id = ?', [id]);
    const [phongban, fields_phongban] = await connectDB.execute('SELECT * FROM phongban ');
    const [chucvu, fields_chucvu] = await connectDB.execute('SELECT * FROM chucvu ');
    return res.render('suanhanvien.ejs', { dataNhanvien: user[0], dataPhongban: phongban, dataChucvu: chucvu });
}

let uploadNhanvien = async (req, res) => {
    let { id, id_phongban, id_chucvu, trinhdohocvan, tennhanvien, gioitinh, namsinh, ngayvaolam, sdt } = req.body;
    if (!id || !id_phongban || !id_chucvu || !trinhdohocvan || !tennhanvien || !gioitinh || !namsinh || !ngayvaolam || !sdt) {
        res.redirect('/quanlynhanvien');
    }
    await connectDB.execute('update nhanvien set id_phongban = ?, id_chucvu =? , trinhdohocvan = ?,tennhanvien = ?,gioitinh = ?,namsinh = ?,ngayvaolam = ?,sdt = ? where id = ?',
        [id_phongban, id_chucvu, trinhdohocvan, tennhanvien, gioitinh, namsinh, ngayvaolam, sdt, id]);
    return res.redirect('/quanlynhanvien')
}

let addNhanvien = async (req, res) => {
    let { id_phongban, id_chucvu, trinhdohocvan, tennhanvien, gioitinh, namsinh, ngayvaolam, sdt } = req.body;
    if (!id_phongban || !id_chucvu || !trinhdohocvan || !tennhanvien || !gioitinh || !namsinh || !ngayvaolam || !sdt) {
        res.redirect('/quanlynhanvien');
    }
    await connectDB.execute('INSERT INTO nhanvien(id_phongban, id_chucvu, trinhdohocvan, tennhanvien, gioitinh, namsinh, ngayvaolam, sdt)  VALUES (?,?,?,?,?,?,?,? )',
        [id_phongban, id_chucvu, trinhdohocvan, tennhanvien, gioitinh, namsinh, ngayvaolam, sdt]);
    return res.redirect('/quanlynhanvien')
}

module.exports = {
    viewNhanvien, editNhanvien, uploadNhanvien, addNhanvien
}