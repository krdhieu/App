import req from 'express/lib/request';
import connectDB from '../configs/connectDB';
import jwt from 'jsonwebtoken';
import res from 'express/lib/response';
import multer from 'multer';
import moment from 'moment';
import chuanhoachuoi, { chuanhoavanban } from '../services/chuanhoachuoi';

// chuyển tới trang tạo sáng kiến
let createSangkien = async (req, res) => {
    const [phongban, fields_phongban] = await connectDB.execute('SELECT * FROM phongban ');
    const [chucvu, fields_chucvu] = await connectDB.execute('SELECT * FROM chucvu ');
    return res.render('createsangkien.ejs', { dataPhongban: phongban, dataChucvu: chucvu });
}

// tải dữ liệu sáng kiến mới từ trang tạo
let addSangkien = async (req, res) => {
    let { tensangkien, muctieu, noidung, loiich, doituong, tyledonggop_1, manhanvien_2, tyledonggop_2 } = req.body;
    if (!tensangkien || !muctieu || !noidung || !loiich || !doituong) {
        return res.status(200).send('<p>Bạn nhập thiếu thông tin <a href="/create-sangkien">Trở về</a></p>');
    }
    tensangkien = chuanhoachuoi.chuanhoa(tensangkien);
    muctieu = chuanhoachuoi.chuanhoa(muctieu);
    loiich = chuanhoachuoi.chuanhoa(loiich);
    doituong = chuanhoachuoi.chuanhoa(doituong);
    let manhanvien_1;
    if (req.cookies.access_token) {
        const access_token = req.cookies.access_token.split(' ')[1];
        let payLoad = jwt.verify(access_token, process.env.JWT_ACCESS_KEY);
        manhanvien_1 = payLoad.nhanVienId;
    }
    if (manhanvien_2) {
        let [nhanvien_2] = await connectDB.execute('select count(*) as "soluong" from nhanvien where manhanvien = ?', [manhanvien_2]);
        if (nhanvien_2[0].soluong == 0) {
            return res.status(200).send('<p>Không tồn tại nhân viên <a href="/create-sangkien">Trở về</a></p>');
        }
        let [nguoithamgia_2] = await connectDB.execute('SELECT count(*) as "soluong" FROM `nguoithamgia` INNER JOIN sangkien ON nguoithamgia.masangkien=sangkien.masangkien WHERE manhanvien = ? and matrangthai = 1 or matrangthai=2;', [manhanvien_2]);
        if (nguoithamgia_2[0].soluong >= 1) {
            return res.status(200).send('<p>Đã trong 1 dự án <a href="/create-sangkien">Trở về</a></p>');
        }
    }
    let [dotsangkien] = await connectDB.execute('SELECT madotsangkien FROM dotsangkien WHERE trangthai = ?', [1]);

    if (dotsangkien[0] != null) {
        let [id_sangkien_new] = await connectDB.execute('INSERT INTO `sangkien`(`tensangkien`, `madotsangkien`, `muctieu`, `noidung`, `loiich`, `doituong`) VALUES (?,?,?,?,?,?);',
            [tensangkien, dotsangkien[0].madotsangkien, muctieu, noidung, loiich, doituong]);
        await connectDB.execute('INSERT INTO `nguoithamgia`(`manhanvien`, `masangkien`, `vaitro`, `tyledonggop`) VALUES (?,?,?,?)',
            [manhanvien_1, id_sangkien_new.insertId, 0, tyledonggop_1]);
        if (manhanvien_2) {
            await connectDB.execute('INSERT INTO `nguoithamgia`(`manhanvien`, `masangkien`, `vaitro`, `tyledonggop`) VALUES (?,?,?,?)',
                [manhanvien_2, id_sangkien_new.insertId, 1, tyledonggop_2]);
        }
        return res.send('đăng ký thành công')
    }
    return res.send('chưa tới đợt đăng ký')
}
// view sáng kiến
let viewSangkien = async (req, res) => {
    const [rows] = await connectDB.execute('SELECT * FROM `sangkien` inner join trangthaisangkien on sangkien.matrangthai = trangthaisangkien.matrangthai');
    return res.render('showsangkien.ejs', { dataSangkien: rows });
}

const upload = multer().single('profile_file');
let UploadProfileFile = async (req, res) => {
    upload(req, res, function (err) {
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an file to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        // Display uploaded image for user validation
        let filename = req.file.filename;
        console.log('>>>>>>>>>>>>> name file ', filename);
        return res.send(`gui thanh cong`);
    });
}
let detailSangkien = async (req, res) => {
    const access_token = req.cookies.access_token.split(' ')[1];
    let payLoad = jwt.verify(access_token, process.env.JWT_ACCESS_KEY);
    const [nguoithamgia] = await connectDB.execute('SELECT * FROM nguoithamgia where manhanvien = ?', [payLoad.nhanVienId]);
    if (nguoithamgia[0]) {
        const [sangkien] = await connectDB.execute('SELECT * FROM sangkien where masangkien = ?', [nguoithamgia[0].masangkien]);
        let masangkien = sangkien[0].masangkien;
        const [thanhvien] = await connectDB.execute('SELECT * FROM nguoithamgia inner join nhanvien on nguoithamgia.manhanvien = nhanvien.manhanvien where masangkien = ?', [masangkien]);
        if (thanhvien[0].vaitro == 0) {
            return res.render('chitietsangkien.ejs', { dataSangkien: sangkien[0], dataChutri: thanhvien[0], dataTroly: thanhvien[1] });
        }
        else {
            return res.render('chitietsangkien.ejs', { dataSangkien: sangkien[0], dataChutri: thanhvien[1], dataTroly: thanhvien[0] });
        }

    }
    else {
        return res.send('chua co sang kien')
    }
}
let duyetSangkien = async (req, res) => {
    let masangkien = req.params.masangkien;
    let currentDate = moment().utcOffset('+0700').format('YYYY-MM-DD');
    await connectDB.execute('update sangkien set matrangthai = ? where masangkien = ?', [2, masangkien]);
    await connectDB.execute('insert into xetduyet(manhanvien,masangkien,ngayxetduyet) values (?,?,?) ', [1, masangkien, currentDate])
    return res.redirect('/quanlysangkien');
}
let huySangkien = async (req, res) => {
    let masangkien = req.params.masangkien;
    return res.render('huySangkien.ejs', { masangkien: masangkien });
}
let huy1Sangkien = async (req, res) => {
    let { masangkien, lydotuchoi } = req.body;
    let currentDate = moment().utcOffset('+0700').format('YYYY-MM-DD');
    await connectDB.execute('update sangkien set matrangthai = ? where masangkien = ?', [4, masangkien]);
    await connectDB.execute('insert into xetduyet(manhanvien,masangkien,ngayxetduyet,lydotuchoi) values (?,?,?,?) ', [1, masangkien, currentDate, lydotuchoi])
    return res.redirect('/quanlysangkien');
}
module.exports = {
    addSangkien, createSangkien, viewSangkien, UploadProfileFile, detailSangkien, duyetSangkien, huySangkien, huy1Sangkien
}
