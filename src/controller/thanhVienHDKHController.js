import thanhVienHDKHService from '../services/thanhVienHDKHService';
import nhanVienService from '../services/nhanvienService';

let createThanhVienHD = async (req, res) => {
    let { idNhanVien, idChucVu, idHDKH } = req.body;
    if (!idChucVu || !idNhanVien || !idHDKH) {
        return res.send('Missing require parameter');
    }
    let check = await nhanVienService.checkNhanVienTonTai(idNhanVien);
    if (check.length !== 1) {
        return res.send('id nhan vien khong ton tai');
    }

    await thanhVienHDKHService.createThanhVien(idHDKH, idNhanVien, idChucVu);
    return res.send('ok');
};

let editThanhVienHD = async (req, res) => {
    let { idHDKH, idNhanVien, idChucVu } = req.body;
    if (!idChucVu || !idHDKH || !idNhanVien) {
        return res.send('missing required parameter');
    }
    let check = await nhanVienService.checkNhanVienTonTai(idNhanVien);
    if (check.length !== 1) {
        return res.send('id nhan vien khong ton tai');
    }
    console.log(idHDKH, idNhanVien, idChucVu);
    let isSuccess = await thanhVienHDKHService.editThanhVienHD(
        idNhanVien,
        idChucVu,
        idHDKH
    );
    return res.send(isSuccess);
};
module.exports = {
    createThanhVienHD: createThanhVienHD,
    editThanhVienHD: editThanhVienHD,
};
