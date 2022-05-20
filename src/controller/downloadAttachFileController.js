import path from 'path';
let download = async (req, res) => {
    let { filename } = req.query;
    if (!filename) {
        return res.send('Chưa có file đính kèm');
    }
    console.log(filename);
    const file = path.join(path.dirname(__dirname), `\\files\\${filename}`);
    console.log(file);
    return res.download(file);
};

module.exports = { download: download };
