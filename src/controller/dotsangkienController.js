import req from 'express/lib/request';
import res from 'express/lib/response';
import connectDB from '../configs/connectDB';

let viewDotsangkien = async (req, res) => {
    const [rows] = await connectDB.execute('SELECT * FROM `dotsangkien`');
    return res.render('quanlydotsangkien.ejs', { dataSangkien: rows });
}

let addDotsangkien = async (req, res) => {
    let { tendotsangkien, ngaybatdau, ngayketthuc, ngaydungdangky, hannop } = req.body;
    if (!tendotsangkien || !ngaybatdau || !ngayketthuc || !ngaydungdangky || !hannop) {
        res.status(200).send('vui lòng điền đủ thông tin');
    }
    await connectDB.execute('INSERT INTO `dotsangkien`(tendotsangkien, ngaybatdau,ngayketthuc,ngaydungdangky,hannop) VALUES (? ,?, ? ,? ,?)',
        [tendotsangkien, ngaybatdau, ngayketthuc, ngaydungdangky, hannop]);
    return res.redirect('/quanlydotsangkien')
}
let suaDotsangkien = async (req, res) => {
    let [dotsangkien] = await connectDB.execute('SELECT * FROM `dotsangkien` where trangthai = 1');
    return res.render('suadotsangkien.ejs', { dataDotsangkien: dotsangkien[0] });
}
let uploadDotsangkien = async (req, res) => {
    let { madotsangkien, tendotsangkien, ngaybatdau, ngayketthuc, ngaydungdangky, hannop } = req.body;
    await connectDB.execute('update dotsangkien set tendotsangkien = ? , ngaybatdau = ? , ngayketthuc = ? , ngaydungdangky = ?, hannop = ? where madotsangkien = ?',
        [tendotsangkien, ngaybatdau, ngayketthuc, ngaydungdangky, hannop, madotsangkien]);
    return res.redirect('/quanlydotsangkien');
}
let ketthucDotsangkien = async (req, res) => {
    await connectDB.execute('update dotsangkien set trangthai = ? where trangthai = ?',
        [0, 1]);
    return res.redirect('/quanlydotsangkien');
}
module.exports = {
    viewDotsangkien, addDotsangkien, suaDotsangkien, uploadDotsangkien, ketthucDotsangkien
}