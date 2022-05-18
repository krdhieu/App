import connectDB from '../configs/connectDB';
// cham diem
let createChiTietChamDiem = (
    idThanhVien,
    idSangKien,
    diemMucDich,
    diemNoiDung,
    diemUngDung,
    diemTrinhBay
) => {
    return new Promise(async (resolve, reject) => {
        try {
            await connectDB.execute(
                `INSERT INTO chitietchamdiem (mathanhvien, masangkien, diem_muc_dich, diem_noi_dung,diem_ung_dung, diem_trinh_bay) 
            VALUES (?,?,?,?,?,?)`,
                [
                    idThanhVien,
                    idSangKien,
                    diemMucDich,
                    diemNoiDung,
                    diemUngDung,
                    diemTrinhBay,
                ]
            );
            resolve('ok');
        } catch (e) {
            reject(e);
        }
    });
};

let checkDaChamDiem = (idThanhVien, idSangKien) => {
    return new Promise(async (resolve, reject) => {
        try {
            let [checkDaChamDiem] = await connectDB.execute(
                `SELECT * FROM chitietchamdiem WHERE mathanhvien=? and masangkien=?`,
                [idThanhVien, idSangKien]
            );
            resolve(checkDaChamDiem);
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createChiTietChamDiem: createChiTietChamDiem,
    checkDaChamDiem: checkDaChamDiem,
};
