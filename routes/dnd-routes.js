// we require express module
const express = require('express')
// import(require) the axios module - used for API calls
const axios = require('axios')

// we need to set up router, in order to keep our routes in other files.
const router = express.Router()

// player home page
router.get('/', (req, res) => {
    res.send('Player Home Page')
})

// player classes page
router.get('/classes', (req, res) => {
    // res.send('classes page')
    // we're going to make an axios request
    // this is requesting data from the DND API
    // http://www.dnd5eapi.co/docs/#get-/api/classes/-index-
    axios('https://www.dnd5eapi.co/api/classes/')
        .then(dndRes => {
            console.log('dndRes Status', dndRes.data)
            res.send(dndRes.data)
        })
        .catch(console.error)
})

// player class show page
router.get('/classes/:class', (req, res) => {
    const dndClass = req.params.class
    console.log('this is req param class', dndClass)
    console.log('this is req.query', req.query)
    axios(`https://www.dnd5eapi.co/api/classes/${dndClass}`)
        .then(dndRes => {
            // console.log('dndRes Status', dndRes.data)
            res.send(dndRes.data)
        })
        .catch(console.error)
})

// player spells page
router.get('/spells', (req, res) => {
    // we'll use a req.query to find individual spells
    const spellName = req.query.spellName
    if (!spellName) {
        axios(`https://www.dnd5eapi.co/api/spells`)
            .then(dndRes => {
                res.send(dndRes.data)
            })
            .catch(console.error)
    } else {
        axios(`https://www.dnd5eapi.co/api/spells/${spellName}`)
            .then(dndRes => {
                res.send(dndRes.data)
            })
            .catch(console.error)
    }
})

module.exports = router