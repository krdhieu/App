const haveBackspace = (str) => {
    let check = [...str].some((item) => {
        return item === ' ';
    });
    return check;
};

module.exports = {
    haveBackspace: haveBackspace,
};
