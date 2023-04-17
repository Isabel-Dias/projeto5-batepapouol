axios.defaults.headers.common['Authorization'] = '';

const username = prompt('Por favor, digite seu nome de usuário:');

checkName();
setInterval(statusCheck, 5000);
setInterval(checkMessages, 3000);

//check name validity
function checkName() {
    const usernamePromise = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', {name: username}); 
    usernamePromise.catch(nameError);
    console.log(usernamePromise);   
}

function nameError() {
    alert('Este nome de usuário já está cadastrado, por favor escolha outro.'); 
    const username = prompt('Por favor, digite seu nome de usuário:');
    checkName();
}

//check status

function statusCheck() {
    statusPromise = axios.post('https://mock-api.driven.com.br/api/vm/uol/status', {name: username});  
}

//send messages
function checkMessages() {
    const messagesPromise = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages');
    messagesPromise.then(sendMessage);
    messagesPromise.catch(printError);
}

function printError(errorMessage) {
    console.log(errorMessage.response);
}
   
checkMessages();

function sendMessage(message) {
    document.querySelector('.message-column').innerHTML = "";
    const messageColumn = document.querySelector('.message-column');
    for(let i = 0; i < message.data.length; i++){
        let messageData = message.data[i];
        if(messageData.type == 'status'){
            messageColumn.innerHTML += `
                <div class="status-message"> 
                    <span class="time">(${messageData.time})</span>
                    <span class="user">${messageData.from}</span>
                    <span class="text">${messageData.text}</span>
                </div>
            `;
        } else if(messageData.type == 'message'){
            messageColumn.innerHTML += `
                <div class="message"> 
                    <span class="time">(${messageData.time})</span>
                    <span class="user">${messageData.from}</span>
                    <span class="text">para</span>
                    <span class="user">${messageData.to}: </span>
                    <span class="text">${messageData.text}</span>
                </div>
            `;
        } else if(messageData.type == 'private_message'){
            messageColumn.innerHTML += `
                <div class="private-message"> 
                    <span class="time">(${messageData.time})</span>
                    <span class="user">${messageData.from}</span>
                    <span class="text">para</span>
                    <span class="user">${messageData.to}: </span>
                    <span class="text">${messageData.text}</span>
                </div>
            `;
        }
    }
    
}

//reload page
function reloadPage() {
    window.location.reload()
}

//send message
function sendNewMessage() {
    let messageText = document.querySelector('.message-box').value; 
    const newMessagePromise = axios.post(
        'https://mock-api.driven.com.br/api/vm/uol/messages',
        {
            from: username,
            to: "Todos",
            text: messageText,
            type: "message"
        }
    );

    newMessagePromise.then(checkMessages);
    newMessagePromise.catch(reloadPage);
}

