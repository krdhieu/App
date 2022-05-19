import req from 'express/lib/request';
import connectDB from '../configs/connectDB';

let viewChucvu = async (req, res) => {
    const [rows, fields] = await connectDB.execute('SELECT * FROM `chucvu`');
    return res.render('showchucvu.ejs', { dataChucvu: rows });
}
let editChucvu = async (req, res) => {
    let machucvu = req.params.machucvu;
    let [user] = await connectDB.execute('select * from chucvu where machucvu = ?', [machucvu]);
    return res.render('suachucvu.ejs', { dataChucvu: user[0] });
}

let uploadChucvu = async (req, res) => {
    let { machucvu, tenchucvu, motachucvu } = req.body;
    if (!tenchucvu || !machucvu || !motachucvu) {
        res.redirect('/quanlychucvu');
    }
    await connectDB.execute('update chucvu set tenchucvu = ? , motachucvu = ? where machucvu = ?',
        [tenchucvu, motachucvu, machucvu]);
    return res.redirect('/quanlychucvu')
}

let addChucvu = async (req, res) => {
    let { tenchucvu, motachucvu } = req.body;
    if (!tenchucvu) {
        res.redirect('/quanlychucvu');
    }
    await connectDB.execute('INSERT INTO chucvu(tenchucvu, motachucvu)  VALUES (? , ?)',
        [tenchucvu, motachucvu]);
    return res.redirect('/quanlychucvu')
}

module.exports = {
    viewChucvu, editChucvu, uploadChucvu, addChucvu
}