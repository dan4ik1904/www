const popup = document.getElementById('popup')
let IDevent = ''

function openPopupEvent(eventId) {
    IDevent = eventId
    popup.classList.toggle('active')
    fetch('/api/event/'+eventId)
        .then(res => res.json())
        .then(event => {
            document.getElementById('aboutEditEvent').value = event.about
            document.getElementById('nameEditEvent').value = event.name
            document
                .querySelector('#editEventBtn')
                .addEventListener('click', function(event) {
                    event.preventDefault();
                    // получаем элемент формы
                    const form = this.form;
                    // создаем объект данных формы
                    const data = new FormData(form);
                    // получаем url-адрес на которые будем отправлять запрос
                    const url = form.action;
                    const nameEvent = document.getElementById('nameEditEvent').value
                    const aboutEvent =  document.getElementById('aboutEditEvent').value

                    if (nameEvent.length === 0 || aboutEvent.length === 0) {
                        console.log(aboutEvent, nameEvent)
                    }else {
                        fetch(url+eventId, {
                            method: 'POST',
                            body: data
                        })
                        .then(() => {
                            window.location.reload()
                        })
                    }
                
});
        })
}

function deleteEvent() {
    fetch(`/api/delete/event/${IDevent}`)
        .then(() => {
            window.location.href = '/'
        })
}

function closePopupEvent() {
    IDevent = ''
    popup.classList.toggle('active')
}