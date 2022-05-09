import connectDB from '../configs/connectDB';

const getThongTinNVTrangChu = async (manhanvien) => {
    let [data] = await connectDB(
        'SELECT * FROM nhanvien WHERE manhanvien=?',
        manhanvien
    );
    return data;
};

module.exports = {
    getThongTinNVTrangChu,
};
