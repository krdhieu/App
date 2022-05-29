import req from 'express/lib/request';
import connectDB from '../configs/connectDB';
import sangKienService from '../services/sangKienService';
import diemTrungBinhService from '../services/diemTrungBinhService';
import xepLoaiService from '../services/xepLoaiService';
import chamDiemService from '../services/chamDiemService';
import jwt from 'jsonwebtoken';
import res, { redirect } from 'express/lib/response';
import multer from 'multer';
import moment from 'moment';
import chuanhoachuoi, { chuanhoavanban } from '../services/chuanhoachuoi';

// chuyển tới trang tạo sáng kiến
let createSangkien = async (req, res) => {
    const [dot] = await connectDB.execute(
        `select ngaybatdau,ngaydungdangky from dotsangkien where trangthai = ?`,
        [1]
    );
    if (dot.length === 0) {
        return res.redirect('/home?alert=' + encodeURIComponent('4'));
    }
    const [checknguoithamgia] = await connectDB.execute(
        `select count(*) as soluong from nguoithamgia 
        inner join sangkien on nguoithamgia.masangkien = sangkien.masangkien 
        where manhanvien = ? and (matrangthai =? or matrangthai =?)`,
        [req.nhanVienId, 1, 2]
    );
    if (checknguoithamgia[0].soluong !== 0) {
        return res.redirect('/chitietsangkien');
    }
    let { alert } = req.query;
    let { manhanvien } = req.query;
    let [nhanvien] = [];
    if (manhanvien) {
        [nhanvien] = await connectDB.execute(
            `Select * from nhanvien
        inner join phongban on nhanvien.maphongban = phongban.maphongban
        inner join chucvu on nhanvien.machucvu = chucvu.machucvu
        where manhanvien = ?`,
            [manhanvien]
        );
    }
    const [phongban] = await connectDB.execute('SELECT * FROM phongban ');
    const [chucvu] = await connectDB.execute('SELECT * FROM chucvu ');
    let ngaybatdau = moment(dot[0].ngaybatdau).format('YYYYMMDD');
    let ngaydungdangky = moment(dot[0].ngaydungdangky).format('YYYYMMDD');
    let hientai = moment().utcOffset('+0700').format('YYYYMMDD');
    //let hientai = moment('2022-03-20').format('YYYYMMDD'); // test
    if (hientai <= ngaydungdangky && hientai >= ngaybatdau) {
        if (manhanvien) {
            if (nhanvien.length == 1) {
                return res.render('createsangkien.ejs', {
                    dataPhongban: phongban,
                    dataChucvu: chucvu,
                    alert: alert,
                    dataNhanvien: nhanvien,
                });
            }
            return res.render('createsangkien.ejs', {
                dataPhongban: phongban,
                dataChucvu: chucvu,
                alert: alert,
                dataNhanvien: null,
            });
        }
        return res.render('createsangkien.ejs', {
            dataPhongban: phongban,
            dataChucvu: chucvu,
            alert: alert,
            dataNhanvien: null,
        });
    } else {
        return res.redirect('/home?alert=' + encodeURIComponent('4'));
    }
};

