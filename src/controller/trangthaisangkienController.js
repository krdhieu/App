import req from 'express/lib/request';
import connectDB from '../configs/connectDB';

let viewTrangthaisangkien = async (req, res) => {
    const [rows] = await connectDB.execute('SELECT * FROM `trangthaisangkien`');
    return res.render('showtrangthaisangkien.ejs', { dataTrangthaisangkien: rows });
}
let editTrangthaisangkien = async (req, res) => {
    let matrangthai = req.params.matrangthai;
    let [user] = await connectDB.execute('select * from trangthaisangkien where matrangthai = ?', [matrangthai]);
    return res.render('suatrangthaisangkien.ejs', { dataTrangthaisangkien: user[0] });
}

let uploadTrangthaisangkien = async (req, res) => {
    let { matrangthai, tentrangthai, motatrangthai } = req.body;
    if (!tentrangthai || !matrangthai) {
        res.redirect('/quanlytrangthaisangkien');
    }
    await connectDB.execute('update trangthaisangkien set tentrangthai = ? , motatrangthai = ? where matrangthai = ?',
        [tentrangthai, motatrangthai, matrangthai]);
    return res.redirect('/quanlytrangthaisangkien')
}

// let addTrangthaisangkien = async (req, res) => {
//     let { tentrangthai, motatrangthai } = req.body;
//     if (!tentrangthai) {
//         res.redirect('/quanlytrangthaisangkien');
//     }
//     await connectDB.execute('INSERT INTO trangthaisangkien(tentrangthai,motatrangthai)  VALUES (? , ?)',
//         [tentrangthai, motatrangthai]);
//     return res.redirect('/quanlytrangthaisangkien')
// }

module.exports = {
    viewTrangthaisangkien, editTrangthaisangkien, uploadTrangthaisangkien,
    //addTrangthaisangkien
}