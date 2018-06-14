import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import BatchList from '../components/BatchList'
import AddBatch from '../components/AddBatch'
import {addBatch} from '../actions/batches'
import * as request from 'superagent'
import {baseUrl} from '../constants'
import './Page.css'

class Page extends Component {
    state = {
        addOption: false
    }

    handleSubmit = (batch) => {
        this.props.addBatch(batch.batchId, batch.startDate, batch.endDate)
        this.setState({addOption: false})
    }

    showAddOption = () => {
        this.setState({addOption: true})
    }

    async componentDidMount() {
        const students = await request.get(`${baseUrl}/students`)
        const batches = await request.get(`${baseUrl}/batches`)

        this.setState({
            students: students.body,
            batches: batches.body
        })
    }


    render() {
        console.log(this.state)

        if (!this.props.authenticated) return (
			<Redirect to="/login" />
        )
        
        return (
            <div className='batch-overview'>
                <h1 className='overview-header'>Overview</h1>
                <div>
                    {this.state.batches && <BatchList batchList={this.state.batches} studentList={this.state.students} />}
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