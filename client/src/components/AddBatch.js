import React, {Component} from 'react'

export default class AddBatch extends Component {
    state = {}

    handleSubmit = (e) => {
		this.props.onSubmit(this.state)
	}

	handleChange = (event) => {
        const {name, value} = event.target

        this.setState({
        [name]: value
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="batchId">Batch ID</label>
                        <input type="number" name="batchId" id="batchId" value={
                            this.state.batchId || ''
                        } onChange={ this.handleChange } />
                    </div>

                    <div>
                        <label htmlFor="startDate">Start Date</label>
                        <input type="date" name="startDate" id="startDate" value={
                            this.state.startDate || ''
                        } onChange={ this.handleChange } />
                    </div>

                    <div>
                        <label htmlFor="endDate">End Date</label>
                        <input type="date" name="endDate" id="endDate" value={
                            this.state.endDate || ''
                        } onChange={ this.handleChange } />
                    </div>
                    <button type="submit">Add Batch</button>
                </form>
            </div>
        )
    }
}