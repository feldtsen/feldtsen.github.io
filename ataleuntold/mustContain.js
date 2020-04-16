let sidenavButton = document.getElementsByClassName('sidenavButton')
    , sidenav = document.getElementsByClassName('sidenav')[0]
    , closeNewsletterButton = document.getElementsByClassName('closeNewsletterButton')[0]
    , newsletterPopup = document.getElementsByClassName('newsletter')[0];
for (let i = 0; i < sidenavButton.length; i++) {
    sidenavButton[i].addEventListener('click', () => {
        sidenav.classList.toggle('sidenavOpen');
    });
}
if (localStorage.getItem('hideNewsletter')) {
    newsletterPopup.classList.toggle('closeNewsletter');
}
closeNewsletterButton.addEventListener('click', () => {
    newsletterPopup.classList.toggle('closeNewsletter');
    localStorage.setItem('hideNewsletter', true);
});
window.onscroll = function () {
    if (document.body.scrollTop > 100) {
        document.getElementsByTagName('header')[0].classList.add('headerScrolled');
        document.getElementsByClassName('newsletter')[0].classList.add('headerScrolled');
    }
    else {
        document.getElementsByTagName('header')[0].classList.remove('headerScrolled');
        document.getElementsByClassName('newsletter')[0].classList.remove('headerScrolled');
    }
};

document.getElementById('getNewsletterToggleButton').addEventListener('click', ()=>{
        newsletterPopup.classList.toggle('closeNewsletter');

});