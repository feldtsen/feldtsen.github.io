window.addEventListener('load', ()=>{
   var background = document.getElementById('background');

// Fix background image jump on mobile
if ((/Android|iPhone|iPad|iPod|BlackBerry/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
  background.style.top = 'auto';
  background.style.bottom = 0;

  window.onresize = sizeBackground;
  sizeBackground();
}

function sizeBackground() {
  background.style.height = screen.height;
} 
});