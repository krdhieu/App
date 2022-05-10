import req from 'express/lib/request';
import connectDB from '../configs/connectDB';
var format = require('date-format');

let viewTrangthaisangkien = async (req, res) => {
    const [rows, fields] = await connectDB.execute('SELECT * FROM `trangthaisangkien`');
    return res.render('showtrangthaisangkien.ejs', { dataTrangthaisangkien: rows });
}
let editTrangthaisangkien = async (req, res) => {
    let id = req.params.id;
    let [user] = await connectDB.execute('select * from trangthaisangkien where id = ?', [id]);
    return res.render('suatrangthaisangkien.ejs', { dataTrangthaisangkien: user[0] });
}

let uploadTrangthaisangkien = async (req, res) => {
    let { id, trangthai } = req.body;
    if (!trangthai || !id) {
        res.redirect('/quanlytrangthaisangkien');
    }
    await connectDB.execute('update trangthaisangkien set trangthai = ? where id = ?',
        [trangthai, id]);
    return res.redirect('/quanlytrangthaisangkien')
}

let addTrangthaisangkien = async (req, res) => {
    let { trangthai } = req.body;
    if (!trangthai) {
        res.redirect('/quanlytrangthaisangkien');
    }
    await connectDB.execute('INSERT INTO trangthaisangkien(trangthai)  VALUES (? )',
        [trangthai]);
    return res.redirect('/quanlytrangthaisangkien')
}

module.exports = {
    viewTrangthaisangkien, editTrangthaisangkien, uploadTrangthaisangkien, addTrangthaisangkien
}