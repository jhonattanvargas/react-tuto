//Dependencies
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

//Actions
import * as actions from './actions'

//Utils
import { isFirstRender } from '../../lib/utils/frontend'

class Library extends Component{
    static propTypes = {
        loadBooks: PropTypes.func.isRequired,
        books: PropTypes.array,
        book: PropTypes.array
    }

    constructor(props){
        super(props)

        this.state = {
            displaySingleBook: false
        }
    }

    componentWillMount(){
        const {
            match: {
                params: {
                    id = 0
                }
            }
        } = this.props

        this.setState({
            displaySingleBook: id > 0
        })

        if(id > 0){
            this.
            this.props.loadSingleBook({ id })
        }else{
            this.props.loadBooks()
        }
    }

    componentWillReceiveProps(nextProps){
        const {
            match: {
                params: {
                    id = 0
                }
            }
        } = nextProps

        if(nextProps.match.params !== this.props.params){
            this.setState({
                displaySingleBook: id > 0
            })

            if(id > 0){                
                this.props.loadSingleBook({ id })
            }else{
                this.props.loadBooks()
            }
        }
    }

    renderBookList(books){
        return(
            <div>
                <h1>Library</h1>
                <ul>
                    {
                        books.map( (book, key) =>{
                            return (
                                <li key={key}>
                                    <Link to={`/library/${book.id}`}>{book.title}</Link> - {book.author}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }

    renderSingleBook(book){
        return(
            <div>
                <h1>{book.title}</h1>
                <p>Author: {book.author}</p>
                <p><img src={book.image} style={{maxWidth:'300px'}} /></p>
                <p><Link to="/library" >Go Back</Link></p>
            </div>
        )
    }

    render(){
        const {
            books,
            book
        } = this.props
        console.log(this.props)
        if(isFirstRender(books) && isFirstRender(book)){
            return null
        }

        let show = this.renderBookList(books)

        if(book.length > 0 && this.state.displaySingleBook){
            show = this.renderSingleBook(book[0])
        }

        return(
            <div className="Library">
               { show }
            </div>
        )
    }
}

export default connect(state =>({
    books: state.library.books,
    book: state.library.book
}), actions)(Library)