// tải dữ liệu sáng kiến mới từ trang tạo
let addSangkien = async (req, res) => {
    let { tensangkien, muctieu, noidung, loiich, doituong, manhanvien_2 } =
        req.body;
    tensangkien = chuanhoachuoi.chuanhoa(tensangkien);
    muctieu = chuanhoachuoi.chuanhoa(muctieu);
    loiich = chuanhoachuoi.chuanhoa(loiich);
    doituong = chuanhoachuoi.chuanhoa(doituong);
    let manhanvien_1 = req.nhanVienId;
    if (manhanvien_2) {
        let [nguoithamgia_2] = await connectDB.execute(
            'SELECT count(*) as "soluong" FROM `nguoithamgia` INNER JOIN sangkien ON nguoithamgia.masangkien=sangkien.masangkien WHERE manhanvien = ? and (matrangthai = 1 or matrangthai=2);',
            [manhanvien_2]
        );
        let [checkhoidong] = await connectDB.execute(
            'SELECT count(*) as "soluong" FROM thanhvienhoidong WHERE manhanvien = ? and mahoidong = (select max(mahoidong) from hoidongkhoahoc)',
            [manhanvien_2]
        );
        if (nguoithamgia_2[0].soluong >= 1 || checkhoidong[0].soluong >= 1) {
            return res.redirect(
                '/create-sangkien?alert=' + encodeURIComponent('2')
            );
            return res
                .status(200)
                .send(
                    '<p>Đã trong 1 dự án <a href="/create-sangkien">Trở về</a></p>'
                );
        }
    }
    let [dotsangkien] = await connectDB.execute(
        'SELECT madotsangkien FROM dotsangkien WHERE trangthai = ?',
        [1]
    );

    if (dotsangkien[0] != null) {
        let [id_sangkien_new] = await connectDB.execute(
            'INSERT INTO `sangkien`(`tensangkien`, `madotsangkien`, `muctieu`, `noidung`, `loiich`, `doituong`) VALUES (?,?,?,?,?,?);',
            [
                tensangkien,
                dotsangkien[0].madotsangkien,
                muctieu,
                noidung,
                loiich,
                doituong,
            ]
        );
        await connectDB.execute(
            'INSERT INTO `nguoithamgia`(`manhanvien`, `masangkien`, `vaitro`) VALUES (?,?,?)',
            [manhanvien_1, id_sangkien_new.insertId, 0]
        );
        if (manhanvien_2) {
            await connectDB.execute(
                'INSERT INTO `nguoithamgia`(`manhanvien`, `masangkien`, `vaitro`) VALUES (?,?,?)',
                [manhanvien_2, id_sangkien_new.insertId, 1]
            );
        }
        return res.redirect('/home?alert=' + encodeURIComponent('3'));
    }
    return res.redirect('/home?alert=' + encodeURIComponent('4'));
};
// view sáng kiến
let viewSangkien = async (req, res) => {
    const [dotsangkien1] = await connectDB.execute(
        `select * from dotsangkien where madotsangkien = (SELECT max(madotsangkien) FROM dotsangkien)`
    );
    let madotsangkien = dotsangkien1[0].madotsangkien;
    let matrangthai = 2;
    const [datadotsangkien] = await connectDB.execute(
        `select * from dotsangkien`
    );
    const [datatrangthai] = await connectDB.execute(
        `select * from trangthaisangkien`
    );
    let { dotsangkien, trangthai } = req.query;
    if (dotsangkien) {
        if (dotsangkien != '') {
            madotsangkien = dotsangkien;
        }
    }
    if (trangthai) {
        matrangthai = trangthai;
    } else {
        const [rows] = await connectDB.execute(
            `SELECT * FROM sangkien 
        inner join trangthaisangkien on sangkien.matrangthai = trangthaisangkien.matrangthai
        inner join dotsangkien on sangkien.madotsangkien = dotsangkien.madotsangkien 
        where sangkien.madotsangkien = ?`,
            [madotsangkien]
        );
        return res.render('showsangkien.ejs', {
            dataSangkien: rows,
            dataDotsangkien: datadotsangkien,
            dataTrangthai: datatrangthai,
        });
    }
    const [rows] = await connectDB.execute(
        `SELECT sangkien.* , trangthaisangkien.* , dotsangkien.* , xetduyet.manhanvien, xetduyet.ngayxetduyet, xetduyet.lydotuchoi FROM sangkien 
        inner join trangthaisangkien on sangkien.matrangthai = trangthaisangkien.matrangthai
        inner join dotsangkien on sangkien.madotsangkien = dotsangkien.madotsangkien 
        LEFT JOIN xetduyet on sangkien.masangkien = xetduyet.masangkien
        where sangkien.madotsangkien = ? and sangkien.matrangthai=?`,
        [madotsangkien, matrangthai]
    );
    return res.render('showsangkien.ejs', {
        dataSangkien: rows,
        dataDotsangkien: datadotsangkien,
        dataTrangthai: datatrangthai,
    });
};
// quan ly duyet
let quanlyduyetSangkien = async (req, res) => {
    const [phong] = await connectDB.execute(
        'select maphongban from nhanvien where manhanvien = ?',
        [req.nhanVienId]
    );
    console.log(phong);
    const [rows] = await connectDB.execute(
        `
    SELECT sangkien.masangkien, tensangkien,muctieu, noidung, loiich , doituong , tentrangthai , sangkien.matrangthai FROM sangkien 
    inner join trangthaisangkien on sangkien.matrangthai = trangthaisangkien.matrangthai 
    inner join nguoithamgia on sangkien.masangkien = nguoithamgia.masangkien 
    inner join nhanvien on nhanvien.manhanvien = nguoithamgia.manhanvien 
    where vaitro=? and sangkien.matrangthai = ? and maphongban=?`,
        [0, 1, phong[0].maphongban]
    );
    return res.render('quanlyduyetsangkien.ejs', { dataSangkien: rows });
};

