/*jshint esversion: 6*/

/* 
WARNING!

PROJECT CREATED BY JOACHIM ØRFELDT PEDERSEN AND CARL HULTKRANTZ
IF THIS TASK HAD BEEN GIVEN TO US TODAY, IT WOULD NOT LOOK LIKE THIS AT ALL.
THIS PROJECT HAVE PROVIDED A HUGE LEARNING CURVE, WHICH WAS THE INTENTION.

*/

let canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'), //we wants to drawy 2d shapes
    info = document.getElementById('info'),
    colorSelector = document.getElementById('colorSelector'),
    selected = colorSelector.options[colorSelector.selectedIndex], //gets index of the option-list dropdown
    triangleButton = document.getElementsByClassName('triangleButton'),
    rectangleButton = document.getElementsByClassName('rectangleButton'),
    circleButton = document.getElementsByClassName('circleButton'),
    polygonButton = document.getElementsByClassName('polygonButton'),
    clearCanvasButton = document.getElementsByClassName('clearCanvasButton'),
    cancelDrawingButton = document.getElementsByClassName('cancelDrawingButton'),
    triforce = document.getElementById('triforce'),
    imageObj = new Image(),
    addColorButton = document.getElementById('submitColor'),
    userColor = document.getElementById('userColor'),
    JSONExpButton = document.getElementById('JSONExpButton'),
    JSONExport = document.getElementById('JSONExport'),
    JSONImportButton = document.getElementById('JSONImpButton'),
    userWantsToDrawTriangle = false,
    userWantsToDrawRectangle = false,
    userWantsToDrawCircle = false,
    userWantsToDrawPolygon = false,
    pressed = false, //used to append userColor on "enter"-key
    polygonClicked = 0, //to know when to transform the button to end polygon
    savedFigs = [], // saved all cords to created shapes(used in exporting to JSON)
    savedParsed, //keeps all parsed (JSON.stringify to JSON.parse) objects and arrays 
    savedPolygon = [], //keeps all JSON.stringy arrays(this gets pushed to export window) 
    currentPosistions = [], //when shape is activated, click cords are saved here
    currentSavedFig = [], //saves the current imported(JSON to canvas) object/array to later get drawn in drawFig() function
    myClicks = 0, //keeps track of how many times user have clicked after user have clicked one of the shape buttons
    polyTurn = 0, //since polygon uses a different structure, we need this to know when to start drawing the polygon on import
    polyStart = []; //this is not the final solution, this saves the first polygon array-element, and draws the last line(so it looks done, but it sure isn't how it's supposed to be)

//testing 



//lopped buttons because there is more than one
for (let i = 0; i < 2; i++) {
    triangleButton[i].addEventListener('click', function (event) {
        resetAll();
        userWantsToDrawTriangle = true;
        info.textContent = 'Click three places to form a triangle';
    });

    rectangleButton[i].addEventListener('click', function (event) {
        resetAll();
        userWantsToDrawRectangle = true;
        info.textContent = 'Click two places to form a rectangle';
    });

    circleButton[i].addEventListener('click', function (event) {
        resetAll();
        userWantsToDrawCircle = true;
        info.textContent = 'Click two places to form a circle';
    });
    polygonButton[i].addEventListener('click', function (event) {
        info.textContent = 'Click x times to form a polygon. Then click "End polygon"';
        if (polygonClicked === 0) {
            //change button on click
            resetAll();
            userWantsToDrawPolygon = true;
            changeColor();
            polygonClicked = 1;
            polygonButton[0].textContent = 'End polygon';
            polygonButton[1].textContent = 'End polygon';
        } else {
            //change button to default
            info.textContent = 'Polygon created';
            polygonClicked = 0;
            polygonButton[0].textContent = 'Polygon';
            polygonButton[1].textContent = 'Polygon';
            context.closePath();
            context.stroke();
            savedPolygon.push(JSON.stringify(currentPosistions));
            resetAll();
        }
    });
    clearCanvasButton[i].addEventListener('click', function (event) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        info.textContent = 'A fresh beginning';
        JSONExport.innerHTML = "";
        savedPolygon = [];
        savedFigs = [];
        resetAll();
    });
    cancelDrawingButton[i].addEventListener('click', function (event) {
        info.textContent = 'Having a change of heart?';
        userWantsToDrawTriangle = false;
        userWantsToDrawRectangle = false;
        userWantsToDrawCircle = false;
        userWantsToDrawPolygon = false;
        currentPosistions = [];
        myClicks = 0;
        if (polygonClicked = 1) {
            polygonClicked = 0;
            polygonButton[0].textContent = 'Polygon';
            polygonButton[1].textContent = 'Polygon';
        }
    });
}
//buttons that do not repeat, since there is just one
addColorButton.addEventListener('click', function (event) {
    addColor();
});
JSONExpButton.addEventListener('click', function (event) {
    info.textContent = 'Canvas elements exported to JSON';
    JSONExport.innerHTML = "Normal shape JSON: &nbsp;" + "[" + savedFigs + "] " + "<br>" + "Polygon shape JSON: " + savedPolygon;


});
JSONImportButton.addEventListener('click', function (event) {
    resetAll();
    let parsed = JSON.parse(JSONImport.value);
    savedParsed = parsed;
    importToCanvas();
});

