let buttonShowHide = document.querySelector('.show-hide-sidebar');
let sideBarContainer = document.querySelector('.sidebar-container');
buttonShowHide.addEventListener('click', () => {
    if (sideBarContainer.style.display === 'block') {
        sideBarContainer.style.display = 'none';
    } else {
        sideBarContainer.style.display = 'block';
    }
});
