import req from 'express/lib/request';
import connectDB from '../configs/connectDB';
var format = require('date-format');

let viewChucvuhd = async (req, res) => {
    const [rows, fields] = await connectDB.execute('SELECT * FROM `chucvuhd`');
    return res.render('showchucvuhd.ejs', { dataChucvuhd: rows });
}
let editChucvuhd = async (req, res) => {
    let id = req.params.id;
    let [user] = await connectDB.execute('select * from chucvuhd where id = ?', [id]);
    return res.render('suachucvuhd.ejs', { dataChucvuhd: user[0] });
}

let uploadChucvuhd = async (req, res) => {
    let { id, tenchucvu } = req.body;
    if (!tenchucvu || !id) {
        res.redirect('/quanlychucvuhd');
    }
    await connectDB.execute('update chucvuhd set tenchucvu = ? where id = ?',
        [tenchucvu, id]);
    return res.redirect('/quanlychucvuhd')
}

let addChucvuhd = async (req, res) => {
    let { tenchucvu } = req.body;
    if (!tenchucvu) {
        res.redirect('/quanlychucvuhd');
    }
    await connectDB.execute('INSERT INTO chucvuhd(tenchucvu)  VALUES (? )',
        [tenchucvu]);
    return res.redirect('/quanlychucvuhd')
}

module.exports = {
    viewChucvuhd, editChucvuhd, uploadChucvuhd, addChucvuhd
}