//checks for what type shape user wants to create
canvas.addEventListener('click', function (event) {
    //get click cords
    let cord = [],
        r = event.target.getBoundingClientRect();
    cord.push(event.clientX - r.left);
    cord.push(event.clientY - r.top);
    //marks clicked posistion so user doesn't get lost
    function marker() {
        context.beginPath();
        context.fillStyle = 'rgba(50,50,50,0.3)';
        context.arc(cord[0], cord[1], 2, 0, 2 * Math.PI);
        context.fill();
        context.closePath();
    }
    //if user has clicked a shape button, one of these will apply
    //TRIANGLE//TRIANGLE//TRIANGLE//TRIANGLE//TRIANGLE//TRIANGLE
    if (userWantsToDrawTriangle && myClicks <= 1) {
        info.textContent = 'Click three places to form a triangle'; //info given to user on screen
        myClicks++; //so it doesn't loop and can continue to drawing
        currentPosistions.push(cord); //push the clicked cords to array
        marker(); //marks points clicked
    } else if (userWantsToDrawTriangle && myClicks == 2) {
        info.textContent = 'Triangle created'; //info given to user on screen
        currentPosistions.push(cord); //push the clicked cords to array
        marker(); //marks points clicked
        drawFig(); //draws the shape on canvas
        currentPosistions = []; //resets cords so code can repeat
        myClicks = 0; //resets clicks so code can repeat
        //same logic applies on every shape
    }
    //RECTANGLE//RECTANGLE//RECTANGLE//RECTANGLE//RECTANGLE//RECTANGLE
    else if (userWantsToDrawRectangle && myClicks == 0) {
        info.textContent = 'Click two places to form a rectangle';
        myClicks++;
        currentPosistions.push(cord);
        marker();
    } else if (userWantsToDrawRectangle && myClicks == 1) {
        info.textContent = 'Rectangle created';
        currentPosistions.push(cord);
        marker();
        drawFig();
        currentPosistions = [];
        myClicks = 0;
    }
    //CIRCLE//CIRCLE//CIRCLE//CIRCLE//CIRCLE//CIRCLE//CIRCLE//CIRCLE
    else if (userWantsToDrawCircle && myClicks == 0) {
        info.textContent = 'Click two places to form a circle';
        myClicks++;
        currentPosistions.push(cord);
    } else if (userWantsToDrawCircle && myClicks == 1) {
        info.textContent = 'Circle created';
        currentPosistions.push(cord);
        drawFig();
        currentPosistions = [];
        myClicks = 0;
    }
    //POLYGON//POLYGON//POLYGON//POLYGON//POLYGON//POLYGON//POLYGON
    else if (userWantsToDrawPolygon) {
        info.textContent = 'Click x times to form a polygon. Then click "End polygon"';
        if (currentPosistions.length === 0) {
            context.beginPath();
        }
        currentPosistions.push(cord);
        context.lineTo(cord[0], cord[1]);
        context.stroke();
    }
    return cord;
});
//Resets all important values so you can start drawing other shapes
function resetAll() {
    userWantsToDrawCircle = false;
    userWantsToDrawPolygon = false;
    userWantsToDrawRectangle = false;
    userWantsToDrawTriangle = false;
    currentPosistions = [];
    myClicks = 0;
}
//draw the figs on canvas
function drawFig() {
    if (userWantsToDrawCircle) {
        if (currentPosistions != 0) {
            //from user clicks
            let radius = Math.hypot(currentPosistions[1][0] - currentPosistions[0][0], currentPosistions[1][1] - currentPosistions[0][1]);
            let circleFig = new Circle(currentPosistions[0][0], currentPosistions[0][1], radius);
            let c = circleFig.points();
            context.beginPath();
            changeColor();
            context.arc(c[0].x, c[0].y, radius, 0, 2 * Math.PI);
            context.closePath();
            context.stroke();
            savedFigs.push(JSON.stringify(circleFig));
        } else {
            //import from JSON
            let circleFig = new Circle(currentSavedFig[0].centerX, currentSavedFig[0].centerY, currentSavedFig[0].radius);
            let c = circleFig.points();
            context.beginPath();
            changeColor();
            context.arc(c[0].x, c[0].y, currentSavedFig[0].radius, 0, 2 * Math.PI);
            context.closePath();
            context.stroke();

        }
        //same logic applies on every shape

    } else if (userWantsToDrawRectangle) {
        if (currentPosistions != 0) {
            let rectangleFig = new Rectangle(currentPosistions[0][0], currentPosistions[0][1], currentPosistions[1][0], currentPosistions[1][1]);
            let c = rectangleFig.points();
            context.beginPath();
            changeColor();
            context.moveTo(c[0].x, c[0].y);
            context.lineTo(c[2].x, c[2].y);
            context.lineTo(c[1].x, c[1].y);
            context.lineTo(c[3].x, c[3].y);
            context.closePath();
            context.stroke();
            savedFigs.push(JSON.stringify(rectangleFig));
        } else {
            let rectangleFig = new Rectangle(currentSavedFig[0].rx1, currentSavedFig[0].ry1, currentSavedFig[0].rx2, currentSavedFig[0].ry2);
            let c = rectangleFig.points();
            context.beginPath();
            changeColor();
            context.moveTo(c[0].x, c[0].y);
            context.lineTo(c[2].x, c[2].y);
            context.lineTo(c[1].x, c[1].y);
            context.lineTo(c[3].x, c[3].y);
            context.closePath();
            context.stroke();
            savedFigs.push(JSON.stringify(rectangleFig));
        }
    } else if (userWantsToDrawTriangle) {
        if (currentPosistions != 0) {
            let triangleFig = new Triangle(currentPosistions[0][0], currentPosistions[0][1], currentPosistions[1][0], currentPosistions[1][1], currentPosistions[2][0], currentPosistions[2][1]);
            let c = (triangleFig.points());
            context.beginPath();
            changeColor();
            context.moveTo(c[0].x, c[0].y);
            context.lineTo(c[1].x, c[1].y);
            context.lineTo(c[2].x, c[2].y);
            context.closePath();
            context.stroke();
            savedFigs.push(JSON.stringify(triangleFig));
        } else {
            let triangleFig = new Triangle(currentSavedFig[0].tx1, currentSavedFig[0].ty1, currentSavedFig[0].tx2, currentSavedFig[0].ty2, currentSavedFig[0].tx3, currentSavedFig[0].ty3);
            let c = (triangleFig.points());
            context.beginPath();
            changeColor();
            context.moveTo(c[0].x, c[0].y);
            context.lineTo(c[1].x, c[1].y);
            context.lineTo(c[2].x, c[2].y);
            context.closePath();
            context.stroke();
            savedFigs.push(JSON.stringify(triangleFig));
        }
    } else {
        alert("Unexpected error");
    }

}
//import to canvas
function importToCanvas() {
    info.textContent = "Imported to canvas!";
    //checks for what type the JSON you want to parse is
    for (let i = 0; i < savedParsed.length; i++) { //loops so you get every element in the savedParsed(where you push the input value from user)
        //this checks if it is a circle
        if (savedParsed[i].centerX != undefined) {
            userWantsToDrawCircle = true;
            currentSavedFig.push(savedParsed[i]);
            drawFig();
            currentSavedFig = [];
            userWantsToDrawCircle = false;
            //this checks if it is a rectangle
        } else if (savedParsed[i].rx1 != undefined) {
            userWantsToDrawRectangle = true;
            currentSavedFig.push(savedParsed[i]);
            drawFig();
            currentSavedFig = [];
            userWantsToDrawRectangle = false;
            //this checks if it is a triangle
        } else if (savedParsed[i].tx1 != undefined) {
            userWantsToDrawTriangle = true;
            currentSavedFig.push(savedParsed[i]);
            drawFig();
            currentSavedFig = [];
            userWantsToDrawTriangle = false;
            //this is not optimal, but checks if it is a polygon
        } else {
            if (polyTurn === 0) {
                context.beginPath();
                changeColor();
                context.moveTo(savedParsed[i][0], savedParsed[i][1]);
                polyStart.push(savedParsed[i][0], savedParsed[i][1]);
                polyTurn++;
            } else {
                polyTurn++;
                context.lineTo(savedParsed[i][0], savedParsed[i][1]);
                context.stroke();

            }
        }

    }
    //This is not optimal, draws the last line in the polygon, but may draw unexpected lines if combined with other shapes(there is nothing that close.path)
    if (polyStart != []) {
        context.lineTo(polyStart[0], polyStart[1]);
        context.stroke();
        polyTurn = [];

    }

}
//change the drawing color, two options(one with timer, one with function calling) 
function changeColor() {
    context.strokeStyle = colorSelector.options[colorSelector.selectedIndex].value;
}
//add user color
userColor.onkeydown = function () {
    if (event.keyCode == 13) { //event code for enter-key
        pressed = true;
        addColor();
    }
};
userColor.onkeyup = function () {
    pressed = false;
};

