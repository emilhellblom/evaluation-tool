import React, {Component} from 'react'
import './StudentSpec.css'
import './Rating.css'
import * as request from 'superagent'
import {baseUrl} from '../constants'
import {updateRating} from '../actions/ratings'
import {Redirect, Link} from 'react-router-dom'
import {connect} from 'react-redux'

class Rating extends Component {
    state = {
        rating: null,
        currentRating: null
    }

    async componentDidMount() {
        const currentRating = this.props.match.params.id
        const result = await request.get(`${baseUrl}/ratings/${currentRating}`)

        this.setState({
            rating: result.body,
            currentRating,
        })
    }

    handleSubmit = (e) => {
        this.props.updateRating(this.state)
	}

	handleChange = (event) => {
        const {name, value} = event.target

        this.setState({
        [name]: value
        })
    }

    handleOptionChange = color => {
        this.setState({ colorRating: color })
    }

    render() {
        const colors = ['Red', 'Yellow', 'Green']
        const {rating} = this.state


        if (!this.props.authenticated) return (
			<Redirect to="/login" />
        )

        return (
            <div>
                <div className='rating-header'>
                    <div className='student-id'>
                        {rating && 
                            <Link to={`/students/${rating.studentId}`}><h1>Student #{rating.studentId}</h1></Link>
                        }
                    </div>
                    {rating && 
                        <div className='rating-specs'>
                            <h2 className='rating-remark'>{rating.remark}</h2>
                            <h3 className='rating-date'>{rating.date}</h3>
                            <div className={`rating-${rating.color}`}></div>
                        </div>
                    }
                </div>
                <div className='evaluation-div'>
                    <form className='evaluation-form' onSubmit={this.handleSubmit}>
                        <div className='date-field'>
                            <label htmlFor="date">Date</label>
                            <input type="date" name="date" id="date" value={
                                this.state.date || ''
                            } onChange={ this.handleChange } />
                        </div>
                        <div className='input-fields'>
                            <div className='remarks-field'>
                                <label htmlFor="text">Remarks</label>
                                <input type="text" name="text" id="text" value={
                                    this.state.text || ''
                                } onChange={ this.handleChange } />
                            </div>

                            <div className='color-picker'>
                                {colors.map(color => (
                                    <div className={`pick-${color}`} key={`Rating: ${color}`}>
                                        <input type="radio" name="color" id={color} checked={this.state.color} onChange={() => this.handleOptionChange(color)} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button className='save-button' type="submit">Save</button>                    
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
        authenticated: state.currentUser !== null,
    })

export default connect(mapStateToProps, {updateRating})(Rating)