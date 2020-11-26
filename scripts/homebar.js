var resultHeading = document.getElementById('result-heading');
var ingredients = document.getElementById('ingredients');

function getingredients () {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list`)
        .then(res => res.json())
        .then(data => {//console.log(data)//              
            data.drinks = data.drinks.sort(compare);                
            ingredients.innerHTML = data.drinks.map(drink =>
                `<div class='ingredient'>                    
                    <div class="ingredient-info" data-ingredient="${drink.strIngredient1}">
                        <h3 onclick="getcocktails(this);">${drink.strIngredient1}</h3>
                    </div>            
                </div>`
            )
            .join('');
    });
}
getingredients();

// SORTING ALPHABETICALLY
function compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const bandA = a.strIngredient1.toUpperCase();
    const bandB = b.strIngredient1.toUpperCase();
  
    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  }

function getcocktails (ingredient){
    var description = ingredient.innerText;
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${description}`)
            .then(res => res.json())
            .then(data => {
                var singleDrink = document.getElementById('single-drink');
                singleDrink.innerHTML ="";
                
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
        );
        // SCROLL TO POSSIBLE COCKTAILS BASED ON INGREDIENT
        const elmnt = document.getElementById("drink-name");
        elmnt.scrollIntoView();
}
