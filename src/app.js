const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Lukas', 
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Lukas', 
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Lukas',
        helpText: 'This is some helpful text', 
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.adress) {
        return res.send({
            error: 'You must provide an adress'
        })
    }

     geocode(req.query.adress, (error, { latitute, longitute, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        
        forecast(latitute, longitute, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            
            res.send({
                forecast: forecastData,
                location,
                adress: req.query.adress
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Lukas',
        errorMessage: 'Help article not found',
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Lukas',
        errorMessage: 'Page not found',
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})