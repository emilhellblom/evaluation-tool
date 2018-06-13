import React, {Component} from 'react'
import './BatchSpec.css'
import * as request from 'superagent'
import {baseUrl} from '../constants'
import {updateRating} from '../actions/ratings'
import {Redirect, Link} from 'react-router-dom'
import {connect} from 'react-redux'

class Rating extends Component {
    state = {}

    async componentDidMount() {
        const currentRating = this.props.match.params.id
        const result = await request.get(`${baseUrl}/ratings/${currentRating}`)
        console.log(result)
        this.setState({
            rating: result.body,
            currentRating,
        })
    }

    handleSubmit = (e) => {
        console.log(this.state)
        this.props.updateRating(this.state)
	}

	handleChange = (event) => {
        const {name, value} = event.target
        console.log(name, value)

        this.setState({
        [name]: value
        })
    }

    handleOptionChange = color => {
        console.log(color)
        this.setState({ colorRating: color })
    }

    render() {
        console.log(this.state)
        const colors = ['Red', 'Yellow', 'Green']
        return (
            <div>
                {this.state.rating && 
                    <Link to={`/students/${this.state.rating.studentId}`}><h1>Student #{this.state.rating.studentId}</h1></Link>
                }

                {this.state.rating && 
                    <div>
                        <h2>{this.state.rating.remark}</h2>
                        <h3>{this.state.rating.date}</h3>
                        <div className={`rating-${this.state.rating.color}`}></div>
                    </div>
                }
                <div className='alter-rating-div'>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <label htmlFor="date">Date</label>
                            <input type="date" name="date" id="date" value={
                                this.state.date || ''
                            } onChange={ this.handleChange } />
                        </div>

                        <div>
                            <label htmlFor="text">Remarks</label>
                            <input type="text" name="text" id="text" value={
                                this.state.text || ''
                            } onChange={ this.handleChange } />
                        </div>

                        {colors.map(color => (
                            <div key={`Rating: ${color}`}>
                                <label htmlFor="rating">{color}</label>
                                <input type="radio" name="color" id={color} checked={this.state.color} onChange={() => this.handleOptionChange(color)} />
                            </div>
                        ))}
                        <button type="submit">Save</button>                    
                    </form>
                </div>
            </div>
        )
    }
}


export default connect(null, {updateRating})(Rating)