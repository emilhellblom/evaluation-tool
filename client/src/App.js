import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import LoginPage from './containers/LoginPage'
import SignupPage from './containers/SignupPage'
import Page from './containers/Page'
import BatchSpec from './components/BatchSpec'
import StudentSpec from './components/StudentSpec'
import Rating from './components/Rating'
import './App.css';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <main className='App' style={{marginTop:25}}>
                        <Route exact path="/login" component={LoginPage} />
                        <Route exact path="/signup" component={SignupPage} />
                        <Route exact path="/home" component={Page} />
                        <Route exact path="/batch/:id" component={BatchSpec} />
                        <Route exact path="/students/:id" component={StudentSpec} />
                        <Route exact path="/ratings/:id" component={Rating} />
                        <Route exact path="/" render={ () => <Redirect to="/home" /> } />
                    </main>
                </div>
            </Router>
        );
    }
}

export default App;
