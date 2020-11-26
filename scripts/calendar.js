// NAVIGATION HAMBURGER

const hamburger = document.getElementById('hamburger');
const navUL = document.getElementById('nav-ul');

hamburger.addEventListener('click', () => {
    navUL.classList.toggle('show');
});

// ADVENT CALENDAR

const cocktailIds = ['178314', '17230', '12198', '17233', '17196', '17194', '17253', '12402', '17207', '15941', '12196', '17213', '11690', '17180', '11113', '11009', '178325', '178336', '11008', '11118', '178340', '11004', '11006', '11001']
var dayNumber = 0
var drink 
const single_cocktail_container = document.getElementById('single-cocktail-container')
const drinksArray = []
let drinksMap = new Map();

// FETCH COCKTAIL FROM API
function getCocktail() {

    for (cocktail of cocktailIds) {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktail}`)
            .then(res => res.json())
            .then(data => {
                const drink = data.drinks[0];
                drinksMap.set(drink.idDrink,drink);
            });      
    };
    // ONLY LET FLIP ON DAYS THAT ARE BEFORE NOW OR NOW
    setTimeout(function(){
        for(cocktailId of cocktailIds){
        dayNumber += 1
        var d = new Date().getDate();
        // var d = 2;
        if (dayNumber <= d) {
            addCocktailToDOM(dayNumber,drinksMap.get(cocktailId), true);  
        } 
        else {
            addCocktailToDOM(dayNumber,drinksMap.get(cocktailId), false);
        }            
        }
        }, 1000);
}

function addCocktailToDOM(dayNumber, drink, active) {
    const cocktailName = drink.strDrink
    const cocktailImage = drink.strDrinkThumb

    if (active) {
        single_cocktail_container.innerHTML +=
            `<div class="flip-card flip-card-active">
            <div class="flip-card-inner">
                <div class="card-front">
                    <img class="days-img" src="./assets/days/day${dayNumber}.jpg" alt="${dayNumber}day">
                </div>
                <div class="card-back">
                    <img class="cocktail" src="${cocktailImage}" alt="${cocktailName}">
                    <h3>${cocktailName}</h3>
                </div>
            </div>
        </div>`
    }
    else {
        single_cocktail_container.innerHTML +=
            `<div class="flip-card">
            <div class="flip-card-inner">
                <div class="card-front">
                    <img class="days-img" src="./assets/days/day${dayNumber}.jpg" alt="${dayNumber}day">
                </div>
                <div class="card-back">
                    <img class="cocktail" src="${cocktailImage}" alt="${cocktailName}">
                    <h3>${cocktailName}</h3>
                </div>
            </div>
        </div>`
    }
}

window.addEventListener('load', () => {
    getCocktail();
})

// TIME AND DATE
function realTimeClock() {
    let rtClock = new Date();

    let day = rtClock.getDate();
    let month = rtClock.getMonth();
    let year = rtClock.getFullYear();

    let hours = rtClock.getHours();
    let minutes = rtClock.getMinutes();

    // AM PM
    let amPm = (hours < 12) ? "AM" : "PM"

    // 12 hour format
    hours = (hours > 12) ? hours - 12 : hours;

    // Add zeros in front of minutes
    minutes = ("0" + minutes).slice(-2);

    // DISPLAY
    document.getElementById('date').innerHTML = year + ' / ' + month + ' / ' + day;
    document.getElementById('clock').innerHTML = hours + " : " + minutes + " " + amPm;
    setTimeout(realTimeClock, 1000);
}
realTimeClock();