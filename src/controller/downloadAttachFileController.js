import path from 'path';
let download = async (req, res) => {
    let { filename } = req.params;
    if (!filename) {
        return res.redirect('/get-cham-diem');
    }
    console.log(filename);
    const file = path.join(path.dirname(__dirname), `\\files\\${filename}`);
    console.log(file);
    //return res.download(file);
};

module.exports = { download: download };
