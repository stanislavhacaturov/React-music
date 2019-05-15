import React, { Component } from 'react';
import axios from 'axios';

class Password extends Component {

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
        });
      })
    })
    .catch(err => err);
  }

  handleInputChange = (event) => {
    this.setState({
        password: event.target.value,
    });
  }

  edit = () => {
    const userId = localStorage.getItem('user');

    const { password, changeInput } = this.state;

    this.setState({
      changeInput: !changeInput,
    });

    axios.post(`http://localhost:3001/passwordEdit`,
      { userId, password }
    ).then(result => {
      this.setState({
        password: '',
      });
    })
    .catch(err => console.log('err', err))
  }

  render() {
    const { password, changeInput } = this.state;
    return (
        <li className='item'>
        {changeInput ? 
            <input type='password' className='editInput' value={password} onChange={this.handleInputChange}/> :
            <span className='text'>Password: *******</span>
        }
        <button className='edit' onClick={this.edit}>Edit</button>
        </li>
    );
  }
}

export default Password;
