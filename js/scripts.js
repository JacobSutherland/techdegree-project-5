const gallerySection = document.querySelector('.gallery');
const body = document.querySelector('body')
const resultsUrl = 'https://randomuser.me/api/?results=12&nat=us';

//makes XMLHttpRequest and returns a promise object containing the results array
function fetchData(url) {
    return fetch(url)
    .then(res => res.json())
    .then(res => res.results)
}

//Loops through the results array and usees template literals to populate the employees personal information. The callback (constructModalWindow()) is triggered by the cards click event listener.
function constructCard(data, cb){
    for(let i = 0; i < data.length; i++){
        const template = `<div class="card">
        <div class="card-img-container">
            <img class="card-img" src='${data[i].picture.large}' alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${data[i].name.first} ${data[i].name.last}</h3>
            <p class="card-text">${data[i].email}</p>
            <p class="card-text cap">${data[i].location.city}, ${data[i].location.state}</p>
        </div>
        </div>`

        gallery.insertAdjacentHTML('beforeend', template);
        let card = document.querySelectorAll('.card')
        card[i].addEventListener('click', () => {
            cb(data);
        })
    }
 }

 //Loops through the data to check for the desired employee's info and appends that persons data to the modal
function constructModalWindow(data){
    for(let i = 0; i < data.length; i++){
    const modal = `<div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${data[i].picture.large}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${data[i].name.first} ${data[i].name.last}</h3>
                    <p class="modal-text">${data[i].email}</p>
                    <p class="modal-text cap">${data[i].location.city}, ${data[i].location.state}</p>
                    <hr>
                    <p class="modal-text">${data[i].cell}</p>
                    <p class="modal-text">${data[i].location.address}</p>
                    <p class="modal-text">Birthday: ${data[i].birthday}</p>
                </div>
            </div>

            // IMPORTANT: Below is only for exceeds tasks 
            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        </div>`
    body.insertAdjacentHTML('beforeend', modal);
    }
}

fetchData(resultsUrl)
.then(res => {
    constructCard(res, constructModalWindow)
    return res;
})
.catch(err => console.log(err))