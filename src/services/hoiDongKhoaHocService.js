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
                'INSERT INTO `hoidongkhoahoc`(`id`, `namthanhlap`, `nhiemvu`, `trangthai`) VALUES (null,?,?,?)',
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
module.exports = {
    getAllHDKH: getAllHDKH,
    checkStateHDKH: checkStateHDKH,
    createHDKH: createHDKH,
    getDetailHDKH: getDetailHDKH,
};
