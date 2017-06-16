$('#check-send').on('click', checkSendEmail)
$('#check-send').on('click', checkToAdmin)
$('#check-send').on('click', clearInput)



function checkToAdmin() {
    $('#check-send').addClass('disabled');
    userSendMessage({
        'To': 'infoastoryuntold@gmail.com'
        , 'Subject': 'Order from costumer: ' + $('#check-name').val() + ' - ' + $('#check-email').val()
    }, 'Order! ' + $('#check-name').val() + ', wants to reserve following books: ' + localStorage.getItem('storageBookCart'), composeTidy);
    return false;
}

function checkSendEmail() {
    $('#check-send').addClass('disabled');
    userSendMessage({
        'To': $('#check-email').val()
        , 'Subject': 'Order from A Tale Untold'
    }, 'Thanks, ' + $('#check-name').val() + ', for your order. Get your books within 24hrs! ' + ' Your reservation: '+ localStorage.getItem('storageBookCart'), composeTidy);
    return false;
}

function clearInput() {
    $('#check-name').val('');
    $('#check-email').val('');
}
