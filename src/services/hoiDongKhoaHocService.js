import connectDB from '../configs/connectDB';
//lay thong tin tat ca hoi dong
let getAllHDKH = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let [allHDKH] = await connectDB.execute(
                'SELECT * FROM `hoidongkhoahoc`'
            );
            resolve(allHDKH);
        } catch (e) {
            reject(e);
        }
    });
};

//lay thong tin nhwung hoi dong co trang thai la 1 (true)
let checkStateHDKH = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let [HDKH] = await connectDB.execute(
                'SELECT * FROM `hoidongkhoahoc` WHERE trangthai=1'
            );
            resolve(HDKH);
        } catch (e) {
            reject(e);
        }
    });
};

// tao moi hoi dong khoa hoc
let createHDKH = (ngayThanhLap, nhiemVu) => {
    return new Promise(async (resolve, reject) => {
        try {
            await connectDB.execute(
                'INSERT INTO `hoidongkhoahoc`(`id`, `ngaythanhlap`, `nhiemvu`, `trangthai`,`ngayketthuc`) VALUES (null,?,?,?,null)',
                [ngayThanhLap, nhiemVu, 1]
            );
            resolve('success');
        } catch (e) {
            reject(e);
        }
    });
};

// lay thong tin chi tiet hoi dong khoa hoc
let getDetailHDKH = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let [detail] = await connectDB.execute(
                'SELECT * FROM `hoidongkhoahoc` WHERE id=?',
                [id]
            );
            resolve(detail);
        } catch (e) {
            reject(e);
        }
    });
};
// thay doi trang thai cua hoi dong (dang trong nhiem ky / da ket thuc nhiem ky)
let changeStateHDKH = (ngayketthuc, id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await connectDB.execute(
                'UPDATE `hoidongkhoahoc` SET `ngayketthuc`=?,`trangthai`=0 WHERE `id`=?',
                [ngayketthuc, id]
            );
            resolve('success');
        } catch (e) {
            reject(e);
        }
    });
};
// sua thong ngay thanh lap va nhiem vu hdkh
let editHDKH = (id, nhiemvu, ngaythanhlap) => {
    return new Promise(async (resolve, reject) => {
        try {
            await connectDB.execute(
                'UPDATE `hoidongkhoahoc` SET `ngaythanhlap`=?,`nhiemvu`=? WHERE `id`=?',
                [ngaythanhlap, nhiemvu, id]
            );
            resolve('success');
        } catch (e) {
            reject(e);
        }
    });
};
// lay thong tin thanh vien hoi dong da dang nhap
let getThanhVienHDDaDangNhap = (idNhanVien) => {
    return new Promise(async (resolve, reject) => {
        try {
            let [thanhVienHDDaDangNhap] = await connectDB.execute(
                `SELECT thanhvienhoidong.* FROM thanhvienhoidong 
            JOIN nhanvien ON nhanvien.id= thanhvienhoidong.id_nhanvien 
            JOIN hoidongkhoahoc ON hoidongkhoahoc.id = thanhvienhoidong.id_hoidong 
            where hoidongkhoahoc.trangthai =1 AND nhanvien.id=?`,
                [idNhanVien]
            );
            resolve(thanhVienHDDaDangNhap);
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = {
    getAllHDKH: getAllHDKH,
    checkStateHDKH: checkStateHDKH,
    createHDKH: createHDKH,
    getDetailHDKH: getDetailHDKH,
    editHDKH: editHDKH,
    changeStateHDKH: changeStateHDKH,
    getThanhVienHDDaDangNhap: getThanhVienHDDaDangNhap,
};
