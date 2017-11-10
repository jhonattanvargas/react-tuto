//Dependencies
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

//Assets
import logo from './img/logo.svg'
import './css/Header.css'

class Header extends Component {
  
  static PropTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired
  }

  render() {

    //console.log(this.props)
    const {title, items} = this.props

    return (
      <div className="Header">
        <header className="Logo">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{title}</h1>
          <ul className="Menu">
            {
              items && items.map( (x,key) => 
                <li key={key}><Link to={x.url}> {x.title} </Link></li>
              )
            }
          </ul>
        </header>
      </div>
    )
  }
}

export default Header
