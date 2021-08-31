const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data.meals))
}

const displaySearchResult = meals => {
    const searchResult = document.getElementById('search-result');
    searchResult.innerHTML ='';
    meals.forEach(meal => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML =`
        <div onclick="displayFoodDetails(${meal.idMeal})" class="card h-100">
            <img width="200px" src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${meal.strMeal}</h5>
          <p class="card-text">${meal.strInstructions.slice(0,250)}</p>
        </div>
        </div>`;
        searchResult.appendChild(div)
    });
}

const displayFoodDetails = details => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${details}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayMealDetails(data.meals[0]))
}

const displayMealDetails = mealDetails => {
    const mealContainer = document.getElementById('mealContainer');
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML =`
    <img  src="${mealDetails.strMealThumb}" class="card-img-top w-100" alt="...">
    <div class="card-body">
      <h5 class="card-title">${mealDetails.strMeal}</h5>
      <p class="card-text">${mealDetails.strInstructions}</p>
      <a href="${mealDetails.strYoutube}" class="btn btn-primary">Go somewhere</a>
    
    `
    mealContainer.appendChild(div);
    
}
