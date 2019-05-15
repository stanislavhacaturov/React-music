import React, { Component } from 'react';
import axios from 'axios';

class Email extends Component {

  state = {
    changeInput: false,
    email: '',
  }

  componentDidMount() {
    const userId = localStorage.getItem('user');
    axios.post(`http://localhost:3001/profile`,
      { userId }
    ).then(result => {

      const data = result.data;

      data.map((user) => {
        this.setState({
            email: user.email,
        });
      })
    })
    .catch(err => err);
  }

  handleInputChange = (event) => {
    this.setState({
        email: event.target.value,
    });
  }

  edit = () => {
    const userId = localStorage.getItem('user');
    const { email, changeInput } = this.state;

    this.setState({
      changeInput: !changeInput,
    });

    axios.post(`http://localhost:3001/emailEdit`,
      { userId, email }
    ).catch(err => console.log('err', err))
  }

  render() {
    const { email, changeInput } = this.state;
    return (
        <li className='item'>
        {changeInput ? 
            <input type='email' className='editInput' value={email} onChange={this.handleInputChange}/> :
            <span className='text'>Email: {email}</span>
        }
        <button className='edit' onClick={this.edit}>Edit</button>
        </li>
    );
  }
}

export default Email;
