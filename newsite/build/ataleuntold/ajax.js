

//saves parsed data globally
let parsedFaq,
//creates a new xhr-request, making it ready for ajax call
    xhr = new XMLHttpRequest();
//opens the request and recives data from myjson.com(where I uploaded my json file)
xhr.open("GET", "https://api.myjson.com/bins/nz60h", true);

//making the request
xhr.onload = function (e) {
//if reached right ready state solve the call
    if (xhr.readyState === 4) {
        //All good! Do the stuff you want to do with the data from the url
        if (xhr.status === 200) {
            console.log(xhr.responseText);
            //get the collection of data(faq contains two fields, question and answer)
            collections = JSON.parse(xhr.response);
            //create elements to show on the HTML document and assignes it 
            createElement(collections);
            //makes the new elements clickable
            for (let i = 0; i < document.querySelectorAll("#faqContainer>li").length; i++) {
                //when you click on lis
                document.querySelectorAll("#faqContainer>li")[i].addEventListener('click', ()=>{
                    //you displays the lis span with the answer
                   document.getElementsByClassName('answer')[i].classList.toggle('displayAnswer'); 
                });
            }
            
        }
//else display error message
        else {
            console.error(xhr.statusText);
        }
    }
};
xhr.onerror = function (e) {
    console.error(xhr.statusText);
};
xhr.send(null);

var createElement = (collections) => {
    //gets where you want to display the content in the HTML document
    let container = document.getElementById('faqContainer');
    
    //for every question and answer in the array from the response
    collections.faq.forEach((collection) => {
        //creates one li element
        let liQuestion = document.createElement('li')
        //creates span to the li
            , spanAnswer = document.createElement('span')
        //makes the question content
            , questionContent = document.createTextNode(collection.question)
        //makes the answer content
            , answerContent = document.createTextNode(collection.answer);
        
        //gives the answer a class name of "answer"
        spanAnswer.className = "answer";
        
        //here we append the data to the right element
        liQuestion.appendChild(questionContent);
        spanAnswer.appendChild(answerContent);
        container.appendChild(liQuestion);
        liQuestion.appendChild(spanAnswer);
    });
};




//menu




//search function
document.getElementById('myInput').addEventListener('keyup', ()=>{
   myFunction(); 
});


function myFunction() {
  // Declare variables 
  var input, filter, div, ul, li, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div= document.getElementById("faqContainer");
  ul = div.children; //getElementsByTagName("ul");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < ul.length; i++) {
    li = ul[i] //ul[i].getElementsByTagName("li")[0];
    if (li) {
      if (li.innerHTML.toUpperCase().indexOf(filter) > -1) {
        ul[i].style.display = "";
      } else {
        ul[i].style.display = "none";
      }
    } 
  }
}