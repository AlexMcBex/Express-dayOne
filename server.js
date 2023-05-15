// we require express module
const express = require('express')

// import(require) the axios module - used for API calls
const axios = require('axios')
// here we save our working app to a variable we can refer to
const app = express()

// register our routes
// 2 steps
// 1 - import the router from the right file
const fruitRoutes = require('./routes/fruit-routes')
const dndRoutes = require('./routes/dnd-routes')
// 2 - tell the app to use that router
// the first arg, sets the base endpoint to tell our app to use those routes
// the second is the file where those routes live
app.use('/fruits', fruitRoutes)
app.use('/dnd', dndRoutes)

// Our first route
// first refer to the app
// second piece is a HTTP request verb - GET
// first arg -> url endpoint
// second arg is a callback function
// this callback takes two parameters, request and response
app.get('/', (req, res) => {
    // console.log('this is the request: ', req)
    // console.log('//////////////////////////')
    // console.log('this is the response: ', res)
    res.send(`<h1>Hey welcome to the main page</h1></br><a href='/fruits'>fruits</a>`)
})
// this lives in models now
// // const fruits = ['apple', 'banana', 'pear']
// the fruit based routes live in fruit-routes
// // the GET fruits route -> aka INDEX route
// // the /fruits endpoint will respond with an array of fruits
// app.get('/fruits', (req, res) => {
//     res.send(fruits)
// })

// // another GET route -> show route
// // adding : to the beginning of some part of our endpoint
// // is how we create a request parameter AKA req.params
// // in this case, our param will be the index of some fruit in our array
// app.get('/fruits/:indexOfFruitsArr', (req, res) => {
//     console.log('this is request parameters', req.params)
//     const fruitIndex = req.params.indexOfFruitsArr
//     console.log('this is fruitindex', fruitIndex)
//     res.json(fruits[fruitIndex])
// })

app.get('/hello', (req, res) => {
    // here is another response type - redirects to a route
    // the arg must be a route
    res.redirect('/hello/stranger')
})

// here is another example of using req.params
// anything after a colon is a route parameter
app.get('/hello/:name', (req, res) => {
    console.log('all the req.params', req.params)
    const name = req.params.name
    res.send(`<h1>Hello ${name}</h1>`)
})

// try this! (adding %20 between words in a url represents a space)
// http://localhost:3000/hello/Friday%20I%20Am%20glad%20you%20are%20here

// // player home page
// app.get('/players', (req, res) => {
//     res.send('Player Home Page')
// })
// // player classes page
// app.get('/players/classes', (req, res) => {
//     // res.send('classes page')
//     // we're going to make an axios request
//     // this is requesting data from the DND API
//     // http://www.dnd5eapi.co/docs/#get-/api/classes/-index-
//     axios('https://www.dnd5eapi.co/api/classes')
//         .then(dndRes => {
//             console.log('dndRes Status', dndRes.data)
//             res.send(dndRes.data)
//         })
//         .catch(console.error)
// })

// catch all route -> how we handle most 404s
// THIS SHOULD BE THE LAST ROUTE IN YOUR SERVER
app.get('*', (req, res) => {
    res.send('404 - page does not exist')
})

// we keep this at the bottom of our main entrypoint file
app.listen(3000, () => {
    console.log('Your server is running...better go catch it!')
})