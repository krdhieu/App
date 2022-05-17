import connectDB from '../configs/connectDB';

let viewDotsangkien = async (req, res) => {
    const [rows, fields] = await connectDB.execute(
        'SELECT * FROM `dotsangkien`'
    );
    return res.render('quanlydotsangkien.ejs', { dataSangkien: rows });
};

let addDotsangkien = async (req, res) => {
    let { ten, dot, ngaybatdau, ngayketthuc, hannop } = req.body;
    if (!ten || !dot || !ngaybatdau || !ngayketthuc || !hannop) {
        res.status(200).send('vui lòng điền đủ thông tin');
    }
    await connectDB.execute(
        'INSERT INTO `dotsangkien`(ten, dot, ngaybatdau,ngayketthuc,hannop) VALUES (? , ? , ? ,? ,?)',
        [ten, dot, ngaybatdau, ngayketthuc, hannop]
    );
    return res.redirect('/quanlydotsangkien');
};

module.exports = {
    viewDotsangkien,
    addDotsangkien,
};
