import connectDB from '../configs/connectDB';

let themLichSu = (maNhanVien, hanhDong, ngayGio) => {
    return new Promise(async (resolve, reject) => {
        try {
            await connectDB.execute(
                `INSERT INTO lichsuhanhdong (manhanvien,hanhdong,ngaygio) values (?,?,?)`,
                [maNhanVien, hanhDong, ngayGio]
            );
            resolve('ok');
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    themLichSu,
};
