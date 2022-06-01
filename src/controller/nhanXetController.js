import nhanXetService from '../services/nhanXetService';
import moment from 'moment-timezone';
import connectDB from '../configs/connectDB';
let createNhanXet = async (req, res) => {
    let { maSangKien, maThanhVien, nhanXet } = req.body;

    let checkNhanXet = await nhanXetService.getNhanXet(maThanhVien, maSangKien);
    if (checkNhanXet.length >= 1) {
        return res.send('Ban Da Nhan Xet Roi');
    }
    let currentDate = moment().utcOffset('+0700').format('YYYY-MM-DD');

    await nhanXetService.createNhanXet(
        maThanhVien,
        maSangKien,
        nhanXet,
        currentDate
    );
    return res.redirect(
        `/detail-sangkien?id=${maSangKien}&alert=` +
            encodeURIComponent('nhanxetthanhcong')
    );
};

let editNhanXet = async (req, res) => {
    let { maSangKien, maThanhVien, nhanXet } = req.body;
    if (!maThanhVien || !nhanXet) {
        return res.redirect(`/detail-sangkien?id=${maSangKien}`);
    }
    let currentDate = moment().utcOffset('+0700').format('YYYY-MM-DD');
    await nhanXetService.editNhanXet(
        maThanhVien,
        maSangKien,
        nhanXet,
        currentDate
    );
    return res.redirect(
        `/detail-sangkien?id=${maSangKien}&alert=` +
            encodeURIComponent('nhanxetthanhcong')
    );
};

module.exports = {
    createNhanXet: createNhanXet,
    editNhanXet: editNhanXet,
};
