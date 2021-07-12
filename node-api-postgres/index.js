const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
});

app.get('/details', db.getDetails)
app.get('/details/:id', db.getDetailById)
app.post('/details', db.createDetail)
app.put('/details/:id', db.updateDetail)
app.delete('/details/:id', db.deleteDetail)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});