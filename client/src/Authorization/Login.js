import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import { user } from '../MusicList/actions/creator';

import '../styles/App.css';

class Login extends Component {
    state = {
        User: {
            email: '',
            password: '',
            error: '',
            message: ''
        }    
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const { email, password } = this.state
        
        const user = {
            email,
            password
        }  

        axios.post(`http://localhost:3001/authorization`,
            { user }
        ).then(res => {
           const token = res.data.token;
           localStorage.setItem('token', token)
           const { id } = res.data.user;
           localStorage.setItem('user', id)
           this.props.history.push('/mymusic');
        }).catch(err => {
            this.setState({
                error: err.response.data.error,
                message: '',
                password: ''
            });
        })
    }

    handleChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        });
    }

    handleChangePassword = (event) => {
        this.setState({
            password: event.target.value
        });
    }

    render() {    
        const {
            error,
            message,
            email,
            password
        } = this.state 
        return (
            <div className="wrapper">
                <div className="form-wrapper">
                    <Link to='/' className='homeLink'>Home</Link>
                    <h1>Log In</h1>             
                    <p className='error'>{error}</p>
                    <p className='message'>{message}</p>
                    <form onSubmit={this.handleSubmit} className='signup-form'>
                        
                        <input 
                            value={email} 
                            onChange={this.handleChangeEmail} 
                            type='email' 
                            name='email' 
                            placeholder='Email'/>
                    
                        <input 
                            value={password} 
                            onChange={this.handleChangePassword} 
                            type='password' 
                            name='password' 
                            placeholder='Password'/>

                        <div className="createAccount">
                            <button type='submit'>Log In</button>
                        </div>    
                            <Link to='signin' className='click'>Create new account</Link>                        
                    </form>
                </div>
            </div> 
        );
    }
}

export default connect(state => ({ }), { user })(Login);