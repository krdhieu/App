import req from 'express/lib/request';
import connectDB from '../configs/connectDB';


// chuyển tới trang tạo sáng kiến 
let createSangkien = async (req, res) => {
    const [phongban, fields_phongban] = await connectDB.execute('SELECT * FROM phongban ');
    const [chucvu, fields_chucvu] = await connectDB.execute('SELECT * FROM chucvu ');
    return res.render('createsangkien.ejs', { dataPhongban: phongban, dataChucvu: chucvu });
}

// tải dữ liệu sáng kiến mới từ trang tạo
let addSangkien = async (req, res) => {
    let { tensangkien, muctieu, noidung, loiich, doituong, manhanvien_1, tyledonggop_1, manhanvien_2, tyledonggop_2 } = req.body;
    if (!tensangkien || !muctieu || !noidung || !loiich || !doituong || !manhanvien_1) {
        res.status(200).send('<p>Bạn nhập thiếu thông tin <a href="/create-sangkien">Trở về</a></p>');
    }
    let [nhanvien] = await connectDB.execute('select count(*) as "id" from nhanvien where id = ?', [manhanvien_1]);
    if (nhanvien[0].id == 0) {
        res.status(200).send('<p>Không tồn tại nhân viên <a href="/create-sangkien">Trở về</a></p>');
    }
    let [nguoithamgia] = await connectDB.execute('SELECT count(*) as "id" FROM `nguoithamgia` INNER JOIN sangkien ON nguoithamgia.id_sangkien=sangkien.id WHERE id_nhanvien = ? and id_trangthai = 1 or id_trangthai=2;', [manhanvien_1]);
    if (nguoithamgia[0].id >= 1) {
        return res.status(200).send('<p>Đã trong 1 dự án <a href="/create-sangkien">Trở về</a></p>');
    }
    if (manhanvien_2) {
        let [nhanvien_2] = await connectDB.execute('select count(*) as "id" from nhanvien where id = ?', [manhanvien_2]);
        if (nhanvien_2[0].id == 0) {
            res.status(200).send('<p>Không tồn tại nhân viên <a href="/create-sangkien">Trở về</a></p>');
        }
        let [nguoithamgia_2] = await connectDB.execute('SELECT count(*) as "id" FROM `nguoithamgia` INNER JOIN sangkien ON nguoithamgia.id_sangkien=sangkien.id WHERE id_nhanvien = ? and id_trangthai = 1 or id_trangthai=2;', [manhanvien_2]);
        if (nguoithamgia_2[0].id >= 1) {
            res.status(200).send('<p>Đã trong 1 dự án <a href="/create-sangkien">Trở về</a></p>');
        }
    }
    let [dotsangkien] = await connectDB.execute('SELECT id FROM dotsangkien WHERE trangthai = ?', [1]);
    if (dotsangkien[0] != null) {
        let [id_sangkien_new] = await connectDB.execute('INSERT INTO `sangkien`(`tensangkien`, `id_dot`, `muctieu`, `noidung`, `loiich`, `doituong`) VALUES (?,?,?,?,?,?);',
            [tensangkien, dotsangkien[0].id, muctieu, noidung, loiich, doituong]);
        await connectDB.execute('INSERT INTO `nguoithamgia`(`id_nhanvien`, `id_sangkien`, `vaitro`, `tyledonggop`) VALUES (?,?,?,?)',
            [manhanvien_1, id_sangkien_new.insertId, 0, tyledonggop_1]);
        if (manhanvien_2) {
            await connectDB.execute('INSERT INTO `nguoithamgia`(`id_nhanvien`, `id_sangkien`, `vaitro`, `tyledonggop`) VALUES (?,?,?,?)',
                [manhanvien_2, id_sangkien_new.insertId, 1, tyledonggop_2]);
        }
        return res.send('đăng ký thành công')
    }
    return res.send('chưa tới đợt đăng ký')
}
// view sáng kiến
let viewSangkien = async (req, res) => {
    const [rows] = await connectDB.execute('SELECT * FROM `sangkien`');
    return res.render('showsangkien.ejs', { dataSangkien: rows });
}

module.exports = {
    addSangkien, createSangkien, viewSangkien
}