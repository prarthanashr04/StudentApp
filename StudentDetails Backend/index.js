const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const auth =require('./authentication')
const login = require('./authorization')
const cors = require('cors')
const port = 3000

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
});


app.get('/details/:id', login.checkIfAuthenticated, db.getDetailById)
app.post('/details',login.checkIfAuthenticated, db.createDetail)
app.put('/details/:id',login.checkIfAuthenticated, db.updateDetail)
app.delete('/details/:id',login.checkIfAuthenticated, db.deleteDetail)
app.post('/login',auth.loginRoute)
app.get('/details',login.checkIfAuthenticated, db.getDetails);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});