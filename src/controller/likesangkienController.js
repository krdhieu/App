import connectDB from '../configs/connectDB';

let viewlikeSangkien = async (req, res) => {
    const [dot] = await connectDB.execute(`select * from dotsangkien where madotsangkien = (select max(madotsangkien) from dotsangkien) `)
    const [sangkien] = await connectDB.execute(`select sangkien.*, count(viewlike.manhanvien) as soluong from sangkien  
    left join viewlike on sangkien.masangkien = viewlike.masangkien 
    where madotsangkien = (select max(madotsangkien) from dotsangkien)
    GROUP by sangkien.masangkien`);
    // const [sangkien] = await connectDB.execute(`select sangkien.*, count(viewlike.manhanvien) as soluong from sangkien  
    // left join viewlike on sangkien.masangkien = viewlike.masangkien 
    // where madotsangkien = (select max(madotsangkien) from dotsangkien)`);
    return res.render('viewlikesangkien.ejs', { dataSangkien: sangkien, dotSangkien: dot[0] })
}
let addlikeSangkien = async (req, res) => {
    let { masangkien } = req.body;
    console.log(req.body)
    const [check] = await connectDB.execute(`select count(*) as soluong from viewlike where masangkien=? and manhanvien=?`, [masangkien, req.nhanVienId])
    if (check.soluong !== 0) {
        await connectDB.execute('insert into viewlike(masangkien,manhanvien) values (?,?)', [masangkien, req.nhanVienId]);
    }
    return res.redirect('/viewlikesangkien');
}
module.exports = {
    viewlikeSangkien, addlikeSangkien
}