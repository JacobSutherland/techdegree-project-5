// -------------- Search Functionality -------------- //

//accepts data and reformats it into an array containing only the first and last name results
function listActiveEmployees(data){
    const activeEmployees = data.results.map( i => {
        return `${i.name.first.toLowerCase()} ${i.name.last.toLowerCase()}`;
    });
    return activeEmployees;
}

//accepts the array of employee names to compare against the text values inside the cards H3 tags
function searchEmployees(employees){
    const cardNames = document.querySelectorAll('.card-name')
    const card = document.querySelectorAll('.card')

    searchBtn.addEventListener('click', () => {
        let results = 0;
        const userInput = searchField.value.toLowerCase();
        const firstInputLetter = userInput[0]
        const filteredNames = employees.filter( i => {
            return i.includes(userInput);
        });
        //prevents search when search field is empty
        if(searchField.value === ''){
            return false;
        }
            //loops every card and checks if the card at the index matches, and if they start with the same letter to reduce partial matches, finally hiding and showing them if they meet the conditions
            for(let i = 0; i < gallerySection.children.length; i++){
                let firstCardLetter = cardNames[i].textContent.toLowerCase()[0];
                if(filteredNames.includes(cardNames[i].textContent.toLowerCase()) && firstCardLetter === firstInputLetter){
                    card[i].style.display = 'block'
                    } else {
                        card[i].style.display = 'none'
                        results += 1;
                    }
                    //creates a message to tell user that no results were returned from a search
                    const messageContainer = document.createElement('div');
                    const message = document.createElement('p');
                    message.textContent = 'No Results'
                    messageContainer.appendChild(message);
                    if(results > gallerySection.children.length - 1 && body.contains(messageContainer) === false){
                    body.appendChild(messageContainer);
                    } 
                    //removes the message when a new search is made
                    searchField.addEventListener('change', () => {
                        if(body.contains(messageContainer)){
                            body.removeChild(messageContainer);
                        }
                })
                //removes the message if  a search made and the input hasn't changed (prevents multiple messages)
                searchBtn.addEventListener('click', () => {
                    if(body.contains(messageContainer)){
                        body.removeChild(messageContainer);
                    }
            })
            }
    })
    //empties search text field and displays all results when field is emptied
    searchField.addEventListener('change', () => {
        if(searchField.value === ''){
            for(let i = 0; i < gallerySection.children.length; i++){
                card[i].style.display = 'block';
            }
        }
    })
}