// Set up chat
var socket;
$(document).ready(function(){
    
    socket = io.connect('https://' + document.domain + ':' + location.port + '/chat');
    socket.on('connect', function() {
        socket.emit('joined', {});
    });
    
    socket.on('status', function(data) {     
        let tag  = document.createElement("p");
        let text = document.createTextNode(data.msg);
        let element = document.getElementById("chat");
        tag.appendChild(text);
        tag.style.cssText = data.style;
        element.appendChild(tag);
        $('#chat').scrollTop($('#chat')[0].scrollHeight);

    });        
});

// Send message
var chat_messagebox = document.getElementById('chat-message-box');
chat_messagebox.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        // Grab message
        msg = chat_messagebox.value;

        // Reset message box
        chat_messagebox.value = '';

        // Emit message
        socket.emit('sending', {'msg' : msg});
    }
});

// Leave chat
var leave_chat_btn = document.getElementById('leave-chat-btn');
leave_chat_btn.addEventListener('click', (e) => {
    // Emit leaving message
    socket.emit('leaving', {}, function() {
        // Disconnect socket
        socket.disconnect();

        // Change to home page
        window.location.href = '/home';
    });
});