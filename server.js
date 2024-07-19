import express from   'express';
const app = express()
const port = 3200
import cors from 'cors'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
import session from 'express-session'
import flash from 'connect-flash'
import connectSession from 'connect-mongodb-session'
const MongoDBStore = connectSession(session)
import { dbconnection } from './database/dbConnection.js'
import { init } from './src/index.routes.js';

import * as passportSetup from "./src/passport/passport.js";
import passport from "passport";

dotenv.config()

//middleware
app.use(passport.initialize());
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

var store = new  MongoDBStore({
    uri:process.env.DB_CONNECTION,
    collection: 'MySessions'
})
app.use(flash())
app.use(session({
    secret:'keyboard cat',
    resave:false ,
    saveUninitialized:false,
    store
}))
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

init(app)

dbconnection()
app.listen(process.env.PORT || port,()=>console.log(`app listening on port ${port}`) );