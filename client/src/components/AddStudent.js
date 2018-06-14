import React, {Component} from 'react'

export default class AddStudent extends Component {
    state = {}

    handleSubmit = (e) => {
		e.preventDefault()
		this.props.onSubmit(this.state)
	}

	handleChange = (event) => {
        const {name, value} = event.target

        this.setState({
        [name]: value
        })
    }

    render() {
        const {type} = this.props
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="firstName">First name</label>
                        <input type="firstName" name="firstName" id="firstName" value={
                            this.state.firstName || ''
                        } onChange={ this.handleChange } />
                    </div>

                    <div>
                        <label htmlFor="lastName">Last Name</label>
                        <input type="lastName" name="lastName" id="lastName" value={
                            this.state.lastName || ''
                        } onChange={ this.handleChange } />
                    </div>

                    <div>
                        <label htmlFor="pictureUrl">Picture Url</label>
                        <input type="pictureUrl" name="pictureUrl" id="pictureUrl" value={
                            this.state.pictureUrl || ''
                        } onChange={ this.handleChange } />
                    </div>
                    <button type="submit">{type} Student</button>
                </form>
            </div>
        )
    }
}