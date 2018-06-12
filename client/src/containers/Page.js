import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import BatchList from '../components/BatchList'
import AddBatch from '../components/AddBatch'
import {addBatch} from '../actions/batches'
import * as request from 'superagent'
import {baseUrl} from '../constants'

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
        ],
        addOption: false
    }

    handleSubmit = (batch) => {
        this.props.addBatch(batch.batchId, batch.startDate, batch.endDate)
        this.setState({addOption: false})
    }

    showAddOption = () => {
        this.setState({addOption: true})
    }

    componentDidMount() {
        request
        .get(`${baseUrl}/batches`)
        .then(result => this.setState({batches: result.body}))
    }



    render() {
        console.log(this.state)
        const {authenticated} = this.props

        if (!authenticated) return (
			<Redirect to="/login" />
        )
        
        return (
            <div>
                <h1>Overview</h1>
                <div>
                    {this.state.batches && <BatchList batchList={this.state.batches} studentList={this.state.studentList} />}
                </div>
                {this.state.addOption !== true && <button onClick={this.showAddOption}>Add batch</button>}
                {this.state.addOption === true && <AddBatch onSubmit={this.handleSubmit}/>}
            </div>
        )
    }
}

const mapStateToProps = state => ({
        authenticated: state.currentUser !== null,
    })
  
export default connect(mapStateToProps, {addBatch})(Page)