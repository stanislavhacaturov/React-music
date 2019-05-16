import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../stylesCont.css';

class PasswordEdit extends Component {

  state = {
    changeInput: false,
    password: '',
  }

  componentDidMount() {
    const userId = localStorage.getItem('user');
    axios.post(`http://localhost:3001/profile`,
      { userId }
    ).then(result => {

      const data = result.data;

      data.map((user) => {
        this.setState({
            password: '',
            newPassword: '',
            error: ''
        });
      })
    })
    .catch(err => err);
  }

  handleInputChangePass = (event) => {
    this.setState({
        password: event.target.value,
    });
  }

  handleInputChangeNewPass = (event) => {
    this.setState({
        newPassword: event.target.value,
    });
  }

  edit = () => {
    const userId = localStorage.getItem('user');

    const { password, newPassword, changeInput } = this.state;

    this.setState({
      changeInput: !changeInput,
    });

    axios.post(`http://localhost:3001/passwordEdit`,
      { userId, newPassword, password }
    ).then(result => {
      this.setState({
        newPassword: '',
        password: ''
      });
        alert('Password changed!')
    })
    .catch(err => {
      this.setState({
        error: err.response.data.error
      });
    })
  }

  render() {
    const { password, newPassword, error } = this.state;
    return (
        <div className="music-wrapper">
        <Link to='/profile' className='link1'>Profile</Link>
        <h1>Сhange Password</h1>
        <p className='error'>{error}</p>
        <ul className='profile'>
            <li className='item'>
                <span className='text'>Your password: </span>
                <input type='password' className='editInput' value={password} onChange={this.handleInputChangePass}/>
            </li>

            <li className='item'>
                <span className='text'>New password: </span>
                <input type='password' className='editInput' value={newPassword} onChange={this.handleInputChangeNewPass}/>
            </li>
            <button className='editPassword' onClick={this.edit}>Edit</button>
        </ul>
        </div>
    );
  }
}

export default PasswordEdit;
