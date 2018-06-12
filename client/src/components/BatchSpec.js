import React, {Component} from 'react'
import './BatchSpec.css'
import {connect} from 'react-redux'
import AddStudent from './AddStudent'
import {addStudent} from '../actions/students'
import * as request from 'superagent'
import {baseUrl} from '../constants'

class BatchSpec extends Component {
    state = {
        addOption: false,
        students: [],
        currentBatch: null
    }

    componentDidMount() {
        request
        .get(`${baseUrl}/students`)
        .then(result => this.setState({students: result.body}))
        this.setState({currentBatch: this.props.match.params.id})
    }

    handleSubmit = (student) => {
        this.props.addStudent(student.firstName, student.lastName, student.pictureUrl, this.state.currentBatch)
        this.setState({addOption: false})
    }

    showAddOption = () => {
        this.setState({addOption: true})
    }

    render() {
        console.log(this.props)
        return (
            <div className='batch-page'>
                <h1>Batch #{this.state.currentBatch}</h1>
                <div className='color-standings'></div>
                <div>
                    {this.state.students.map(student => (
                        (student.batchId === this.state.currentBatch) &&
                            <div key={`student #${student.id}`}>
                                <img src={student.pictureUrl} alt={`${student.firstName} ${student.lastName}`}/>
                                <h2>{student.firstName} {student.lastName}</h2>
                                {student.rating && <div className={`latest-color-${student.rating}`}></div>}
                                {!student.rating && <h3>This student has not yet received a rating</h3>}
                            </div>
                    ))}
                </div>
                {this.state.addOption !== true && <button onClick={this.showAddOption}>Add student</button>}
                {this.state.addOption === true && <AddStudent onSubmit={this.handleSubmit}/>}
            </div>
        )
    }
}

export default connect(null, {addStudent})(BatchSpec)