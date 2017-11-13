//Dependencies
import express from 'express'
import webpack from 'webpack'
import path from 'path'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import open from 'open'
import exphbs from 'express-handlebars'

//Config
import config from '../config'

//Webpack Configuration
import webpackConfig from '../../webpack.config.babel'

//API
import blogApi from './api/blog'
import libraryApi from './api/library'

//Helpers
import * as hbsHelpers from '../lib/handlebars'

//Util
import { isMobile } from '../lib/utils/device'

//Enviroment
const isDevelopment = process.env.NODE_ENV !== 'production'

//Express App
const app = express()

//Public
app.use(express.static(path.join(__dirname,'../public')))

//Handlebars setup
app.engine(config.views.engine, exphbs({
    extname: config.views.extension,
    helpers: hbsHelpers
}))

//View Engine Setup
app.set('views', path.join(__dirname,config.views.path))
app.set('view engine', config.views.engine)

//Webpack Compiler
const webpackCompiler = webpack(webpackConfig)

//Webpack Middleware
if(isDevelopment){
    app.use(webpackDevMiddleware(webpackCompiler))
    app.use(webpackHotMiddleware(webpackCompiler))
}

//Device detector
app.use((req,res,next)=>{
    res.locals.isMobile = isMobile(req.headers['user-agent'])
    return next()
})

//API Dispatch
app.use('/api/blog',blogApi)
app.use('/api/library',libraryApi)

//Sending all traffic to React
app.get('*', (req, res)=>{
    res.render('frontend/index',{
        layout:false
    })
    //res.sendFile(path.join(__dirname,'../public/index.html'))
})

//Listen port
app.listen(config.serverPort,err=>{
    if(!err){
        open(config.baseUl)
    }
})