import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import ClassList from '../components/ClassList'

class Page extends Component {
    state = {
        classList: [
            {
                id: 1,
                startDate: '2018-01-30',
                endDate: '2018-03-15',
            },
            {
                id: 2,
                startDate: '2018-03-15',
                endDate: '2018-05-30',
            },
            {
                id: 3,
                startDate: '2018-05-30',
                endDate: '2018-07-15',
            }
        ],
        studentList: [
            {
                id: 1,
                name: 'John Smith',
                classId: 1,
                pictureUrl: ''
            },
            {
                id: 2,
                name: 'Andy Holst',
                classId: 1,
                pictureUrl: ''
            },
            {
                id: 3,
                name: 'Joan Jacobs',
                classId: 2,
                pictureUrl: ''
            },
            {
                id: 4,
                name: 'Jared Dunn',
                classId: 2,
                pictureUrl: ''
            },
            {
                id: 5,
                name: 'Annie Beck',
                classId: 2,
                pictureUrl: ''
            },
            {
                id: 6,
                name: 'Inger Kratt',
                classId: 3,
                pictureUrl: ''
            }
        ]
    }
    render() {

        const {authenticated} = this.props

        if (!authenticated) return (
			<Redirect to="/login" />
        )
        
        return (
            <div>
                <h1>Overview</h1>
                <div>
                    <ClassList classList={this.state.classList} studentList={this.state.studentList} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
        authenticated: state.currentUser !== null,
    })
  
export default connect(mapStateToProps, null)(Page)