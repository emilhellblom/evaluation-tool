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
        addOption: false
    }

    handleSubmit = (batch) => {
        this.props.addBatch(batch.batchId, batch.startDate, batch.endDate)
        this.setState({addOption: false})
    }

    showAddOption = () => {
        this.setState({addOption: true})
    }

    // componentDidMount() {
    //     request
    //     .get(`${baseUrl}/batches`)
    //     .then(result => this.setState({batches: result.body}))
    // }

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
        const {authenticated} = this.props

        if (!authenticated) return (
			<Redirect to="/login" />
        )
        
        return (
            <div>
                <h1>Overview</h1>
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