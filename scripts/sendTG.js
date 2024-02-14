document.addEventListener('DOMContentLoaded', function() {

        document
            .querySelector('#sendChall')
            .addEventListener('click', function(event) {
            event.preventDefault();
            // получаем элемент формы
            const form = this.form;
            // создаем объект данных формы
            const data = new FormData(form);
            // получаем url-адрес на которые будем отправлять запрос
            const url = form.action;

            const file = document.getElementById('file').value
            const nameSendTg = document.getElementById('nameSendTg').value
            const text = document.getElementById('textSendTg').value

            if (nameSendTg.length === 0 || text.length === 0 || !file) {
                console.log(name, text, file)
            }else {
                fetch(url, {
                    method: 'POST',
                    body: data
                })
                .then(() => {
                    document.getElementById('nameSendTg').value = ''
                    document.getElementById('textSendTg').value = ''
                    document.getElementById('file').value = ''
                })
            }
            
        });
    });
