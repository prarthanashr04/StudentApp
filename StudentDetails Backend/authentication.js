const bodyParser = require('body-parser');
const db = require('./queries')

// import * as jwt from 'jsonwebtoken';
// import * as fs from "fs";
const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const app = express();

app.use(bodyParser.json());


const RSA_PRIVATE_KEY = fs.readFileSync('./keys/private.pem').toString();


const loginRoute = (Request, Response) => {
    console.log("working");
    const email = Request.body.email_id,
        password = Request.body.password;

    const findUserIdForEmail = async (email) => {
        try {
            const response = await db.getIdByEmail(email);
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }

    const validatedEmailAndPassword = async (email, password) => {
        try {
            const response = await db.validateEmailAndPassword(email, password);
            if (response) {
                const Id = findUserIdForEmail(email);
                const userId = Id.toString();

                const privateSecret = {
                    key: RSA_PRIVATE_KEY,
                    passphrase: "privateKey"
                }
                const signOptions = {
                    algorithm: 'RS256',
                    expiresIn: 6000
                }
                const jwtBearerToken = jwt.sign({ userId }, privateSecret, signOptions)


                Response.status(200).json({
                    idToken: jwtBearerToken,
                    expiresIn: 6000
                });

            }
        }
        catch (error) {
            console.log(error);
            Response.sendStatus(401);
        }
    }

    validatedEmailAndPassword(email, password);

}

module.exports = {
    loginRoute
}