// HTML DOM
const search = document.getElementById('search'),
    submit = document.getElementById('submit'),
    drinks = document.getElementById('drink-name')
    resultHeading = document.getElementById('result-heading')
    single_drink = document.getElementById('single-drink');



// SEARCH DRINK AND FETCH API

function searchDrink(e) {
    e.preventDefault();

    single_drink.innerHTML = '';

    const term = search.value;

    if(term.trim()) {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${term}`)
            .then(res => res.json())
            .then(data => {console.log(data)
            resultHeading.innerHTML = `<h2>Results for '${term}': </h2>`

            if(data.drinks === null) {
                drinks.innerHTML = `
                    <div class='no-result'><img src="/assets/2.jpg"></div>`;
                resultHeading.innerHTML = `<h2>No results for '${term}'</h2>`
            } else {
                drinks.innerHTML = data.drinks.map (drink =>`
                    <div class='drink'>
                        <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}"/>
                        <div class="drink-info" data-drinkID="${drink.idDrink}">
                            <h3>${drink.strDrink}</h3>
                        </div>
                    </div>`
                )
                .join('');
            }
        });
        // CLEAR SEARCH AREA
        search.value = '';
    } else {
        alert('Please fill the search area');
    }
}
// GETTING INFO OF COCKTAIL ON CLICK
function getDrinkInfo(drinkID) {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkID}`)
        .then(res => res.json())
        .then(data => {
            const drink = data.drinks[0];

            addDrinkToDOM(drink);
        });
}

// ADD DRINKS TO DOM
function addDrinkToDOM(drink) {
    const ingredients = [];

    for (let i = 1; i < 15; i++) {
        if(drink[`strIngredient${i}`]) {
            ingredients.push(`${drink[`strIngredient${i}`]} - ${drink[`strMeasure${i}`]}`)
        } else {
            break;
        }
    }
    
    single_drink.innerHTML = `
        <div class='single-drink'>
            <h1>${drink.strDrink}</h1>
            <img src='${drink.strDrinkThumb}' alt='${drink.strDrink}'/>
            <div class='single-drink-info'>
                ${drink.strIBA ? `<p>${drink.strIBA}</p>` : ''}
                ${drink.strGlass ? `<p>${drink.strGlass}</p>` : ''}
            </div>
            <div class='main'>
                <p>${drink.strInstructions}</p>
                <h2>Ingredients</h2>
                    <ul>
                        ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                    </ul>
            </div>
        </div>
    `;
}

// EVENT LISTENERS

submit.addEventListener('submit', searchDrink);

drinks.addEventListener('click', e => {
    const drinkInfo = e.path.find(item => {
        if(item.classList) {
            return item.classList.contains('drink-info')
        } else {
            return false;
        }
    });
    
    if(drinkInfo) {
        const drinkID = drinkInfo.getAttribute('data-drinkid');
        getDrinkInfo(drinkID);
    }
});