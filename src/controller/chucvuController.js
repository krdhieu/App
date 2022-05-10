import req from 'express/lib/request';
import connectDB from '../configs/connectDB';
var format = require('date-format');

let viewChucvu = async (req, res) => {
    const [rows, fields] = await connectDB.execute('SELECT * FROM `chucvu`');
    return res.render('showchucvu.ejs', { dataChucvu: rows });
}
let editChucvu = async (req, res) => {
    let id = req.params.id;
    let [user] = await connectDB.execute('select * from chucvu where id = ?', [id]);
    return res.render('suachucvu.ejs', { dataChucvu: user[0] });
}

let uploadChucvu = async (req, res) => {
    let { id, tenchucvu } = req.body;
    if (!tenchucvu || !id) {
        res.redirect('/quanlychucvu');
    }
    await connectDB.execute('update chucvu set tenchucvu = ? where id = ?',
        [tenchucvu, id]);
    return res.redirect('/quanlychucvu')
}

let addChucvu = async (req, res) => {
    let { tenchucvu } = req.body;
    if (!tenchucvu) {
        res.redirect('/quanlychucvu');
    }
    await connectDB.execute('INSERT INTO chucvu(tenchucvu)  VALUES (? )',
        [tenchucvu]);
    return res.redirect('/quanlychucvu')
}

module.exports = {
    viewChucvu, editChucvu, uploadChucvu, addChucvu
}