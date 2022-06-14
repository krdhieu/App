import connectDB from '../configs/connectDB';
import moment from 'moment';

let viewXeploai = async (req, res) => {
    const [rows, fields] = await connectDB.execute('SELECT * FROM `xeploai`');
    return res.render('showxeploai.ejs', { dataXeploai: rows });
};
let editXeploai = async (req, res) => {
    let maxeploai = req.params.maxeploai;
    let [user] = await connectDB.execute(
        'select * from xeploai where maxeploai = ?',
        [maxeploai]
    );
    return res.render('suaxeploai.ejs', { dataXeploai: user[0] });
};

let uploadXeploai = async (req, res) => {
    let { maxeploai, tenxeploai, motaxeploai } = req.body;
    if (!tenxeploai || !maxeploai) {
        res.redirect('/quanlyxeploai');
    }
    await connectDB.execute(
        'update xeploai set tenxeploai = ?, motaxeploai = ? where maxeploai = ?',
        [tenxeploai, motaxeploai, maxeploai]
    );
    let hientai = moment().utcOffset('+0700').format();
    await connectDB.execute('insert into hanhdongadmin(manhanvien,hanhdong,ngaygio) values (?,?,?)', [req.nhanVienId, 'Chỉnh sửa xếp loại mã: ' + maxeploai, hientai])
    return res.redirect('/quanlyxeploai');
};

// let addXeploai = async (req, res) => {
//     let { tenxeploai, motaxeploai } = req.body;
//     if (!tenxeploai) {
//         res.redirect('/quanlyxeploai');
//     }
//     await connectDB.execute('INSERT INTO xeploai(tenxeploai, motaxeploai)  VALUES (? ,? )',
//         [tenxeploai, motaxeploai]);
//     return res.redirect('/quanlyxeploai')
// }

module.exports = {
    viewXeploai,
    editXeploai,
    uploadXeploai,
};
