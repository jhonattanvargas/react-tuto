//Dependencies
import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import Bluebird from 'bluebird'
import { Provider } from 'react-redux'


//Assest
import './index.css'

//Routes
import AppRoutes from './routes'

//import App from './components/App'
import registerServiceWorker from './registerServiceWorker'

//Redux Store
import configureStore from './lib/configureStore'

//Reducers
import rootReducer from './reducers'

//Bluebird configuration

Bluebird.config({warnings: false})

window.promise = Bluebird

window.addEventListener('unhandledrejection', error => {
    error.preventDefault()
    if(process.env.NODE_ENV !== 'production'){
        console.warn('Unhandled promise rejection warning.', error.detail)
    }
})

//Configure Redux Store
const store = configureStore({
    initialState: window.initialState
},rootReducer)

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <AppRoutes />
        </Router>
    </Provider>
    , document.getElementById('root'))
registerServiceWorker()
