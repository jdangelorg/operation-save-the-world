const express = require('express') 

const handlers = require('./lib/handlers')

const app = express()
/* eslint-disable no-undef */
const port = process.env.PORT || 4040
/* eslint-disable no-undef */


app.set('view cache', true)
app.disable('x-powered-by')

/* eslint-disable no-undef */
app.use(express.static(__dirname + '/public'))
/* eslint-disable no-undef */

app.get('/', handlers.home)

app.get('/links', handlers.links)

app.get('/headers', (req, res) => { 
    res.type('text/plain')
    const headers = Object.entries(req.headers).map(([key, value]) => `${key}: ${value}`)
    res.send(headers.join('\n'))
})

app.use(handlers.notFound)

app.use(handlers.serverError)

if(require.main === module) { 
    app.listen(port, () => {
        console.log( `Express started on http://localhost:${port}` + '; press Ctrl-C to terminate.' )
    })
} else { 
    module.exports = app
}
