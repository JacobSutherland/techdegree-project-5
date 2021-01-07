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
        card[i].addEventListener('click', () => {
            const currentIndex = i;
            cb(data, currentIndex); 
        })
    }
}

async function constructUserModal(employee, currentIndex){
    let modalContainer;
    let numberOfEmployees;
    for(let i = 0; i < employee.results.length; i++){
        const currentEmployeeIndex = employee.results[i];
            const modalHTML = 
            `<div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src='${currentEmployeeIndex.picture.large}' alt="profile picture">
                    <h3 id="name" class="modal-name cap">${currentEmployeeIndex.name.first}, ${currentEmployeeIndex.name.last}</h3>
                    <p class="modal-text">${currentEmployeeIndex.email}</p>
                    <p class="modal-text cap">${currentEmployeeIndex.location.city}</p>
                    <hr>
                    <p class="modal-text">${currentEmployeeIndex.phone}</p>
                    <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
                    <p class="modal-text">Birthday: ${currentEmployeeIndex.dob.date}</p>
                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>
            </div>
        </div>`
            const userModal = modalHTML;
            body.insertAdjacentHTML('beforeend', userModal);
            const exitModal = document.querySelectorAll('.modal-close-btn')
            modalContainer = document.querySelectorAll('.modal-container')
            const modal = document.querySelectorAll('.modal')
            const card = document.querySelectorAll('.card')
            const modalPrevBtn = document.querySelectorAll('.modal-prev')
            const modalNextBtn = document.querySelectorAll('.modal-next')
            numberOfEmployees = card.length;

            modalContainer[i].style.display = 'none';

            exitModal[i].addEventListener('click', () => {
                modalContainer.forEach( i => {
                    body.removeChild(i);
                })
             })

            modalPrevBtn[i].addEventListener('click', () => {
                let previous = i;
                previous--;
                modalContainer[previous].style.display = 'block';
                modalContainer[i].style.display = 'none';
            });         

            modalNextBtn[i].addEventListener('click', () => {
                let next = i;
                next++;
                console.log(next)
                modalContainer[next].style.display = 'block';
                modalContainer[i].style.display = 'none';
            })
        }
        for(let j = 0; j < numberOfEmployees; j++){
            if(j !== currentIndex){
                modalContainer[j].style.display = 'none';
            } else {
                modalContainer[j].style.display = 'block'
            }
    }
}


fetchData(userUrl)
.then( res => {
    constrsuctUserCard(res, constructUserModal) 
    return res;
})
.then( res => console.log(res) )