import req from 'express/lib/request';
import connectDB from '../configs/connectDB';

let viewPhongBan = async (req, res) => {
    const [rows, fields] = await connectDB.execute('SELECT * FROM `phongban`');
    return res.render('quanlyphongban.ejs', { dataPhongban: rows });
};
let editPhongBan = async (req, res) => {
    let maphongban = req.params.maphongban;
    let [user] = await connectDB.execute(
        'select * from phongban where maphongban = ?',
        [maphongban]
    );
    return res.render('suaphongban.ejs', { dataPhongban: user[0] });
};

let uploadPhongban = async (req, res) => {
    let { maphongban, tenphongban, namthanhlap, motaphongban } = req.body;
    if (!maphongban || !tenphongban || !namthanhlap) {
        res.redirect('/quanlyphongban');
    }
    await connectDB.execute(
        'update phongban set tenphongban = ? , ngaythanhlap = ? , motaphongban = ? where maphongban = ?',
        [tenphongban, namthanhlap, motaphongban, maphongban]
    );
    return res.redirect('/quanlyphongban');
};

let addPhongban = async (req, res) => {
    let { tenphongban, ngaythanhlap, motaphongban } = req.body;
    if (!tenphongban || !ngaythanhlap) {
        res.redirect('/quanlyphongban');
    }
    await connectDB.execute(
        'INSERT INTO phongban (tenphongban, ngaythanhlap, motaphongban) VALUES (? , ?, ?)',
        [tenphongban, ngaythanhlap, motaphongban]
    );
    return res.redirect('/quanlyphongban');
};

module.exports = {
    viewPhongBan,
    editPhongBan,
    uploadPhongban,
    addPhongban,
};
