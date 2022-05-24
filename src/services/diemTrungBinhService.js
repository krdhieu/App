import connectDB from '../configs/connectDB';
// lay diem trung binh 3 muc
let getDiemByMaSangKien = (masangkien) => {
    return new Promise(async (resolve, reject) => {
        try {
            await connectDB.execute(`SET @p4=?`, [masangkien]);
            await connectDB.execute(
                ` CALL trungbinhtong(@p0, @p1, @p2, @p3, @p4)`
            );
            let [diem] = await connectDB.execute(
                `SELECT @p0 AS tbmucdich, @p1 AS tbnoidung, @p2 AS tbungdung, @p3 AS tbtrinhbay;`
            );
            resolve(diem);
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    getDiemByMaSangKien,
};
