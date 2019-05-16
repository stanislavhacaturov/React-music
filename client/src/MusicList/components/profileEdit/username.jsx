import React, { Component, Fragment } from 'react';
import axios from 'axios';

import './profileStyles.css';

class UserName extends Component {

  state = {
    changeInput: false,
    username: '',
  }

  componentDidMount() {
    const userId = localStorage.getItem('user');
    axios.post(`http://localhost:3001/profile`,
      { userId }
    ).then(result => {

      const data = result.data;

      data.map((user) => {
        this.setState({
          username: user.username,
        });
      })
    })
    .catch(err => err);
  }

  handleInputChange = (event) => {
    this.setState({
      username: event.target.value,
    });
  }

  editInput = () => {
    const { changeInput } = this.state;

    this.setState({
      changeInput: !changeInput,
    });
  }

  edit = () => {
    const userId = localStorage.getItem('user');
    const { username, changeInput } = this.state;

    this.setState({
      changeInput: !changeInput,
    });

    axios.post(`http://localhost:3001/userNameEdit`,
      { userId, username }
    ).then(result => {
      const data = result.data
      
      this.setState({
        username: data.username,
      });
		})
    .catch(err => console.log('err', err))
  }

  render() {
    const { username, changeInput } = this.state;
    return (
        <li className='item'>
        {changeInput ? 
          <Fragment>
            <input className='editInput' value={username} onChange={this.handleInputChange}/> 
            <button className='edit' onClick={this.edit}>Save</button>
          </Fragment>:
          <Fragment>
            <span className='text'>Name: {username}</span>
            <button className='edit' onClick={this.editInput}>Edit</button>
          </Fragment>
        }
        </li>
    );
  }
}

export default UserName;
