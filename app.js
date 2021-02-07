// Catch the all needed element

const searchBar = document.getElementById('search-bar');
const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal-list');
const mealHeading = document.getElementById('meal-heading');
const mealDetail = document.getElementById('meal-detail');

// Searching part of meal -- Called with onclick event

function searchFood() {

    mealDetail.innerHTML = '';

    let searchValue = searchBar.value;

    searchValue = searchValue.trim(); // Not to take spaces

    if (searchValue == "") {
        mealHeading.innerHTML = `<h3 style="color:red" class="result-heading">Please type a name of food!</h3>`
    }
    else {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
            .then(res => res.json())
            .then(data => {

                mealHeading.innerHTML = `<h3 class="result-heading">Here are the results for: ${searchValue}</h3>`
                searchBar.value = '';

                if (data.meals === null) {
                    mealHeading.innerHTML = `<h3 style="color:red" class="error-heading">Sorry no results for: ${searchValue}</h3>`
                }
                else {
                    mealList.innerHTML = data.meals.map((meal) =>

                        `
                        <div onclick="getFoodName('${meal.idMeal}')" class="food">
                            <img src="${meal.strMealThumb}">
                            <div class="Food-info">
                                <h4 class="food-name">${meal.strMeal}</h4>
                            </div>
                        </div>
                    
                    `
                    ).join("");
                }

            });
    }
}

// New part for food details to show --- Function called in onclick

const getFoodName = foodId => {

    hideEverything(); // To hide the food list and search bar, function is at the bottom

    const url = (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`);

    fetch(url)
        .then(res => res.json())
        .then(data => showFoodDetails(data.meals[0]));
}

const showFoodDetails = foodInfo => {
    console.log(foodInfo);
    mealDetail.innerHTML = `
    
        <div class="food-details">
            <img src="${foodInfo.strMealThumb}">
            <h5>${foodInfo.strMeal}<h5>
            <p>Ingredients given below,<p>
            <div>${foodInfo.strIngredient1}</div>
            <div> ${foodInfo.strIngredient2}</div>
            <div> ${foodInfo.strIngredient3}</div>
            <div> ${foodInfo.strIngredient4}</div>
            <div> ${foodInfo.strIngredient5}</div>
        </div>
    
    `
}

const hideEverything = () => {

    document.getElementById('meal-list').style.display = 'none';
    mealHeading.style.display = 'none';
    searchBar.style.display = 'none';
    searchBtn.style.display = 'none';
}

// Thanks a lot for your time to check my performance, do your best judgement