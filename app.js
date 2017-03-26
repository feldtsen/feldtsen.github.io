window.addEventListener('load', e=>{
   let menuButton = document.getElementsByClassName('menuButton');
    for(let i = 0; i < menuButton.length; i++){
        menuButton[i].addEventListener('click', e => {
            document.getElementsByClassName('menuPage')[0].classList.toggle('active');
        })
    }
});