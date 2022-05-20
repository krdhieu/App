let inputNhanVienId = document.querySelector('.input-edit-nhanVienId');
let inputThanhVienHDId = document.querySelector('.input-edit-thanhVienHDId');
let editThanhVienHD = document.querySelector('.edit-thanhvienhd-form');
let createThanhVienHD = document.querySelector('.create-thanhvienhd-form');

let showEditThanhVienHDForm = (idNhanVien, idThanhVienHD) => {
    editThanhVienHD.style.display = 'block';
    inputNhanVienId.value = idNhanVien;
    inputThanhVienHDId.value = idThanhVienHD;
};

let showCreateThanhVienHDForm = () => {
    createThanhVienHD.style.display = 'block';
};

let submitBtn = document.querySelector('.btn-add-hd');
function myFunction() {
    confirm('Press a button!');
}
submitBtn.addEventListener('click', () => {
    myFunction();
});
