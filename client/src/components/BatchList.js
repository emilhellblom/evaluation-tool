import React, {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'

export default class BatchList extends Component {

    studentCalc = (batch, studentList) => {

        const students = []
        studentList.map(student => {
            if (student.batchId === batch.batchId) students.push(student.id)
        })
        return students.length
    }

    render() {
        const {batchList, studentList} = this.props
        return (
            <div className='batch-list'>
                {batchList.map(batch => (
                    <div key={`Batch #${batch.batchId}`} className='batch-box'>
                        <h2>Batch #{batch.batchId}</h2>
                        <h3>Start date: {batch.startDate}</h3>
                        <h3>End date: {batch.endDate}</h3>
                        <h3>Amount of students: {this.studentCalc(batch, studentList)}</h3>
                        <Link to={`/batch/${batch.batchId}`}>Info</Link>
                    </div>
                ))}
            </div>
        )
    }
}