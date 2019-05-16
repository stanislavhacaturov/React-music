import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/App.css';

class Signin extends Component {
    state = {
        newUser: {
            username: '',
            lastname: '',
            email: '',
            password: ''
        }    
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const { username, lastname, email, password } = this.state
        
        const user = {
            username,
            lastname,
            email,
            password
        }  

        axios.post(`http://localhost:3001/register`, { user })
        .then(res => {
            this.setState({
                error: '',
                message: res.data.message,
                password: '',
                email: '',
                lastname: '',
                username: ''
            });           
        }).catch(err => {
            this.setState({
                error: err.response.data.error,
                message: '',
                password: ''
            });
        });
    }

    handleChangeUserName = (event) => {
        this.setState({
            username: event.target.value
        });
    }

    handleChangeLastName = (event) => {
        this.setState({
            lastname: event.target.value
        });
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
            firstName,
            lastName,
            email,
            password
        } = this.state
        return (
            <div className="wrapper">
                <div className="form-wrapper">
                    <Link to='/' className='homeLink'>Home</Link>
                    <h1>Sign In</h1>
                    <p className='error'>{error}</p>
                    <p className='message'>{message}</p>

                    <form onSubmit={this.handleSubmit} className='signup-form'>
                    
                        <input 
                            value={firstName} 
                            onChange={this.handleChangeUserName} 
                            type='text' 
                            name='username' 
                            placeholder='First Name'/>
                        
                        <input 
                            value={lastName} 
                            onChange={this.handleChangeLastName} 
                            type='text' 
                            name='lastname' 
                            placeholder='Last Name'/>
                        
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
                            <button type='submit'>Create Account</button>
                        </div>   
                        <Link to='login' className='click'>Already have an account?</Link>                
                    </form>
                </div>
            </div>
        );
    }
}

export default Signin;
