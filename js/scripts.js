const gallerySection = document.querySelector('.gallery');

function fetchData() {
    return fetch('https://randomuser.me/api/?results=12&nat=us')
    .then(res => res.json())
    .then(res => res)
    .then(res => res.results)
}

fetchData()
.then(res => constructCard(res))
.catch(err => console.log(err))

function constructCard(data){
    for(let i = 0; i < data.length; i++){
        const card = `<div class="card">
        <div class="card-img-container">
            <img class="card-img" src='${data[i].picture.large}' alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${data[i].name.first} ${data[i].name.last}</h3>
            <p class="card-text">${data[i].email}</p>
            <p class="card-text cap">${data[i].location.city}, ${data[i].location.state}</p>
        </div>
        </div>`
        gallery.insertAdjacentHTML('beforeend', card)
    }
 }

function constructModalWindow(data){
    const modal = `<div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
                        <h3 id="name" class="modal-name cap">name</h3>
                        <p class="modal-text">email</p>
                        <p class="modal-text cap">city</p>
                        <hr>
                        <p class="modal-text">(555) 555-5555</p>
                        <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
                        <p class="modal-text">Birthday: 10/21/2015</p>
                    </div>
                </div>

                // IMPORTANT: Below is only for exceeds tasks 
                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>`
    body.insertAdjacentHTML('beforeend', modal)
}
