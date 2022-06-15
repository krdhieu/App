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
    let { maxeploai, tenxeploai, mucthuong, motaxeploai } = req.body;
    if (!tenxeploai || !maxeploai) {
        return res.redirect('/quanlyxeploai');
    }
    if (mucthuong <= 0) {
        return res.redirect('/quanlyxeploai');
    }
    await connectDB.execute(
        'update xeploai set tenxeploai = ?,mucthuong=?, motaxeploai = ? where maxeploai = ?',
        [tenxeploai, mucthuong, motaxeploai, maxeploai]
    );
    let hientai = moment().utcOffset('+0700').format();
    await connectDB.execute(
        'insert into lichsuhanhdong(manhanvien,hanhdong,ngaygio) values (?,?,?)',
        [req.nhanVienId, 'Chỉnh sửa xếp loại mã: ' + maxeploai, hientai]
    );
    return res.redirect('/quanlyxeploai');
};

module.exports = {
    viewXeploai,
    editXeploai,
    uploadXeploai,
};
