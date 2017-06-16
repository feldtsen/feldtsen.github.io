let numSquares = 6,
    squareColors,
    guessThisColor,
    squares = document.getElementsByClassName('square'),
    colorDisplay = document.getElementById('colorDisplay'),
    infoToUser = document.getElementById('infoToUser'),
    h1Header = document.querySelector('h1'),
    resetButton = document.getElementById('reset'),
    modeButtons = document.getElementsByClassName('mode');


resetButton.addEventListener('click', function () {
    reset();
});

//functions:
function changeColors(color) {
    //loop through all the squares
    for (let i = 0; i < squares.length; i++) {
        //change the colors to the given color  
        squares[i].style.backgroundColor = color;
    }

}

function randomColorGenerator(num) {
    //make array
    let array = [];
    //repeat num times
    for (let i = 0; i < num; i++) {
        //get random color and push into array 
        array.push(randomColor());
    }
    //return array
    return array;
}

function randomColor() {
    //pick rgb value from  0 to 255 
    let r = Math.floor(Math.random() * 256),
        g = Math.floor(Math.random() * 256),
        b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";


}

function guessThisColorGenerator() {
    let random = Math.floor(Math.random() * squareColors.length);
    return squareColors[random];
}

function reset() {
    //generate all new color
    squareColors = randomColorGenerator(numSquares);
    //pick a new random color from array
    guessThisColor = guessThisColorGenerator();
    //changed the displayed color to match guessThisColor
    colorDisplay.textContent = guessThisColor;
    //change color of squares
    for (let i = 0; i < squares.length; i++) {
        //add colors to squares
        if (squareColors[i]) {
            squares[i].style.display = 'block';
            squares[i].style.backgroundColor = squareColors[i];

        } else {
            squares[i].style.display = 'none';
        }
    }

    h1Header.style.backgroundColor = 'rgb(95, 158, 160)';
    infoToUser.textContent = '';
    resetButton.textContent = 'New Colors';
}

function modeButtonSetup() {
    for (let i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener('click', function () {
            modeButtons[0].classList.remove('selected');
            modeButtons[1].classList.remove('selected');
            this.classList.add('selected');

            this.textContent === 'Easy' ? numSquares = 3 : numSquares = 6;

            if (this.textContent === 'Easy') {
                numSquares = 3;
            } else {
                numSquares = 6;
            }

            reset();
        });
    }
}

function squareSetup() {
    for (let i = 0; i < squares.length; i++) {
        //add events to squares
        squares[i].addEventListener('click', function () {
            //get the color of the clicked square
            let clickedColor = this.style.backgroundColor;
            if (clickedColor === guessThisColor) {
                changeColors(clickedColor);
                infoToUser.textContent = 'Correct'
                h1Header.style.backgroundColor = guessThisColor;
                resetButton.textContent = 'Play Again?';
            } else {
                this.style.backgroundColor = 'rgb(50, 50, 50)';
                infoToUser.textContent = 'Wrong'
            }
            //compare the color to guessThisColor
        });
    }
}

window.onload = function () {
    function init() {
        modeButtonSetup();
        squareSetup();
        reset();
    }
    init();
}