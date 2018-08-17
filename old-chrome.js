var restaurant = (function () {
  var restaurantName = document.querySelector('.restaurant__name span').innerHTML
  var restaurantTags = Array.from(document.querySelectorAll('.restaurant__metadata-tags .tag')).map(function (tagElement) {
    return {
      name: tagElement.innerHTML,
      type: tagElement.classList[1]
    }
  })
  var foodCategories = []
  var foods = []
  Array.from(document.querySelectorAll('.menu-index-page__menu-category')).forEach(function (foodCategoryElement, $$) {
    var foodCategory = {
      id: $$,
      name: foodCategoryElement.querySelector('h3').innerHTML,
      foods: []
    }
    foodCategories.push(foodCategory)
    foodCategoryElement.querySelectorAll('.menu-index-page__item-content').forEach(function (foodElement) {
      var nameElement = foodElement.querySelector('h6.menu-index-page__item-title span')
      var descriptionElement = foodElement.querySelector('p.menu-index-page__item-desc')
      var priceElement = foodElement.querySelector('span.menu-index-page__item-price')
      var food = {
        categoryId: $$,
        name: nameElement.innerHTML,
        description: descriptionElement ? descriptionElement.innerHTML : null,
        price: priceElement ? parseFloat(priceElement.innerHTML.substring(1)) : null,
        isPopular: (foodElement.querySelector('span.menu-index-page__item-popular') ? true : false)
      }
      foodCategory.foods.push(food)
      foods.push(food)
    })
  })

  return {
    name: restaurantName,
    tags: restaurantTags,
    foodByCategory: foodCategories,
    food: foods
  }  
})()
