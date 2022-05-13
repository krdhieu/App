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

module.exports = {
    getAllHDKH: getAllHDKH,
    checkStateHDKH: checkStateHDKH,
    createHDKH: createHDKH,
    getDetailHDKH: getDetailHDKH,
    editHDKH: editHDKH,
    changeStateHDKH: changeStateHDKH,
};