function addColor() {
    let matchMe = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i; //checks for right user input
    if (matchMe.test(userColor.value)) { //needs to match to continue
        let newColorElement = document.createElement('option');
        let newColorName = document.createTextNode(userColor.value);
        newColorElement.appendChild(newColorName);
        colorSelector.appendChild(newColorElement);
        info.textContent = "Color added to the list";
    } else { //if user input does not match, this message will be printed out
        info.textContent = "Start with \"#\", use the letters A-F and the numbers 0-9";
    }
}
//dropdown menu
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show"); //toggles the dropdown menu
}
window.onclick = function (event) { // close the dropdown window if you click anywhere, but inside the menu
    if (!event.target.matches('.dropbtn')) {
        let dropdowns = document.getElementsByClassName("dropdownContent");
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
};
//IMPORTED LAB 2 CONSTRUCTORS, USED TO DRAW THE SHAPE. Many of the values is not used, but makes it possible to expand the project in the future. 
function Triangle(x1, y1, x2, y2, x3, y3) {
    "use strict";
    this.tx1 = x1;
    this.ty1 = y1;
    this.tx2 = x2;
    this.ty2 = y2;
    this.tx3 = x3;
    this.ty3 = y3;
    this.area = (() => {
        let a = (Math.sqrt((this.tx1 - this.tx2) * (this.tx1 - this.tx2) + (this.ty1 - this.ty2) * (this.ty1 - this.ty2))); //A to B
        let b = (Math.sqrt((this.tx2 - this.tx3) * (this.tx2 - this.tx3) + (this.ty2 - this.ty3) * (this.ty2 - this.ty3))); //B to C
        let c = (Math.sqrt((this.tx1 - this.tx3) * (this.tx1 - this.tx3) + (this.ty1 - this.ty3) * (this.ty1 - this.ty3))); //C to A
        let s = (a + b + c) * 0.5; //Half of perimeter   
        return Math.sqrt(s * (s - a) * (s - b) * (s - c)); //Total area
    });
    this.points = (() => {
        let allPoints = [];
        let firstCord = {
            x: this.tx1,
            y: this.ty1
        };
        let secondCord = {
            x: this.tx2,
            y: this.ty2
        };
        let thirdCord = {
            x: this.tx3,
            y: this.ty3
        };
        allPoints.push(firstCord, secondCord, thirdCord);
        return allPoints;
    });
    this.move = (dx, dy) => {
        this.tx1 += dx;
        this.tx2 += dx;
        this.tx3 += dx;
        this.ty1 += dy;
        this.ty2 += dy;
        this.ty3 += dy;
        return this.points();
    };
    this.boundingBox = () => {
        let highestX = Math.max(this.tx1, this.tx2, this.tx3);
        let lowestX = Math.min(this.tx1, this.tx2, this.tx3);
        let highestY = Math.max(this.ty1, this.ty2, this.ty3);
        let lowestY = Math.min(this.ty1, this.ty2, this.ty3);
        return new Rectangle(lowestX, lowestY, highestX, highestY);

    };
}

function Rectangle(x1, y1, x2, y2) {
    "use strict";
    this.rx1 = x1;
    this.ry1 = y1;
    this.rx2 = x2;
    this.ry2 = y2;
    this.area = () => (this.rx1 - this.rx2) * (this.ry1 - this.ry2);
    this.points = () => {
        let allPoints = [];
        let firstCord = {
            x: this.rx1,
            y: this.ry1
        };
        let firstUnknown = {
            x: ((this.rx2) + (this.rx1 - this.rx2)),
            y: this.ry2
        };
        let secondCord = {
            x: this.rx2,
            y: this.ry2
        };
        let secondUnknown = {
            x: ((this.rx1) + (this.rx2 - this.rx1)),
            y: this.ry1
        };
        allPoints.push(firstCord, secondCord, firstUnknown, secondUnknown);
        return allPoints;
    };

    this.distanceTo = (fig) => {
        let thisX = (this.rx1 + this.rx2) * 0.5;
        let thisY = (this.ry1 + this.ry2) * 0.5;
        let figX = (fig.x1 + fig.x2) * 0.5;
        let figY = (fig.y1 + fig.y2) * 0.5;
        return Math.hypot(figX - thisX, figY - thisY);
    };
    this.move = (dx, dy) => {
        this.rx1 += dx;
        this.rx2 += dx;
        this.ry1 += dy;
        this.ry2 += dy;
        return this.points();
    };
}

function Circle(centerX, centerY, radius) {
    "use strict";
    this.centerX = centerX;
    this.centerY = centerY;
    this.radius = radius;
    this.area = (() => Math.PI * Math.pow(radius, 2));
    this.points = (() => {
        let allPoints = [];
        let firstCord = {
            x: this.centerX,
            y: this.centerY
        };
        allPoints.push(firstCord);
        return allPoints;
    });
    this.distanceTo = (fig) => {
        let distance = Math.hypot(fig.centerX - this.centerX, fig.centerY - this.centerY) - (fig.radius + this.radius);
        if (distance < 0) return null;
        return distance;
    };
    this.boundingBox = () => {
        let upperRightX = this.centerX + this.radius;
        let upperRightY = this.centerY + this.radius;
        let lowerLeftX = this.centerX - this.radius;
        let lowerLeftY = this.centerY - this.radius;
        return new Rectangle(lowerLeftX, lowerLeftY, upperRightX, upperRightY);

    };
    this.move = (dx, dy) => {
        this.centerX += dx;
        this.centerY += dy;
        return this.points();
    };
}


//super secret button that no one is supposed to notice
triforce.addEventListener('click', function (event) {
    let heylisten = document.getElementById('heylisten');
    heylisten.play();
    info.innerHTML = '"Hey! Listen!"'
    context.beginPath();
    context.moveTo(0, 595);
    context.lineTo(300, 15);
    context.lineTo(600, 595);
    context.lineTo(0, 595);
    context.fillStyle = "#F4EC30";
    context.fill();
    context.stroke();
    context.closePath();
    context.beginPath();
    context.moveTo(152, 300);
    context.lineTo(447, 300);
    context.lineTo(300, 595);
    context.lineTo(152, 300);
    context.fillStyle = "#c0c0c0";
    context.fill();
    context.stroke();
    imageObj.onload = function () {
        context.drawImage(imageObj, 49, 30);
    };
    imageObj.src = "secret.png"
});