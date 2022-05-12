let notification = document.querySelector('.notification');
let emailInput = document.querySelector("input[name='email']");
emailInput.addEventListener('change', (e) => {
    notification.textContent = '';
    console.log(e);
});
