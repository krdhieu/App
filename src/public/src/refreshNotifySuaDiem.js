let diemInputArray = document.querySelectorAll('.input-diem');
let notification_success = document.querySelector('.notification-success');
diemInputArray.forEach((Element) => {
    Element.addEventListener('click', (e) => {
        notification_success.textContent = '';
    });
});
