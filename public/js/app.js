const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.getElementById('message-one');
const messageTwo = document.getElementById('message-two');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then(({ error, location, forecast }) => {
            if (error) {
                return messageOne.textContent = `${error}`;
            };
            messageOne.textContent = `${location}`;
            messageTwo.textContent = `${forecast}`;
        });
    }); 
});
