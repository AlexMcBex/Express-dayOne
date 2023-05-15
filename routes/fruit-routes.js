// we require express module
const express = require('express')

// we need to set up router, in order to keep our routes in other files.
const router = express.Router()

const fruits = require('../models/fruits')

// the GET fruits route -> aka INDEX route
// the /fruits endpoint will respond with an array of fruits
router.get('/', (req, res) => {
    res.send(fruits)
})

// another GET route -> show route
// adding : to the beginning of some part of our endpoint
// is how we create a request parameter AKA req.params
// in this case, our param will be the index of some fruit in our array
router.get('/:indexOfFruitsArr', (req, res) => {
    console.log('this is request parameters', req.params)
    const fruitIndex = req.params.indexOfFruitsArr
    console.log('this is fruitindex', fruitIndex)
    res.json(fruits[fruitIndex])
})

// we need to export our routes
module.exports = router