import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

class Page extends Component {
    render() {

        const {authenticated} = this.props

        if (!authenticated) return (
			<Redirect to="/login" />
        )
        
        return (
            <div>
                <h1> Hello world </h1>
            </div>
        )
    }
}

const mapStateToProps = state => ({
        authenticated: state.currentUser !== null,
    })
  
export default connect(mapStateToProps, null)(Page)