const upload = multer().single('profile_file');
let UploadProfileFile = async (req, res) => {
    const [dot] = await connectDB.execute(
        `select hannop from dotsangkien where trangthai = ?`,
        [1]
    );
    let hannop = moment(dot[0].hannop).format('YYYYMMDD');
    let hientai = moment().utcOffset('+0700').format('YYYYMMDD');
    //let hientai = moment('2022-03-20').format('YYYYMMDD'); // test
    console.log('hientai: ' + hientai + ' ngay dung: ' + hannop);
    console.log(hientai >= hannop);
    if (hientai <= hannop) {
        upload(req, res, async function (err) {
            if (req.fileValidationError) {
                return res.send(req.fileValidationError);
            } else if (!req.file) {
                return res.send('Please select an file to upload');
            } else if (err instanceof multer.MulterError) {
                return res.send(err);
            } else if (err) {
                return res.send(err);
            }
            let filename = req.file.filename;

            await connectDB.execute(`update sangkien set dinhkem = ?`, [
                filename,
            ]);
            // Display uploaded image for user validation
            return res.send(
                `Gửi thành công <a href="/chitietsangkien">Ấn đây để trở về</a>`
            );
            // console.log('>>>>>>>>>>>>> name file ', filename);
        });
    } else {
        return res.send(
            '<p style= "font-size: 24px">Đã quá hạn nộp</p><a href="/home">Trở về</a> '
        );
    }
};
let detailSangkien = async (req, res) => {
    const [nguoithamgia] = await connectDB.execute(
        'SELECT * FROM nguoithamgia where manhanvien = ?',
        [req.nhanVienId]
    );
    if (nguoithamgia[0]) {
        const [sangkien] = await connectDB.execute(
            'SELECT * FROM sangkien where masangkien = ? and matrangthai=?',
            [nguoithamgia[0].masangkien, 2]
        );
        if (sangkien[0]) {
            let masangkien = sangkien[0].masangkien;
            const [thanhvien] = await connectDB.execute(
                'SELECT * FROM nguoithamgia inner join nhanvien on nguoithamgia.manhanvien = nhanvien.manhanvien where masangkien = ?',
                [masangkien]
            );
            if (thanhvien[0].vaitro == 0) {
                return res.render('chitietsangkien.ejs', {
                    dataSangkien: sangkien[0],
                    dataChutri: thanhvien[0],
                    dataTroly: thanhvien[1],
                });
            } else {
                return res.render('chitietsangkien.ejs', {
                    dataSangkien: sangkien[0],
                    dataChutri: thanhvien[1],
                    dataTroly: thanhvien[0],
                });
            }
        } else {
            return res.redirect('/home?alert=' + encodeURIComponent('5'));
        }
    } else {
        return res.redirect('/home?alert=' + encodeURIComponent('5'));
    }
};
let chitietSangkien = async (req, res) => {
    let masangkien = req.query.masangkien;
    const [sangkien] = await connectDB.execute(
        'SELECT * FROM sangkien where masangkien = ?',
        [req.query.masangkien]
    );
    let thongTinSangKien = [];
    let sangKien =
        await sangKienService.getSangKienDangThucHienLeftJoinDanhGiaByMaSangKien(
            masangkien
        );

    let diem = await diemTrungBinhService.getDiemByMaSangKien(masangkien);
    thongTinSangKien.push({
        sangKien: sangKien[0],
        diem: diem[0],
    });

    let allChiTietDiem = await chamDiemService.getAllChiTietDiemOfSangKien(
        masangkien
    );
    if (sangkien[0]) {
        const [thanhvien] = await connectDB.execute(
            'SELECT * FROM nguoithamgia inner join nhanvien on nguoithamgia.manhanvien = nhanvien.manhanvien where masangkien = ?',
            [sangkien[0].masangkien]
        );
        if (thanhvien[0].vaitro == 0) {
            return res.render('detail-sangkien.ejs', {
                dataSangkien: sangkien[0],
                dataChutri: thanhvien[0],
                dataTroly: thanhvien[1],
                thongTinSangKien: thongTinSangKien[0],
                allChiTietDiem,
            });
        } else {
            return res.render('detail-sangkien.ejs', {
                dataSangkien: sangkien[0],
                dataChutri: thanhvien[1],
                dataTroly: thanhvien[0],
                thongTinSangKien: thongTinSangKien[0],
                allChiTietDiem,
            });
        }
    } else {
        return res.redirect('/home?alert=' + encodeURIComponent('5'));
    }
};
let duyetSangkien = async (req, res) => {
    let masangkien = req.params.masangkien;
    let currentDate = moment().utcOffset('+0700').format('YYYY-MM-DD');

    await connectDB.execute(
        'update sangkien set matrangthai = ? where masangkien = ?',
        [2, masangkien]
    );
    await connectDB.execute(
        'insert into xetduyet(manhanvien,masangkien,ngayxetduyet) values (?,?,?) ',
        [req.nhanVienId, masangkien, currentDate]
    );
    if (req.roleId === 1) {
        return res.redirect('/quanlysangkien');
    } else {
        return res.redirect('/quanlyduyetsangkien');
    }
};

