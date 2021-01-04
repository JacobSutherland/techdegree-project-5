const searchContainer = document.querySelector('.search-container');
const gallerySection = document.querySelector('.gallery');
const body = document.querySelector('body');
const userUrl = 'https://randomuser.me/api/?results=12&nat=us';

async function fetchData(url){
    let response = await fetch(url);
    let data = response.json();
    return data;
}
 
async function constrsuctUserCard(data, cb){
    for(let i = 0; i < data.results.length; i++){
        const currentDataIndex = data.results[i];
        const userCardHTML =
        `<div class="card ${currentDataIndex.name.first}">
            <div class="card-img-container">
                <img class="card-img" src='${currentDataIndex.picture.large}' alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${currentDataIndex.name.first} ${currentDataIndex.name.last}</h3>
                <p class="card-text">${currentDataIndex.email}</p>
                <p class="card-text cap">${currentDataIndex.location.city}, ${currentDataIndex.location.state}</p>
            </div>
        </div>`
        const userCard = userCardHTML;
        gallerySection.insertAdjacentHTML('beforeend', userCard);
        const card = document.querySelectorAll('.card');
        card[i].addEventListener('click', async () => {
            if(card[i].classList.contains(`${currentDataIndex.name.first}`)){
            console.log(card[i])
            const activeCard = currentDataIndex;
            await cb(activeCard);
            }
        })
    }
}

async function constructUserModal(data){
            const modalHTML = 
            `<div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src='${data.picture.large}' alt="profile picture">
                    <h3 id="name" class="modal-name cap">${data.name.first}, ${data.name.last}</h3>
                    <p class="modal-text">${data.email}</p>
                    <p class="modal-text cap">${data.location.city}</p>
                    <hr>
                    <p class="modal-text">${data.phone}</p>
                    <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
                    <p class="modal-text">Birthday: ${data.dob.date}</p>
            </div>
        </div>`
                
            const userModal = modalHTML;
            body.insertAdjacentHTML('beforeend', userModal);
            const exitModal = document.querySelector('.modal-close-btn')
            const modalContainer = document.querySelector('.modal-container')
            exitModal.addEventListener('click', () => {
                body.removeChild(modalContainer);
        })
}


fetchData(userUrl)
.then( res => {
    constrsuctUserCard(res, constructUserModal) 
    return res;
})
.then( res => console.log(res) )