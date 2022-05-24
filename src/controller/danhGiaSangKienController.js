import danhGiaSK from '../services/danhGiaSKService';
// xep loai|| sua xep loai sang kien
let createUpdateDanhGiaSK = async (req, res) => {
    let { maSangKien, maXepLoaiMoi, maXepLoaiCu } = req.body;
    if (!maSangKien || !maXepLoaiMoi) {
        return res.redirect('/danhgia-sangkien');
    }

    let checkDanhGiaTonTai = await danhGiaSK.checkDanhGia(
        maSangKien,
        maXepLoaiCu
    );
    // console.log(checkDanhGiaTonTai);
    if (checkDanhGiaTonTai.length >= 1) {
        await danhGiaSK.editDanhGiaSangKien(
            maSangKien,
            maXepLoaiMoi,
            maXepLoaiCu
        );
        return res.redirect(
            '/danhgia-sangkien?alert=' + encodeURIComponent('2')
        );
    }
    await danhGiaSK.createDanhGiaSangKien(maSangKien, maXepLoaiMoi);
    return res.redirect('/danhgia-sangkien?alert=' + encodeURIComponent('2'));
};

module.exports = {
    createUpdateDanhGiaSK,
};
