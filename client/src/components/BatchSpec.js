import React, {Component} from 'react'
import './BatchSpec.css'
import {connect} from 'react-redux'
import AddStudent from './AddStudent'
import {addStudent} from '../actions/students'
import * as request from 'superagent'
import {baseUrl} from '../constants'
import {Redirect, Link} from 'react-router-dom'

class BatchSpec extends Component {
    state = {
        addOption: false,
        students: [],
        currentBatch: null
    }

    async componentDidMount() {
        const result = await request.get(`${baseUrl}/students`)
        const currentBatch = this.props.match.params.id
        const filteredStudents = result.body.filter(student => (student.batchId === currentBatch))
        let ratings = [] 
        filteredStudents.forEach(student => {if (student.lastRating) ratings.push(student.lastRating)})

        this.setState({
            students: filteredStudents,
            currentBatch,
            ratings
        })
    }

    handleSubmit = (student) => {
        this.props.addStudent(student.firstName, student.lastName, student.pictureUrl, this.state.currentBatch)
        this.setState({addOption: false})
    }

    showAddOption = () => {
        this.setState({addOption: true})
    }

    randomQuestion = (students) => {
        const rand = (min, max) => {
            return Math.random() * (max - min) + min;
        }

        let probability = []
        let color = []

        const checkStudents = (students) => {
            const studentRatings = students.map(student => student.lastRating)
            if (studentRatings.includes('Red')) {
                probability.push(0.45)
                color.push('Red')
            }
            if (studentRatings.includes('Yellow')) {
                probability.push(0.35)
                color.push('Yellow')
            }
            if (studentRatings.includes('Green')) {
                probability.push(0.2)
                color.push('Green')
            }
        }
         
        const getRandomColor = (color, probability) => {  
            const totalProbability = probability.reduce((prev, cur) => prev + cur)
   
            const randomNum = rand(0, totalProbability)
            let probabilitySum = 0
             
            for (let i = 0; i < color.length; i++) {
                probabilitySum += probability[i]
                probabilitySum = Number(probabilitySum.toFixed(2))
                if (randomNum <= probabilitySum) {
                    return color[i]
                }
            }
        }
        
        const getRandomStudent = (randomColor, students) => {
            const studentsWithRating = students.filter(student => student.lastRating === randomColor)
            console.log(studentsWithRating)
            const randomStudent = studentsWithRating[rand(0, studentsWithRating.length-1).toFixed(0)]
            return randomStudent
        }
        
        checkStudents(students)
        const randomColor = getRandomColor(color, probability)
        const randomStudent = getRandomStudent(randomColor, students)

        return this.setState({randomStudent: randomStudent})
            
    }

    
    render() {

        if (!this.props.authenticated) return (
            <Redirect to="/login" />
        )

        console.log(this.state)
        const {randomStudent, ratings, students, currentBatch, addOption} = this.state
        return (
            <div className='batch-page'>
                <Link to='/home'><button>Home</button></Link>
                <h1>Batch #{currentBatch}</h1>
                <div className='color-standings'></div>
                <div>
                    {students.map(student => (
                        (student.batchId === currentBatch) &&
                            <div key={`student #${student.id}`}>
                                <Link to={`/students/${student.id}`}><img src={student.pictureUrl} alt={`${student.firstName} ${student.lastName}`}/></Link>
                                <Link to={`/students/${student.id}`}><h2>{student.firstName} {student.lastName}</h2></Link>
                                {student.lastRating && <div className={`latest-color-${student.lastRating}`}></div>}
                                {!student.lastRating && <h3>This student has not yet received a rating</h3>}
                            </div>
                    ))}
                </div>
                {ratings && ratings.includes('Red', 'Yellow', 'Green') && 
                    <div>
                        <button onClick={() => this.randomQuestion(students)}>Get a random student</button>
                        {randomStudent && <h3>{randomStudent.firstName} {randomStudent.lastName}</h3>
                        }
                    </div>
                }
                <div>
                    {addOption !== true && <button onClick={this.showAddOption}>Add student</button>}
                    {addOption === true && <AddStudent type={'Add'} onSubmit={this.handleSubmit}/>}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
        authenticated: state.currentUser !== null,
    })

export default connect(mapStateToProps, {addStudent})(BatchSpec)