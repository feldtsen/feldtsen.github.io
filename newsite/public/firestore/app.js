/**
 * Created by feldtsen on 2017-04-04.
 */
window.addEventListener('load', ()=>{
    "use strict";
    let productsContainer = document.getElementById("products"), productTitle = document.getElementById("title"), productPrice = document.getElementById("price"), productDescription = document.getElementById("description"), productImg = document.getElementById("img"), productImgDescription = document.getElementById("imgDescription"), addProductBtn = document.getElementById("addBtn"), priceBtn = document.getElementById("byPrice"), nameBtn = document.getElementById("byName"), newestBtn = document.getElementById("byNewest"), loginBtn = document.getElementById("login"), loadMoreBtn = document.getElementById("loadMore"), quantityInput = document.getElementById("quantity"), settings = document.getElementsByClassName("settings")[0], currentType, authStatus, limitInput = 6, numPro;
    const config = {
        apiKey: "AIzaSyCwPlZ-rTOaBbo_cWpyIkTPXQ_aHDb8QhI",
        authDomain: "firestore-94750.firebaseapp.com",
        databaseURL: "https://firestore-94750.firebaseio.com",
        projectId: "firestore-94750",
        storageBucket: "firestore-94750.appspot.com",
        messagingSenderId: "558878254307"
    };
    firebase.initializeApp(config);
    const db = firebase.database();
    let routes = {
      newProduct: (newTitle, newPrice, newDescription, newImg, newImgDescription)=>db.ref("products/").push({
          name: newTitle.toLowerCase(),
          price: Number(newPrice),
          description: newDescription,
          img: newImg,
          imgDescription: newDescription,
          timestamp: Number(new Date),
          published: new Date().toJSON().slice(0,10).replace(/-/g,'/')
      })
    };
    addProductBtn.addEventListener('click', ()=>{if(productTitle.value !== '' && productPrice.value !== '' && productImg.value !== '') addProduct();});
    newestBtn.addEventListener('click', ()=>{filterBy('newest');});
    nameBtn.addEventListener('click', ()=>{filterBy('name');});
    priceBtn.addEventListener('click', ()=>{filterBy('price');});
    loadMoreBtn.addEventListener('click', ()=>{loadMore();});
    quantityInput.addEventListener('focusout', ()=>{if(quantityInput.value > 0){limitInput = Number(quantityInput.value);filterBy(currentType);}});
    loginBtn.addEventListener('click', ()=>{authStatus();});
    function addProduct() {
        let newTitle = productTitle.value,
            newPrice = productPrice.value,
            newDescription = productDescription.value,
            newImg = productImg.value,
            newImgDescription = productImgDescription.value;
            routes.newProduct(newTitle, newPrice, newDescription, newImg, newImgDescription);
        filterBy(currentType);
    }
    function loadMore() {
        if(limitInput >= numPro){limitInput = 6;}
        else {limitInput += 6;}
        filterBy(currentType);
    }
    function filterBy(type){
        currentType = type;
        let data;
        productsContainer.innerHTML = '';
        if (type !== 'newest') data = db.ref('products/').orderByChild(type).limitToFirst(limitInput);
        else data = db.ref('products/').orderByChild(type).limitToLast(limitInput);
        if (limitInput >= numPro) {loadMoreBtn.innerHTML = `Show less`; loadMoreBtn.classList.add('loadLess')}
        else {loadMoreBtn.innerHTML = `Load 6 more`; loadMoreBtn.classList.remove('loadLess')}
        data.on('child_added', s=>{
            let product = s.val(), item = document.createElement('li');
            item.innerHTML = `<a href="#productClicked"><img src=${product.img} alt=${product.imgDescription}></a> <h2>${product.name}</h2><p>${product.published}<p>${product.description}</p><a class="price" href="#price">${product.price}SEK</a></li>`;
            if(type !== 'newest') productsContainer.appendChild(item);
            else productsContainer.insertBefore(item, productsContainer.firstChild);
        });
    }
    function loginGithub(){
        let provider = new firebase.auth.GithubAuthProvider();
        firebase.auth().signInWithPopup(provider);
    }
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            settings.classList.add('settingsOn');
            loginBtn.innerHTML = 'Sign out';
            authStatus = ()=> firebase.auth().signOut();
        }
        else {
            settings.classList.remove('settingsOn');
            loginBtn.innerHTML = 'Log in to add your own product';
            authStatus = ()=> loginGithub();
        }
    });
    db.ref("products").once("value", s=> {
        numPro = s.numChildren();
        if(limitInput >= numPro)loadMoreBtn.classList.add('loadLess')
        filterBy('newest');
    });
});
