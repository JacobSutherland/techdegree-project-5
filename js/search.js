// -------------- Search Functionality -------------- //

document.querySelector(".search-container").innerHTML = `
    <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>
`;

const searchBtn = document.querySelector('.search-submit');
const searchField = document.querySelector('.search-input');

const messageContainer = document.createElement('div');
        const message = document.createElement('p');
        message.textContent = 'No Results';
        messageContainer.appendChild(message);

//accepts data and reformats it into an array containing only the first and last name results
function listActiveEmployees(data){
    const activeEmployees = data.results.map( i => {
        return `${i.name.first.toLowerCase()} ${i.name.last.toLowerCase()}`;
    });
    return activeEmployees;
}

//accepts the array of employee names to compare against the text values inside the cards H3 tags
function searchEmployees(employees){
    const cardNames = document.querySelectorAll('.card-name');
    const card = document.querySelectorAll('.card');
    let matches = 0;

    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const userInput = searchField.value.toLowerCase();
        const filteredNames = employees.filter( i => {
            return i.includes(userInput);
        });
        //prevents search when search field is empty
        if(searchField.value === ''){
            return false;
        }
    
        //loops every card and checks if the card at the index matches, finally hiding and showing them if they meet the conditions
        for(let i = 0; i < gallerySection.children.length; i++){
            if(filteredNames.includes(cardNames[i].textContent.toLowerCase())){
                card[i].style.display = 'flex';
                matches += 1;
                } else {
                    card[i].style.display = 'none';
                }
        }
        if(matches === 0 && body.contains(messageContainer) === false){
            body.appendChild(messageContainer);
        } else if(matches > 0 && body.contains(messageContainer)){
            body.removeChild(messageContainer)
        } 
        matches = 0;
    })
    //empties search text field and displays all results when field is emptied
    searchField.addEventListener('change', () => {
        if(searchField.value === ''){
            body.removeChild(messageContainer)
            for(let i = 0; i < gallerySection.children.length; i++){
                card[i].style.display = 'flex';
            }
        }
    })
}