import req from 'express/lib/request';
import connectDB from '../configs/connectDB';
var format = require('date-format');

let viewPhongBan = async (req, res) => {
    const [rows, fields] = await connectDB.execute('SELECT * FROM `phongban`');
    return res.render('quanlyphongban.ejs', { dataPhongban: rows });
}
let editPhongBan = async (req, res) => {
    let id = req.params.id;
    let [user] = await connectDB.execute('select * from phongban where id = ?', [id]);
    //console.log(user[0].namthanhlap);
    //console.log(format.asString('dd-MM-yyyy', user[0].namthanhlap));
    //user[0].namthanhlap = format.asString('MM-dd-yyyy', user[0].namthanhlap)
    return res.render('suaphongban.ejs', { dataPhongban: user[0] });
}

let uploadPhongban = async (req, res) => {
    let { id, tenphongban, namthanhlap } = req.body;
    if (!id || !tenphongban || !namthanhlap) {
        res.redirect('/quanlyphongban');
    }
    await connectDB.execute('update phongban set tenphongban = ? , namthanhlap = ? where id = ?',
        [tenphongban, namthanhlap, id]);
    return res.redirect('/quanlyphongban')
}

let addPhongban = async (req, res) => {
    let { tenphongban, namthanhlap } = req.body;
    if (!tenphongban || !namthanhlap) {
        res.redirect('/quanlyphongban');
    }
    await connectDB.execute('INSERT INTO `phongban`(`tenphongban`, `namthanhlap`) VALUES (? , ?)',
        [tenphongban, namthanhlap]);
    return res.redirect('/quanlyphongban')
}

module.exports = {
    viewPhongBan, editPhongBan, uploadPhongban, addPhongban
}