let chitietduyetSangkien = async (req, res) => {
    let masangkien = req.query.masangkien;
    const [sangkien] = await connectDB.execute(
        'SELECT * FROM sangkien where masangkien = ?',
        [req.query.masangkien]
    );

    if (sangkien[0]) {
        const [thanhvien] = await connectDB.execute(
            'SELECT * FROM nguoithamgia inner join nhanvien on nguoithamgia.manhanvien = nhanvien.manhanvien where masangkien = ?',
            [sangkien[0].masangkien]
        );
        if (thanhvien[0].vaitro == 0) {
            return res.render('chitietsangkienduyet.ejs', {
                dataSangkien: sangkien[0],
                dataChutri: thanhvien[0],
                dataTroly: thanhvien[1],
            });
        } else {
            return res.render('chitietsangkienduyet.ejs', {
                dataSangkien: sangkien[0],
                dataChutri: thanhvien[1],
                dataTroly: thanhvien[0],
            });
        }
    }
};
let huySangkien = async (req, res) => {
    let masangkien = req.params.masangkien;
    return res.render('huySangkien.ejs', { masangkien: masangkien });
};
let huy1Sangkien = async (req, res) => {
    let { masangkien, lydotuchoi } = req.body;
    let currentDate = moment().utcOffset('+0700').format('YYYY-MM-DD');

    await connectDB.execute(
        'update sangkien set matrangthai = ? where masangkien = ?',
        [4, masangkien]
    );
    await connectDB.execute(
        'insert into xetduyet(manhanvien,masangkien,ngayxetduyet,lydotuchoi) values (?,?,?,?) ',
        [req.nhanVienId, masangkien, currentDate, lydotuchoi]
    );

    return res.redirect('/quanlyduyetsangkien');
};
let history = async (req, res) => {
<<<<<<< HEAD
    const [sangkien] = await connectDB.execute(`select sangkien.* , trangthaisangkien.* , dotsangkien.* , xetduyet.manhanvien, xetduyet.ngayxetduyet, xetduyet.lydotuchoi from sangkien 
        inner join trangthaisangkien on sangkien.matrangthai = trangthaisangkien.matrangthai
        inner join dotsangkien on sangkien.madotsangkien = dotsangkien.madotsangkien
        inner join nguoithamgia on sangkien.masangkien = nguoithamgia.masangkien
        LEFT JOIN xetduyet on sangkien.masangkien = xetduyet.masangkien
        WHERE nguoithamgia.manhanvien = ?`, [req.nhanVienId]);
    return res.render('historySangkien.ejs', { dataSangkien: sangkien })
}
=======
    const [sangkien] = await connectDB.execute(
        `select * from sangkien 
        inner join trangthaisangkien on sangkien.matrangthai = trangthaisangkien.matrangthai
        inner join dotsangkien on sangkien.madotsangkien = dotsangkien.madotsangkien
        inner join nguoithamgia on sangkien.masangkien = nguoithamgia.masangkien
        WHERE manhanvien = ?`,
        [req.nhanVienId]
    );
    return res.render('historySangkien.ejs', { dataSangkien: sangkien });
};
>>>>>>> 9917c888b19b12ef590c00b2f7473f9b9a15d23d
let tylevaitro = async (req, res) => {
    let { masangkien, manhanvien1, manhanvien2, tyledonggop1, tyledonggop2 } =
        req.body;
    await connectDB.execute(
        'update nguoithamgia set tyledonggop = ? where masangkien=? and manhanvien=?',
        [tyledonggop1, masangkien, manhanvien1]
    );
    if (manhanvien2) {
        await connectDB.execute(
            'update nguoithamgia set tyledonggop = ? where masangkien=? and manhanvien=?',
            [tyledonggop2, masangkien, manhanvien2]
        );
    }
    return res.redirect('/chitietsangkien');
};
module.exports = {
    addSangkien,
    createSangkien,
    viewSangkien,
    UploadProfileFile,
    detailSangkien,
    duyetSangkien,
    huySangkien,
    huy1Sangkien,
    quanlyduyetSangkien,
    history,
    chitietSangkien,
    chitietduyetSangkien,
    tylevaitro,
};
