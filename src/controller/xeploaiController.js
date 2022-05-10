import req from 'express/lib/request';
import connectDB from '../configs/connectDB';
var format = require('date-format');

let viewXeploai = async (req, res) => {
    const [rows, fields] = await connectDB.execute('SELECT * FROM `xeploai`');
    return res.render('showxeploai.ejs', { dataXeploai: rows });
}
let editXeploai = async (req, res) => {
    let id = req.params.id;
    let [user] = await connectDB.execute('select * from xeploai where id = ?', [id]);
    return res.render('suaxeploai.ejs', { dataXeploai: user[0] });
}

let uploadXeploai = async (req, res) => {
    let { id, xeploai } = req.body;
    if (!xeploai || !id) {
        res.redirect('/quanlyxeploai');
    }
    await connectDB.execute('update xeploai set xeploai = ? where id = ?',
        [xeploai, id]);
    return res.redirect('/quanlyxeploai')
}

let addXeploai = async (req, res) => {
    let { xeploai } = req.body;
    if (!xeploai) {
        res.redirect('/quanlyxeploai');
    }
    await connectDB.execute('INSERT INTO xeploai(xeploai)  VALUES (? )',
        [xeploai]);
    return res.redirect('/quanlyxeploai')
}

module.exports = {
    viewXeploai, editXeploai, uploadXeploai, addXeploai
}