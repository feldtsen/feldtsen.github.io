window.addEventListener('load', () => {
    let configFirebase = {
            apiKey: "AIzaSyA0-UW8lNLaBJbM5Uo1kKOOT2MITAqyV6I"
            , authDomain: "fir-chat-5ec52.firebaseapp.com"
            , databaseURL: "https://fir-chat-5ec52.firebaseio.com"
            , storageBucket: "fir-chat-5ec52.appspot.com"
            , messagingSenderId: "582101038579"
        }
        , db = firebase.database
        , routes = {
            messages: (username, message, date, timestamp, key) => db().ref('messages/').push({
                name: username
                , message: message
                , date: date
                , reaction: Number(0)
                , timestamp: timestamp
            })
            , users: (user) => db().ref('users/' + user.uid).update({
                email: user.providerData[0].email
                , name: user.providerData[0].displayName
                , uid: user.providerData[0].uid
                , pic: user.providerData[0].photoURL
                , provider: user.providerData[0].providerId
            })
            , userMessage: (userId, message, key) => db().ref('users/' + userId + '/postedMessages/' + key).set({
                text: message
            })
        }
        , btnSend = document.getElementById('btnSend')
        , messageInput = document.getElementById('messageInput')
        , usernameInput = document.getElementById('usernameInput')
        , displayMessages = document.getElementById('displayMessages')
        , loginButton = document.getElementById('loginButton')
        , popup = document.getElementsByClassName('popup')[0]
        , exitPopup = document.getElementsByClassName('exit')[0]
        , socials = document.querySelectorAll('.popup > li');
    /****************************************
    ----INIT FOR FIREBASE (always run first)
    ****************************************/
    firebase.initializeApp(configFirebase);
    /****************************************
    ----EVENT LISTENER----------------------
    ****************************************/
    //  sends data to the server on button click
    btnSend.addEventListener('click', (e) => {
        if (firebase.auth().currentUser && messageInput.value != '') sendMessage();
        else console.log('Enter username and/or message');
    });
    //  sends data to the server on keypress enter
    messageInput.addEventListener('keypress', (e) => {
        if (e.keyCode == '13' && firebase.auth().currentUser && messageInput.value != '') {
            sendMessage();
        }
    });
    exitPopup.addEventListener('click', e => {
        popup.classList.remove('popupActive');
    });
    for (let i = 0; i < socials.length; i++) {
        socials[i].addEventListener('click', e => {
            if (i == 2) userLogin(new firebase.auth.GithubAuthProvider());
            else if (i == 3) userLogin(new firebase.auth.FacebookAuthProvider());
            else if (i == 4) userLogin(new firebase.auth.TwitterAuthProvider());
        });
    }
    loginButton.addEventListener('click', e => {
        if (firebase.auth().currentUser) {
            githubSignout();
        }
        popup.classList.add('popupActive')
    });
    //  update when changes occur and onload
    db().ref('/messages').limitToLast(50).on('value', (s) => {
        let data = s.val();
        displayMessage(data);
    });
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            usernameInput.value = firebase.auth().currentUser.providerData[0].displayName || firebase.auth().currentUser.providerData[0].email;
            loginButton.innerHTML = `<img src=${firebase.auth().currentUser.providerData[0].photoURL}> logout`;
        }
        else {
            usernameInput.value = `please log in`;
            loginButton.innerHTML = `login `;
        }
    });
    /****************************************
    ----FUNCTIONS---------------------------
    ****************************************/
    function sendMessage() {
        let message = messageInput.value
            , userId = firebase.auth().currentUser.uid
            , username = firebase.auth().currentUser.providerData[0].displayName || firebase.auth().currentUser.providerData[0].email
            , time = new Date()
            , date = `${time.getHours()}:${time.getMinutes()} - ${time.getDate()}/${time.getMonth()+1}/${time.getFullYear()}`
            , newMessage = routes.messages(username, message, date, time.getTime())
            , userMessage = routes.userMessage(userId, message, newMessage.key);
        messageInput.value = '';
    }

    function displayMessage(messages) {
        displayMessages.innerHTML = '';
        let messageArray = [];
        for (let message in messages) {
            messageArray.push(`<span class="postUser">${messages[message].name}</span> 
            <span class="postMessage">${messages[message].message}
            <span class="likeButton"><i class="fa fa-thumbs-up" aria-hidden="true"></i></span>
            <span class="dislikeButton"><i class="fa fa-thumbs-down" aria-hidden="true"></i></span>
            <span class="reactions">${messages[message].reaction}</span></span> <span class="postDate">${messages[message].date}</span>`);
        }
        for (let i = messageArray.length - 1; i >= 0; i--) {
            let liMessage = document.createElement('li');
            liMessage.innerHTML = `${messageArray[i]}`;
            displayMessages.appendChild(liMessage);
        }
    }
    /****************************************
    ----SIGN IN/OUT WITH GITHUB ACCOUNT------
    ****************************************/
    function userLogin(provider) {
        popup.classList.remove('popupActive');
        firebase.auth().signInWithRedirect(provider);
    }
    firebase.auth().getRedirectResult().then(function (result) {
        let user = result.user;
        console.log(user);
        if (user) {
            routes.users(user);
        }
    }).catch(function (error) {
        console.log(`Inside catch`);
        let errorCode = error.code
            , errorMessage = error.message
            , email = error.email
            , credential = error.credential;
        console.log(`Error code: ${errorCode}, error message: ${errorMessage}, email: ${email}, credential: ${credential}`);
    });

    function githubSignout() {
        firebase.auth().signOut().then(function () {
            console.log(`Signed out!`);
        }, function (error) {
            console.log(`Sign out didn't go as planned: ${error}`);
        });
    }
});