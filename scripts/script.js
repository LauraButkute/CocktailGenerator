// HTML DOM
const search = document.getElementById('search'),
    submit = document.getElementById('submit'),
    drinks = document.getElementById('drink-name')
    description = document.getElementById('drink-description')
    img = document.getElementById('drink-image');



// SEARCH DRINK AND FETCH API

function searchDrink(e) {
    e.preventDefault();

    const term = search.value;

    if(term.trim()) {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${term}`)
            .then(res => res.json())
            .then(data => {console.log(data)
            drinks.innerHTML = `Results for '${term}':`

            if(data.drinks === null) {
                drinks.innerHTML = `No results for '${term}'`
            } else {
                description.innerHTML = data.drinks.map (drink =>
                    `<div class='drink'>
                        <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}"/>
                    </div>`
                )
                .join('');
            }
        });
        // CLEAR SEARCH AREA
        search.value = '';
    } else {
        alert('Enter search name');
    }

};
// event listener

submit.addEventListener('submit', searchDrink);