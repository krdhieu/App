import lichSuHanhDongService from '../services/lichSuHanhDongService';

let hienThiToanBoLichSu = async (req, res) => {
    let { alert } = req.query;
    let page = parseInt(req.query.page) || 1;
    let perpage = 5;
    let tatCaLichSu = await lichSuHanhDongService.hienThiToanBoLichSu();
    let numOfResults = tatCaLichSu.length;
    let numOfPages = Math.ceil(numOfResults / perpage);

    if (page > numOfPages) {
        return res.redirect(
            '/lichsuhanhdong?page=' + encodeURIComponent(numOfPages)
        );
    } else if (page < 1) {
        return res.redirect('/lichsuhanhdong?page=' + encodeURIComponent('1'));
    }

    let begin = (page - 1) * perpage;

    let lichSuPerPage = await lichSuHanhDongService.lichSuPerPage(
        perpage,
        begin
    );
    console.log(lichSuPerPage);
    let iterator = page - 5 < 1 ? 1 : page - 5;
    let endingLink = iterator + 9 <= numOfPages ? iterator + 9 : numOfPages;

    return res.render('lichSuHanhDong.ejs', {
        lichSu: lichSuPerPage,
        page,
        iterator,
        endingLink,
        numOfPages,
        perpage,
        alert,
    });
};

let timKiemHanhDongTuNgayDenNgay = async (req, res) => {
    let { from, to } = req.body;
    console.log(from, to);
    if (from < to) {
        let ketQuaTK = await lichSuHanhDongService.hienThiToanBoLichSuFromTo(
            from,
            to
        );
        return res.render('timKiemHanhDong.ejs', {
            lichSu: ketQuaTK,
            from,
            to,
        });
    } else {
        return res.redirect(
            '/lichSuHanhDong?page=1&&alert=' +
                encodeURIComponent('frombiggerthanto')
        );
    }
};

module.exports = {
    hienThiToanBoLichSu,
    timKiemHanhDongTuNgayDenNgay,
};
