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
        , loginGithubButton = document.getElementById('loginGithubButton')
        , displayMessages = document.getElementById('displayMessages');
    /****************************************
    ----INIT FOR FIREBASE (always run first)
    ****************************************/
    firebase.initializeApp(configFirebase);
    let currentUser;

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
        if (e.keyCode == '13' && currentUser && messageInput.value != '') {
            sendMessage();
        }
    });
    loginGithubButton.addEventListener('click', e => {
        if (!currentUser) {
            githubLogin();
        }
        else {
            githubSignout();
        }
    });
    //  update when changes occur and onload
    db().ref('/messages').limitToLast(50).on('value', (s) => {
        let data = s.val();
        firebase.auth().currentUser;
        console.log(currentUser);
        if (currentUser) {
            usernameInput.value = currentUser.displayName || currentUser.email;
            loginGithubButton.innerHTML = `<img src=${currentUser.photoURL}> logout`
        }
        else {
            usernameInput.value = `please log in`
            loginGithubButton.innerHTML = `<i class="fa fa-github" aria-hidden="true"></i> login`;
        }
        displayMessage(data);
    });
    //    firebase.auth().onAuthStateChanged(function (user) {
    //        // Once authenticated, instantiate Firechat with the logged in user
    //        if (!user) {
    //            
    //        }
    //    });
    /****************************************
    ----FUNCTIONS---------------------------
    ****************************************/
    function sendMessage() {
        let message = messageInput.value
            , userId = firebase.auth().currentUser.uid
            , username = firebase.auth().currentUser.currentUser[0].displayName || firebase.auth().currentUser.currentUser[0].email
            , time = new Date()
            , date = `${time.getHours()}:${time.getMinutes()} - ${time.getDate()}/${time.getMonth()+1}/${time.getFullYear()}`
            , newMessage = routes.messages(username, message, date, time.getTime())
            , user = routes.userMessage(userId, message, newMessage.key);
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
            <span class="reactions">+1</span></span> <span class="postDate">${messages[message].date}</span>`);
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
    function githubLogin() {
        const provider = new firebase.auth.GithubAuthProvider();
        firebase.auth().signInWithRedirect(provider);
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
    }

    function githubSignout() {
        firebase.auth().signOut().then(function () {
            console.log(`Signed out!`);
        }, function (error) {
            console.log(`Sign out didn't go as planned: ${error}`);
        });
    }
});