// let string = " ssd      sddSDDDddd         sadAAdsa   .khong co gi dau em. em co on k";
// string = chuanhoavanban(string);
// console.log(string)
//function chuanhoa(str) {
let chuanhoa = (str) => {
    str = str.trim();
    while (str.indexOf("  ") != -1) {
        str = str.replace("  ", " ");
    }
    str = str.replace(str.charAt(0), str.charAt(0).toString().toUpperCase());
    return str;
}
let chuanhoaten = (str) => {
    str = str.trim().toLowerCase();
    while (str.indexOf("  ") != -1) {
        str = str.replace("  ", " ");
    }
    let temp = str.split(" ");
    str = "";
    for (let i = 0; i < temp.length; i++) {
        str += temp[i].charAt(0).toString().toUpperCase() + temp[i].substring(1);
        if (i < temp.length - 1) // nếu tempt[i] không phải từ cuối cùng
            str += " ";   // cộng thêm một khoảng trắng
    }
    return str;
}
let chuanhoavanban = (str) => {
    str = str.trim();
    while (str.indexOf("  ") != -1) {
        str = str.replace("  ", " ");
    }
    str = str.replace(str.charAt(0), str.charAt(0).toString().toUpperCase());
    while (str.indexOf(" .") != -1) {
        str = str.replace(" .", ".");
    }
    let temp = str.split(".");
    str = "";
    for (let i = 0; i < temp.length; i++) {
        if (temp[i].charAt(0) != " ") {
            str += temp[i].charAt(0).toString().toUpperCase() + temp[i].substring(1);
        }
        else {
            str += temp[i].charAt(1).toString().toUpperCase() + temp[i].substring(2);
        }

        if (i < temp.length - 1)
            str += ". ";
    }
    return str;
}
module.exports = {
    chuanhoa: chuanhoa, chuanhoaten: chuanhoaten, chuanhoavanban: chuanhoavanban
};