//Dependencies
import React , {Component} from 'react'
import PropTypes from 'prop-types'

//Assest
import './css/Footer.css'

class Footer extends Component{

    static PropTypes = {
        copyright: PropTypes.string
    }

    render(){
        const {copyright = "&copy; React 2017"} = this.props
        return(
            <div className="Footer">
                <hr />
                <p dangerouslySetInnerHTML={{ __html:copyright }} />
            </div>
        )
    }
}

export default Footer