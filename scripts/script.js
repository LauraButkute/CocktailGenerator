// NAV BAR HAMBURGER
const hamburger = document.getElementById('hamburger');
const navUL = document.getElementById('nav-ul');

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
            resultHeading.innerHTML = `<h2>Search results for '${term}': </h2>`

            if(data.drinks === null) {
                drinks.innerHTML = `
                    <div class='no-result'>
                        <img src="/assets/1.jpg">
                    </div>`;
                resultHeading.innerHTML = `<h2>No results for '${term}'</h2>`
            }
            else if(term.length < 3) {
                drinks.innerHTML = `
                    <div class='no-result'>
                        <img src="/assets/1.jpg">
                    </div>`;
                resultHeading.innerHTML = `<h2>No results for '${term}'</h2>`
            } else {
                drinks.innerHTML = data.drinks.map(drink =>
                    `<div class='drink'>
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
        resultHeading.innerHTML = `<h2>Fill in the search area!</h2>`
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
        if(drink[`strIngredient${i}`] && drink[`strMeasure${i}`] != null) {
            ingredients.push(`${drink[`strIngredient${i}`]} - ${drink[`strMeasure${i}`]}`)
        } else if (drink[`strIngredient${i}`] && drink[`strMeasure${i}`] === null){
            ingredients.push(`${drink[`strIngredient${i}`]}`)
        } else {
            break;
        }
    }
    
    single_drink.innerHTML =
        `<img class='main-image' src='${drink.strDrinkThumb}' alt='${drink.strDrink}'/>
        <div class='single-drink-info'>
            <h1>${drink.strDrink}</h1>
            <h2>Glass</h2>
            ${drink.strGlass ? `<p>${drink.strGlass}</p>` : ''}
            <h2>Method</h2>
            <p>${drink.strInstructions}</p>
            <h2>Ingredients</h2>
            <ul>
                ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
        </div>`;

        // GET SENT TO WEB BOTTOM WHERE INFO IS
        const elmnt = document.getElementById("single-drink");
        elmnt.scrollIntoView();
}

// EVENT LISTENERS
if (submit != null) {
    submit.addEventListener('submit', searchDrink)
};

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

hamburger.addEventListener('click', () => {
    navUL.classList.toggle('show');
});
