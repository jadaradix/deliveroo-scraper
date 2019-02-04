const fs = require('fs')
const assert = require('assert').strict
const Spider = require('node-spider')

assert(
  typeof process.env.POST_CODE === 'string' && process.env.POST_CODE.length > 0,
  'please provide POST_CODE environment variable; see README.md'
)

const restaurants = []

const spider = new Spider({
  // How many requests can be run in parallel
  concurrent: 1,
  // How long to wait after each request
  delay: 1,
  // A stream to where internal logs are sent, optional
  logs: process.stderr,
  // Re-visit visited URLs, false by default
  allowDuplicates: false,
  // If `true` all queued handlers will be try-catch'd, errors go to `error` callback
  catchErrors: true,
  // If `true` the spider will set the Referer header automatically on subsequent requests
  addReferrer: false,
  // If `true` adds the X-Requested-With:XMLHttpRequest header
  xhr: false,
  // If `true` adds the Connection:keep-alive header and forever option on request module
  keepAlive: false,
  // Called when there's an error, throw will be used if none is provided
  error: function (err, url) {
    console.error(err)
  },
  // Called when there are no more requests
  done: function () {
    fs.writeFileSync(
      './restaurants.json',
      JSON.stringify(restaurants, null, 2),
      'utf8'
    )
  },
  // All options are passed to `request` module, for example:
  headers: { 'user-agent': 'spidey' },
  encoding: 'utf8'
})

const handleMenu = function (doc) {
  var restaurant = (function () {
    var restaurantName = doc.$('.restaurant__name').html()
    var restaurantTags = []
    doc.$('.restaurant__metadata-tags .tag').each((index, tagElement) => {
      restaurantTags.push({
        name: tagElement.children[0].data,
        type: tagElement.attribs.class.substring(
          tagElement.attribs.class.indexOf(' ') + 1
        )
      })
    })
    var foodCategories = []
    var foods = []
    doc
      .$('.menu-index-page__menu-category')
      .each((index, foodCategoryElement) => {
        var foodCategory = {
          id: index,
          name: foodCategoryElement.children.find($ => $.name === 'h3')
            .children[0].data,
          foods: []
        }
        foodCategories.push(foodCategory)
        doc
          .$(foodCategoryElement)
          .find('.menu-index-page__item-content')
          .each((index, foodElement) => {
            var nameElement = doc
              .$(foodElement)
              .find('h6.menu-index-page__item-title span')
            var priceElement = doc
              .$(foodElement)
              .find('span.menu-index-page__item-price')
            var popularElement = doc
              .$(foodElement)
              .find('span.menu-index-page__item-popular')
            // var descriptionElement = doc.$(foodElement).find('p.menu-index-page__item-desc span span span')
            var food = {
              categoryId: index,
              name:
                nameElement.length > 0 ? nameElement[0].children[0].data : null,
              price:
                priceElement.length > 0
                  ? parseFloat(priceElement[0].children[0].data.substring(1))
                  : null,
              isPopular: popularElement.length === 1
              // description: (descriptionElement.length > 0 ? descriptionElement[0].children[0].data : null)
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
  restaurants.push(restaurant)
}

const handleRestaurantList = function (doc) {
  doc.$('a').each(function (i, elem) {
    // do stuff with element
    elem.attribs.href.indexOf('https://deliveroo.co.uk/menu') === 0 &&
      spider.queue(elem.attribs.href, handleMenu)
  })
}

// start crawling
spider.queue(
  `https://deliveroo.co.uk/restaurants/london/shoreditch?postcode=${
    process.env.POST_CODE
  }`,
  handleRestaurantList
)
