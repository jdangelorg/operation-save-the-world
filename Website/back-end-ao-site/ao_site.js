const express = require('express') 
const expressHandlebars = require('express-handlebars')

const handlers = require('./lib/handlers')

const app = express()
/* eslint-disable no-undef */
const port = process.env.PORT || 3000
/* eslint-disable no-undef */

// configure Handlebars view engine
app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')

/* eslint-disable no-undef */
app.use(express.static(__dirname + '/public'))
/* eslint-disable no-undef */

app.get('/', handlers.home)

app.get('/links', handlers.links)

app.use(handlers.notFound)

app.use(handlers.serverError)

if(require.main === module) { 
    app.listen(port, () => {
        console.log( `Express started on http://localhost:${port}` + '; press Ctrl-C to terminate.' )
    })
} else { 
    module.exports = app
}
