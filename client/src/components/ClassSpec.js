import React, {Component} from 'react'
import './ClassSpec.css'
import {connect} from 'react-redux'
import AddStudent from './AddStudent'
import {addStudent} from '../actions/students'
import * as request from 'superagent'
import {baseUrl} from '../constants'

class ClassSpec extends Component {
    state = {
        studentList: [
            {
                id: 1,
                name: 'John Smith',
                batchId: 1,
                pictureUrl: '',
                ratings: ['yellow', 'red', 'red']
            },
            {
                id: 2,
                name: 'Andy Holst',
                batchId: 1,
                pictureUrl: '',
                ratings: ['green', 'red', 'green']
            },
            {
                id: 3,
                name: 'Joan Jacobs',
                batchId: 2,
                pictureUrl: '',
                ratings: ['yellow', 'yellow']
            },
            {
                id: 4,
                name: 'Jared Dunn',
                batchId: 2,
                pictureUrl: '',
                ratings: ['red', 'yellow', 'green']
            },
            {
                id: 5,
                name: 'Annie Beck',
                batchId: 2,
                pictureUrl: '',
                ratings: ['red', 'yellow', 'yellow']
            },
            {
                id: 6,
                name: 'Inger Kratt',
                batchId: 3,
                pictureUrl: '',
                ratings: ['red', 'red', 'green']
            }
        ],
        addOption: false
    }

    getStudents = () => {
        request
            .get(`${baseUrl}/students`)
            .then(result => {
                return this.setState({students: result.body})
            })
    }

    componentWillMount() {
        this.getStudents()
    }

    handleSubmit = (student) => {
        this.props.addStudent(student.firstName, student.lastName, student.pictureUrl, 2)
        this.setState({addOption: false})
    }

    showAddOption = () => {
        this.setState({addOption: true})
    }

    render() {
        console.log(this.state)
        return (
            <div className='batch-page'>
                <h1>Batch #</h1>
                <div className='color-standings'></div>
                <div>
                    {this.state.studentList.map(student => (
                        (student.batchId === 2) &&
                            <div key={`student #${student.id}`}>
                                <img src={student.pictureUrl}/>
                                <h2>{student.name}</h2>
                                <div className={`latest-color-${student.ratings[student.ratings.length-1]}`}></div>
                            </div>
                    ))}
                </div>
                {this.state.addOption !== true && <button onClick={this.showAddOption}>Add student</button>}
                {this.state.addOption === true && <AddStudent onSubmit={this.handleSubmit}/>}
            </div>
        )
    }
}

export default connect(null, {addStudent})(ClassSpec)