import React, {Component} from 'react'
import './BatchSpec.css'
import {connect} from 'react-redux'
import * as request from 'superagent'
import {baseUrl} from '../constants'
import {Redirect, Link} from 'react-router-dom'
import {addRating, updateLastRating} from '../actions/ratings'
import {editStudent, deleteStudent} from '../actions/students'
import AddStudent from './AddStudent'

const today = new Date().toISOString().substr(0, 10);

class StudentSpec extends Component {
    state = {
        // addOption: false,
        currentStudent: null,
        batchClassmates: [],
        date: today,
        editStudent: false,
        confirmationDelete: false
    }

    // componentDidMount() {
    //     request
    //     .get(`${baseUrl}/students/${this.props.match.params.id}`)
    //     .then(result => this.setState({currentStudent: result.body}))
    // }

    // handleSubmit = (student) => {
    //     this.props.addStudent(student.firstName, student.lastName, student.pictureUrl, this.state.currentBatch)
    //     this.setState({addOption: false})
    // }

    // showAddOption = () => {
    //     this.setState({addOption: true})
    // }

    handleSubmit = (e) => {
        console.log(this.state)
        this.props.addRating(this.state)
        this.props.updateLastRating(this.state)
                this.setState({return: true})
    }
    
    handleEditSubmit = (edit) => {
        console.log(this.state.currentStudent.id)
        this.props.editStudent(edit.firstName, edit.lastName, edit.pictureUrl, this.state.currentStudent.id)
        this.setState({
            editStudent: false,
            return: true
        })
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

    // shouldComponentUpdate(prevProps, prevState) {
    //     if (prevProps.match.params.id && prevProps.match.params.id === this.props.match.params.id) return true 
    //     else return false
    // }

    async componentDidMount() {
        // let students = []
        let totalRatings = []
        try {
            let currentStudentResult = await request.get(`${baseUrl}/students/${this.props.match.params.id}`)
            this.setState({currentStudent: currentStudentResult.body})
            let ratings = await request.get(`${baseUrl}/ratings`)
            ratings.body.forEach(rating => {
                if (currentStudentResult && this.state.currentStudent.id === rating.studentId) {
                    totalRatings.push(rating)
                }
            })
            this.setState({totalRatings: totalRatings})
            // let result = await request.get(`${baseUrl}/students`)
            // result.body.map(student => {
            //     if (currentStudentResult && student.batchId === this.state.currentStudent.batchId) {
            //         students.push(student)
            //     }
            // })
        } catch (e) {
            console.log('Error: ', e)
        }
        if (this.state.totalRatings) {
            this.state.totalRatings.forEach(rating => {
                if (rating.date === today) {
                    this.setState({ratingOfTheDay: true})
                }
            })
        }
        // students.map((student, index) => {
        //     if (student.id === this.state.currentStudent.id) {
        //         this.setState({nextStudent: students[index+1].id})
        //     }
        // })
    }

    showTenRatings = () => {
        const {totalRatings} = this.state
        if (totalRatings) {
            const length = totalRatings.length
            if (totalRatings.length > 10) {
                return totalRatings.slice(length-10, length)
            } else {
                return totalRatings
            }
        }
    }

    showEditStudent = () => {
        this.setState({editStudent: true})
    }

    deleteStudentCheck = () => {
        this.setState({confirmationDelete: true})
    }

    deleteStudentConfirmation = () => {
        this.props.deleteStudent(this.state.currentStudent.id)
        this.setState({return: true})
    }

    render() {
        console.log(this.state)
        const colors = ['Red', 'Yellow', 'Green']
        const tenRatings = this.showTenRatings()

        if (this.state.return) return (
			<Redirect to={`/batch/${this.state.currentStudent.batchId}`} />
        )

        if (!this.props.authenticated) return (
			<Redirect to="/login" />
        )

        return (
            <div className='student-page'>
                {this.state.currentStudent &&
                <div className='student-header'>
                    <div>
                        <Link to={`/batch/${this.state.currentStudent.batchId}`}><h1>Batch #{this.state.currentStudent.batchId}</h1></Link>
                        {this.state.editStudent !== true && <button onClick={this.showEditStudent}>Edit student</button>}
                        {this.state.editStudent === true && <AddStudent type={'Edit'} onSubmit={this.handleEditSubmit}/>}
                        {!this.state.confirmationDelete && 
                        <button onClick={() => this.deleteStudentCheck()}>Delete student</button>}
                        {this.state.confirmationDelete &&
                        <div>
                            <h3>Are you sure you want to delete this student?</h3>
                            <button onClick={() => this.deleteStudentConfirmation()}>Yes, I want to delete this student</button>
                        </div>}
                    </div>
                    <div>
                        <h2>{this.state.currentStudent.firstName}</h2>
                        <h2>{this.state.currentStudent.lastName}</h2>
                    </div>
                    <img />
                </div>
                }
                {this.state.totalRatings && 
                    <div>
                        <h3>Ten latest ratings</h3>
                        {tenRatings.map(rating => (
                            <Link key={`rating-history-${rating.id}`} to={`/ratings/${rating.id}`}>
                                <div className={`rating-${rating.color}`}>
                                    {/* <h4>{rating.remark}</h4> */}
                                </div>
                            </Link>
                        ))}
                    </div>
                }
                {!this.state.ratingOfTheDay && 
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

                            {colors.map(color => (
                                <div key={`Rating: ${color}`}>
                                    <label htmlFor="rating">{color}</label>
                                    <input type="radio" name="color" id={color} checked={this.state.color} onChange={() => this.handleOptionChange(color)} />
                                </div>
                            ))}
                            <button type="submit">Save</button>                    
                        </form>
                    {/* <button onClick={() => this.props.history.push(`/students/${this.state.nextStudent}`)}>Save and Next</button> */}
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
        authenticated: state.currentUser !== null,
    })

export default connect(mapStateToProps, {addRating, updateLastRating, editStudent, deleteStudent})(StudentSpec)