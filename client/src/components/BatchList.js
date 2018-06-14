import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import '../containers/Page.css'

export default class BatchList extends Component {

    studentCalc = (batch, studentList) => {

        const students = []
        studentList.forEach(student => {
            if (student.batchId === batch.batchId) students.push(student.id)
        })
        return students.length
    }

    render() {
        const {batchList, studentList} = this.props
        return (
            <div className='batch-list'>
                {batchList.map(batch => (
                    <Link to={`/batch/${batch.batchId}`}>
                        <div key={`Batch #${batch.batchId}`} className='batch-box'>
                            <h2 className='batch-id'>Batch #{batch.batchId}</h2>
                            <h3 className='batch-info'>Start date: {batch.startDate}</h3>
                            <h3 className='batch-info'>End date: {batch.endDate}</h3>
                            <h3 className='batch-info'>Amount of students: {this.studentCalc(batch, studentList)}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        )
    }
}