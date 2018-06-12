import React, {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'

export default class ClassList extends Component {

    studentCalc = (batch, studentList) => {

        const students = []
        studentList.map(student => {
            if (student.classId === batch.id) students.push(student.id)
        })
        return students.length
    }

    render() {
        const {classList, studentList} = this.props
        console.log(this)
        return (
            <div className='batch-list'>
                {classList.map(batch => (
                    <div key={`Batch #${batch.id}`} className='batch-box'>
                        <h2>Batch #{batch.id}</h2>
                        <h3>Amount of students: {this.studentCalc(batch, studentList)}</h3>
                        <Link to="/batch">Info</Link>
                    </div>
                ))}
            </div>
        )
    }
}