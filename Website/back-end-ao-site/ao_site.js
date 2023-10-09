const express = require('express') 
const expressHandlebars = require('express-handlebars')

const handlers = require('./lib/handlers')

const app = express()
const port = process.env.PORT || 3000

// configure Handlebars view engine
app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))

// app.get('/', (req, res) => res.render('home'))
app.get('/', handlers.home)

// app.get('/links', (req, res) => {
//     const randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)]
//     res.render('links', { fortune: randomFortune })
// })
app.get('/links', handlers.links)

// custom 404 page
// app.use((req, res) => {
//     res.status(404)
//     res.render('404')
// })
app.use(handlers.notFound)

// custom 500 page
// app.use((err, req, res, next) => {
//     console.error(err.message)
//     res.status(500)
//     res.render('500')
// })
app.use(handlers.serverError)

app.listen(port, () => console.log(
    `Express started on http://localhost:${port}; ` +
    `press Ctrl-C to terminate.`))

