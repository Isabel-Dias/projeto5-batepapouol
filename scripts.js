axios.defaults.headers.common['Authorization'] = 'xNNj8RExIeDgYQo2DDJXfbFR';

//update messages

    const messagesPromise = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages');
    messagesPromise.then(processarResposta); 

    function processarResposta(message) {
        const messageColumn = document.querySelector('.message-column')
        console.log(message.data[0]);
        for(let i = 0; i < message.data.length; i++){
            let messageData = message.data[i]
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
    //setInterval(getMessages, 3000)

//prompt ask for name
//const username = prompt('Por favor, digite seu nome de usuário:')


