# Deliveroo Scraper (scraper-deliveroo)

This is a node-spider scraper for Deliveroo. It finds restaurants, their food categories, food and prices.

## What is Deliveroo?

"Deliveroo is on a mission to transform the way people order food. Deliveroo partners with the best restaurants in the business – from local hotspots to national favourites – and brings people the food they love, right to their door."

## Inputs

Look at `package.json`. You can configure the scraper with the `POST_CODE` environment variable:

```
POST_CODE=W1F7EY node index.js
```

## Data

The data is written to `restaurants.json`.

```
[
    {
        "name": "Chipotle  - London Wall",
        "tags": [
            {
                "name": "Mexican",
                "type": "locale"
            },
            {
                "name": "Vegetarian",
                "type": "dietary"
            },
            {
                "name": "Drinks",
                "type": "food"
            }
        ],
        "foodByCategory": [
            {
                "id": 0,
                "name": "Specials",
                "foods": [
                    {
                        "categoryId": 0,
                        "name": "The Protein Pump Bowl",
                        "price": 12.95,
                        "isPopular": true
                    },
                    {
                        "categoryId": 1,
                        "name": "The Vegan Boost",
                        "price": 9.95,
                        "isPopular": false
                    }
                ]
            },
            {
                "id": 1,
                "name": "Burrito",
                "foods": [
                    {
                        "categoryId": 0,
                        "name": "Chicken Burrito",
                        "price": 9.95,
                        "isPopular": true
                    },
                    {
                        "categoryId": 1,
                        "name": "Steak Burrito",
                        "price": 10.95,
                        "isPopular": true
                    }
                ]
            }
        ],
        "food": [
            {
                "categoryId": 0,
                "name": "The Protein Pump Bowl",
                "price": 12.95,
                "isPopular": true
            },
            {
                "categoryId": 1,
                "name": "The Vegan Boost",
                "price": 9.95,
                "isPopular": false
            }
        ]
    }
]
```
