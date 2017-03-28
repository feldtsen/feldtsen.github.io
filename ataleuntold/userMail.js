$('#user-send').on('click', userSendEmail)
$('#user-send').on('click', mailToAdmin)
var clientId = '441425510644-i2u29nplsvf01m0b0ncaomqo1emii7d4.apps.googleusercontent.com';
var apiKey = 'AIzaSyAxnGi8wnvPuI5ZVXtCyi5283Cc98-OPp4';
var scopes = 'https://www.googleapis.com/auth/gmail.readonly ' + 'https://www.googleapis.com/auth/gmail.send';

function handleClientLoad() {
    gapi.client.setApiKey(apiKey);
    window.setTimeout(checkAuth, 1);
}

function checkAuth() {
    gapi.auth.authorize({
        client_id: clientId
        , scope: scopes
        , immediate: true
    }, handleAuthResult);
}

function handleAuthClick() {
    gapi.auth.authorize({
        client_id: clientId
        , scope: scopes
        , immediate: false
    }, handleAuthResult);
    return false;
}

function handleAuthResult(authResult) {
    if (authResult && !authResult.error) {
        loadGmailApi();
        $('#authorize-button').remove();
        $('.table-inbox').removeClass("hidden");
        $('#compose-button').removeClass("hidden");
    }
    else {
        $('#authorize-button').removeClass("hidden");
        $('#authorize-button').on('click', function () {
            handleAuthClick();
        });
    }
}

function loadGmailApi() {
    gapi.client.load('gmail', 'v1');
}

function mailToAdmin() {
    $('#user-send').addClass('disabled');
    userSendMessage({
        'To': 'infoastoryuntold@gmail.com'
        , 'Subject': 'Mail from ' + $('#user-email').val()
    }, 'Subscription: ' + $('#user-email').val() + " want to recieve newsletter", composeTidy);
    return false;
}

function userSendEmail() {
    $('#user-send').addClass('disabled');
    userSendMessage({
        'To': $('#user-email').val()
        , 'Subject': 'Newsletter'
    }, 'You signed up with this mail, ' + $('#user-email').val() + ', for newsletter!', composeTidy);
    return false;
}

function composeTidy() {
    $('#send-to').val('infoastoryuntold@gmail.com');
    $('#user-name').val('');
    $('#user-email').val('');
}

function userSendMessage(headers_obj, message, callback) {
    var email = '';
    for (var header in headers_obj) email += header += ": " + headers_obj[header] + "\r\n";
    email += "\r\n" + message;
    var sendRequest = gapi.client.gmail.users.messages.send({
        'userId': 'me'
        , 'resource': {
            'raw': window.btoa(email).replace(/\+/g, '-').replace(/\//g, '_')
        }
    });
    return sendRequest.execute(callback);
}