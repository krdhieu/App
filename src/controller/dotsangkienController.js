import req from 'express/lib/request';
import res from 'express/lib/response';
import connectDB from '../configs/connectDB';

let viewDotsangkien = async (req, res) => {
    let { alert } = req.query;
    const [rows] = await connectDB.execute('SELECT * FROM `dotsangkien`');
    return res.render('quanlydotsangkien.ejs', { dataSangkien: rows, alert: alert });
};

let addDotsangkien = async (req, res) => {
    let { tendotsangkien, ngaybatdau, ngayketthuc, ngaydungdangky, hannop } = req.body;
    if (!tendotsangkien || !ngaybatdau || !ngayketthuc || !ngaydungdangky || !hannop) {
        return res.status(200).send('vui lòng điền đủ thông tin <a href="/quanlydotsangkien">Trở về</a> ');
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
let xoaDotsangkien = async (req, res) => {
    let { madotsangkien } = req.query;
    console.log(madotsangkien);
    let [dot] = await connectDB.execute('SELECT COUNT(*) as soluong FROM `dotsangkien` INNER JOIN sangkien on dotsangkien.madotsangkien = sangkien.madotsangkien WHERE dotsangkien.madotsangkien=?', [madotsangkien])
    if (dot[0].soluong >= 1) {
        return res.redirect('/quanlydotsangkien?alert=' + encodeURIComponent('1'))
    }
    await connectDB.execute('DELETE FROM `dotsangkien` WHERE madotsangkien = ?', [madotsangkien])
    return res.redirect('/quanlydotsangkien?alert=' + encodeURIComponent('2'))
}
module.exports = {
    viewDotsangkien, addDotsangkien, suaDotsangkien, uploadDotsangkien, ketthucDotsangkien, xoaDotsangkien
}

