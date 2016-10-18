// import kue from'kue'
import express from 'express'
const app = express()

// DB Set Up
import mongoose  from 'mongoose'
import configDB from './config/database'
mongoose.connect(configDB.url); // connect to DB

// Config API Routes
import routes from './routes'
app.use('/', routes)
import Scraper from './lib/scraper'
import Chron from './lib/chron'

Scraper()
// Listen Up!
app.listen(3000, ()=>{ console.log('Listening on 3000')})
