import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Password extends Component {

  componentDidMount() {
    const userId = localStorage.getItem('user');
    axios.post(`http://localhost:3001/profile`,
      { userId }
    ).catch(err => console.log('err', err))
  }

  render() {
    return (
        <li className='item'>
          <span className='text'>Password: *******</span>
          <Link to='/password' className='editLink' onClick={this.edit}>Edit</Link>
        </li>
    );
  }
}

export default Password;
