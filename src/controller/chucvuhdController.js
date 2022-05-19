import connectDB from '../configs/connectDB';

let viewChucvuhd = async (req, res) => {
    const [rows, fields] = await connectDB.execute('SELECT * FROM `chucvuhd`');
    return res.render('showchucvuhd.ejs', { dataChucvuhd: rows });
};

let editChucvuhd = async (req, res) => {
    let machucvuhd = req.params.machucvuhd;
    let [user] = await connectDB.execute(
        'select * from chucvuhd where machucvuhd = ?',
        [machucvuhd]
    );
    return res.render('suachucvuhd.ejs', { dataChucvuhd: user[0] });
};

let uploadChucvuhd = async (req, res) => {
    let { machucvuhd, tenchucvuhd, motachucvuhd } = req.body;
    if (!tenchucvuhd || !machucvuhd) {
        res.redirect('/quanlychucvuhd');
    }
    await connectDB.execute(
        'update chucvuhd set tenchucvuhd = ? , motachucvuhd = ? where machucvuhd = ?',
        [tenchucvuhd, motachucvuhd, machucvuhd]
    );
    return res.redirect('/quanlychucvuhd');
};

let addChucvuhd = async (req, res) => {
    let { tenchucvu, motachucvuhd } = req.body;
    if (!tenchucvu) {
        res.redirect('/quanlychucvuhd');
    }
    await connectDB.execute(
        'INSERT INTO chucvuhd(tenchucvuhd, motachucvuhd)  VALUES (? , ? )',
        [tenchucvu, motachucvuhd]
    );
    return res.redirect('/quanlychucvuhd');
};

module.exports = {
    viewChucvuhd,
    editChucvuhd,
    uploadChucvuhd,
    addChucvuhd,
};
