const gallerySection = document.querySelector('.gallery');
const body = document.querySelector('body');
const userUrl = 'https://randomuser.me/api/?results=12&nat=us';

//requests data from specified URL, parses it to JSON, and returns it in the form of a promise
async function fetchData(url){
    try{
        let response = await fetch(url);
        let data = response.json();
        return data;
    } catch(err){
        console.log(err)
    }
}

//accepts data to constructs the html for employee cards to populate the page and a callback to pass the data and the index of the clicked user card
function constrsuctUserCard(data, cb){
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
        //a card is clicked, it's index value is saved to be referenced later, amd constructModal is called, accepting said current index and data
        card[i].addEventListener('click', () => {
            const currentIndex = i;
            cb(data, currentIndex); 
        })
    }
}

//accepts data to construct the modal card and an index value representing the user card that was clicked
function constructUserModal(employee, currentIndex){
    //variables hoisted to allow access to scope
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
                    <p class="modal-text">${currentEmployeeIndex.location.street.number} ${currentEmployeeIndex.location.street.name}, ${currentEmployeeIndex.location.city} ${currentEmployeeIndex.location.state}, ${currentEmployeeIndex.location.postcode}</p>
                    <p class="modal-text">Birthday: ${currentEmployeeIndex.dob.date.slice(0,10)}</p>
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
            const card = document.querySelectorAll('.card')
            const modalPrevBtn = document.querySelectorAll('.modal-prev')
            const modalNextBtn = document.querySelectorAll('.modal-next')
            numberOfEmployees = card.length;

            //hides all modal cards initially
            modalContainer[i].style.display = 'none';

            //adds event listener & 'X' icon click removes all instabces of modals
            exitModal[i].addEventListener('click', () => {
                modalContainer.forEach( i => {
                    body.removeChild(i);
                })
             })

             //adds event listeners to previous buttons and uses the index value to change display values on previous modalContainer Elements relative to the current iteration's value
            modalPrevBtn[i].addEventListener('click', () => {
                let previous = i;
                if(previous > 0){
                    previous--;
                    modalContainer[previous].style.display = 'block';
                    modalContainer[i].style.display = 'none';
                }
            });         

            //adds event listeners to next buttons  and uses the index value to change display values on following modalContainer Elements relative to the current iteration's value
            modalNextBtn[i].addEventListener('click', () => {
                let next = i;
                if(next < numberOfEmployees - 1){
                    next++;
                    modalContainer[next].style.display = 'block';
                    modalContainer[i].style.display = 'none';
                }
            })
        }
        //loops the length of data results and checks whether or not the current itteration is equal to the clicked card, finally hiding modals not matching clicked card's index, and showing the one that does
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
.then( res => listActiveEmployees(res))
.then(res => {
    searchEmployees(res)
    return res;
})
.catch(err => Error(err))