const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('../utils/geoCode')
const forecast = require('../utils/forecast')


const app = express()

// defining paths for express configuration
const publicDirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//setting up Handlebars template engine to use  & views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//setting up static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Arshdeep Singh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Arshdeep Singh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Did you find this helpful?',
        tile: "Help",
        name: "Arshdeep Singh"
    })
})


// express.get() takes 2 arguments: 1: the url directory 2: what we want to do when user requests it
// request, response
app.get('/weather', (req, res) => {
    
    if (!req.query.address){
        return res.send({
            error: 'Error: Address is missing'
        })
    } 

    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forcastData) => {
            if (error) {
                return res.send({error})
            }

            res.send({
                forecast: forcastData,
                location,
                address: req.query.address
            })

        })
    })
})

app.get('/products', (req, res) => {

    if (!req.query.search){
        return res.send({
            error: "Must provide search term"
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

// help subdirectory support
app.get('/help/*', (req,res) => {
    res.render('404', {
        title: 'Erro 404',
        name: "Another A Production",
        errorMessage: "Help article not found"
    })
})

// error config
app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: "Another A Production",
        errorMessage: 'Page not found'
    })
})


app.listen(3000, () => {
    console.log('Server starting on port 3000')
})