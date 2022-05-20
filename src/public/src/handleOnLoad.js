let notification_fail = document.querySelector('.notification-fail');
let emailInput = document.querySelector("input[name='email']");
emailInput.addEventListener('change', (e) => {
    notification_fail.textContent = '';
    console.log(e);
});
