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
// lay diem sang kien da cham cua thanh vien hd
let getChiTietDiemOfThanhVien = (masangkien, mathanhvien) => {
    return new Promise(async (resolve, reject) => {
        try {
            let [diemSangKien] = await connectDB.execute(
                'SELECT * FROM chitietchamdiem WHERE mathanhvien=? and masangkien=?',
                [mathanhvien, masangkien]
            );
            resolve(diemSangKien);
        } catch (e) {
            reject(e);
        }
    });
};

//sua diem

let editChiTietDiem = (
    mathanhvien,
    masangkien,
    diemmucdich,
    diemnoidung,
    diemungdung,
    diemtrinhbay
) => {
    return new Promise(async (resolve, reject) => {
        try {
            await connectDB.execute(
                `UPDATE chitietchamdiem set diem_muc_dich = ?, diem_noi_dung=?, diem_ung_dung=?, diem_trinh_bay=? WHERE mathanhvien=? and masangkien=?`,
                [
                    diemmucdich,
                    diemnoidung,
                    diemungdung,
                    diemtrinhbay,
                    mathanhvien,
                    masangkien,
                ]
            );
            resolve('ok');
        } catch (error) {
            reject(e);
        }
    });
};
module.exports = {
    createChiTietChamDiem: createChiTietChamDiem,
    checkDaChamDiem: checkDaChamDiem,
    getChiTietDiemOfThanhVien: getChiTietDiemOfThanhVien,
    editChiTietDiem: editChiTietDiem,
};
