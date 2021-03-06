import connectDB from '../configs/connectDB';

// lay nguoi tham gia theo ma sang kien
let getNguoiThamGia = (idSangKien) => {
    return new Promise(async (resolve, reject) => {
        try {
            let [nguoiThamGia] = await connectDB.execute(
                `SELECT nguoithamgia.*,nhanvien.tennhanvien,nhanvien.manhanvien as nhanVienID 
                FROM nguoithamgia JOIN nhanvien ON nguoithamgia.manhanvien=nhanvien.manhanvien 
                WHERE nguoithamgia.masangkien=?`,
                [idSangKien]
            );
            resolve(nguoiThamGia);
        } catch (e) {
            return reject(e);
        }
    });
};

module.exports = { getNguoiThamGia: getNguoiThamGia };
