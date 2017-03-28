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
            messages: (userId, message, date, timestamp, key) => db().ref('messages/').push({
                userId: userId
                , message: message
                , date: date
                , timestamp: timestamp
            })
            , users: (userId) => db().ref('users/' + userId).set({
                userId: userId
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
    /****************************************
    ----SIGN IN/OUT WITH GITHUB ACCOUNT------
    ****************************************/
    function githubLogin() {
        const provider = new firebase.auth.GithubAuthProvider();
        firebase.auth().signInWithRedirect(provider);
    }
    firebase.auth().getRedirectResult().then(function (result) {
        if (result.credential) {
            // This gives you a GitHub Access Token. You can use it to access the GitHub API.
            let token = result.credential.accessToken;
            // ...
            console.log(`Token: ${token}`)
        }
        // The signed-in user info.
        let user = result.user;
        console.log(user);
    }).catch(function (error) {
        console.log(`Inside catch`)
            // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        // The email of the user's account used.
        let email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        let credential = error.credential;
        // ...
        console.log(`Error code: ${errorCode}, error message: ${errorMessage}, email: ${email}, credential: ${credential}`);
    });

    function githubSignout() {
        firebase.auth().signOut().then(function () {
            console.log(`Signed out!`);
        }, function (error) {
            console.log(`Sign out didn't go as planned: ${error}`);
        });
    }
    /****************************************
    ----EVENT LISTENER----------------------
    ****************************************/
    //  sends data to the server on button click
    btnSend.addEventListener('click', (e) => {
        if (usernameInput.value != '' && messageInput.value != '') sendMessage();
        else console.log('Enter username and/or message');
    });
    //  sends data to the server on keypress enter
    messageInput.addEventListener('keypress', (e) => {
        if (e.keyCode == '13' && usernameInput.value != '' && messageInput.value != '') {
            sendMessage();
        }
    });
    loginGithubButton.addEventListener('click', e => {
        if (!firebase.auth().currentUser) {
            let login = new githubLogin();
        } else {
            githubSignout();
        }
    });
    //  update when changes occur
    db().ref('/messages').limitToLast(50).on('value', (s) => {
        let data = s.val();
        displayMessage(data);
    });
    /****************************************
    ----FUNCTIONS---------------------------
    ****************************************/
    function sendMessage() {
        let message = messageInput.value
            , userId = usernameInput.value
            , time = new Date()
            , date = `${time.getHours()}:${time.getMinutes()} - ${time.getDate()}/${time.getMonth()+1}/${time.getFullYear()}`
            , newMessage = routes.messages(userId, message, date, time.getTime())
            , user = routes.userMessage(userId, message, newMessage.key);
        messageInput.value = '';
    }

    function displayMessage(messages) {
        displayMessages.innerHTML = '';
        let messageArray = [];
        for (let message in messages) {
            messageArray.push(`<span class="postUser">${messages[message].userId}</span> <span class="postMessage">${messages[message].message}</span> <span class="postDate">${messages[message].date}</span>`);
        }
        for (let i = messageArray.length - 1; i >= 0; i--) {
            let liMessage = document.createElement('li');
            liMessage.innerHTML = `${messageArray[i]}`;
            displayMessages.appendChild(liMessage);
        }
    }
});