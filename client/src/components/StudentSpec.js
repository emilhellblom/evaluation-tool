import React, {Component} from 'react'
import './BatchSpec.css'
import {connect} from 'react-redux'
import * as request from 'superagent'
import {baseUrl} from '../constants'

class StudentSpec extends Component {
    state = {
        // addOption: false,
        currentStudent: null,
        batchClassmates: []
    }

    componentDidMount() {
        request
        .get(`${baseUrl}/students/${this.props.match.params.id}`)
        .then(result => this.setState({currentStudent: result.body}))
    }

    // handleSubmit = (student) => {
    //     this.props.addStudent(student.firstName, student.lastName, student.pictureUrl, this.state.currentBatch)
    //     this.setState({addOption: false})
    // }

    // showAddOption = () => {
    //     this.setState({addOption: true})
    // }

    // handleSubmit = (e) => {
	// 	e.preventDefault()
	// 	this.props.onSubmit(this.state)
	// }

	handleChange = (event) => {
        const {name, value} = event.target

        this.setState({
        [name]: value
        })
    }

    nextStudent = async () => {
        const { currentStudent } = this.state;
        let students = []
        try {
            let result = await request.get(`${baseUrl}/students`)
            result => 
                result.body.map(student => {
                    if (currentStudent && student.batchId === currentStudent.batchId) {
                        students.push(student)
                    }
                })
                console.log(students)
                this.setState({batchClassmates: students})
        } catch (e) {
            console.log('Error: ', e)
        }
            // console.log(this.state.batchClassmates)
    }

    render() {
        const today = new Date().toISOString().substr(0, 10);
        console.log(today)
        console.log(this.state)
        return (
            <div className='student-page'>
                {this.state.currentStudent &&
                <div className='student-header'>
                    <h1>Batch #{this.state.currentStudent.batchId}</h1>
                    <div>
                        <h2>{this.state.currentStudent.firstName}</h2>
                        <h2>{this.state.currentStudent.lastName}</h2>
                    </div>
                    <img />
                </div>
                }
                {/* <div>Ratings</div> */}
                <div className='evaluation-div'>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="date">Date</label>
                        <input type="date" name="date" id="date" value={
                            this.state.date || today
                        } onChange={ this.handleChange } />
                    </div>

                    <div>
                        <label htmlFor="text">Remarks</label>
                        <input type="text" name="text" id="text" value={
                            this.state.text || ''
                        } onChange={ this.handleChange } />
                    </div>

                    <div>
                        <label htmlFor="rating">Red</label>
                        <input type="radio" name="red" id="red" value={
                            this.state.red || ''
                        } onChange={ this.handleChange } />

                        <label htmlFor="rating">Yellow</label>
                        <input type="radio" name="yellow" id="yellow" value={
                            this.state.yellow || ''
                        } onChange={ this.handleChange } />
       
                        <label htmlFor="rating">Green</label>
                        <input type="radio" name="green" id="green" value={
                            this.state.green || ''
                        } onChange={ this.handleChange } />
                    </div>
                    <button type="submit">Save</button>                    
			    </form>
                    <button onClick={() => this.nextStudent()}>Save and Next</button>
                </div>
            </div>
        )
    }
}

export default connect(null, null)(StudentSpec)