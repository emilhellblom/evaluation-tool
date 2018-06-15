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
        currentBatch: null,
        return: null
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
        if (this.state.ratings) this.calcBar()
    }

    calcBar = () => {
        const {ratings} = this.state
        let redColors = []
        let yellowColors = []
        let greenColors = []

        ratings.forEach(color => {
            if (color === 'Red') redColors.push(color)
            if (color === 'Yellow') yellowColors.push(color)
            if (color === 'Green') greenColors.push(color)
        })

        const onePercent = ratings.length / 100
        const redPercentage = redColors.length / onePercent
        const yellowPercentage = yellowColors.length / onePercent
        const greenPercentage = greenColors.length / onePercent

        this.setState({
            percentages: {
                red: {width: redPercentage.toFixed(2) + '%'},
                yellow: {width: yellowPercentage.toFixed(2) + '%'},
                green: {width: greenPercentage.toFixed(2) + '%'},
            }
        })
    }

    handleSubmit = (student) => {
        this.props.addStudent(student.firstName, student.lastName, student.pictureUrl, this.state.currentBatch)
        this.setState({
            addOption: false,
            return: true
        })
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

            const randomStudent = studentsWithRating[rand(0, studentsWithRating.length-1).toFixed(0)]
            return randomStudent
        }
        
        checkStudents(students)
        const randomColor = getRandomColor(color, probability)
        const randomStudent = getRandomStudent(randomColor, students)

        return this.setState({randomStudent: randomStudent})
            
    }

    
    render() {

        if (this.state.return) return (
			<Redirect to={`/home`} />
        )

        if (!this.props.authenticated) return (
            <Redirect to="/login" />
        )

        const {randomStudent, ratings, students, currentBatch, addOption, percentages} = this.state
        return (
            <div className='batch-page'>
                <Link to='/home'><button>Home</button></Link>
                <h1>Batch #{currentBatch}</h1>
                {percentages && 
                    <div className='color-standings'>
                        <div className='red-part-bar' style={percentages.red}></div>
                        <div className='yellow-part-bar' style={percentages.yellow}></div>
                        <div className='green-part-bar' style={percentages.green}></div>
                    </div>
                }
                <div className='student-list'>
                    {students.map(student => (
                        (student.batchId === currentBatch) &&
                            <Link to={`/students/${student.id}`}>
                                <div className='student-card' key={`student #${student.id}`}>
                                    <img className='student-card-image' src={student.picture} alt={`${student.firstName} ${student.lastName}`}/>
                                    <h2 className='student-card-name'>{student.firstName} {student.lastName}</h2>
                                    {student.lastRating && <div className={`latest-color-${student.lastRating}`}></div>}
                                    {!student.lastRating && <h3 className='student-card-message'>This student has not yet received a rating</h3>}
                                </div>
                            </Link>
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