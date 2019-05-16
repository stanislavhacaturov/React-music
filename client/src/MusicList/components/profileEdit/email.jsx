import React, { Component, Fragment } from 'react';
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

  editInput = () => {
    const { changeInput } = this.state;

    this.setState({
      changeInput: !changeInput,
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
    ).then(result => {
      const data = result.data
      
      this.setState({
        email: data.email,
      });
		})
    .catch(err => console.log('err', err))
  }

  render() {
    const { email, changeInput } = this.state;
    return (
        <li className='item'>
        {changeInput ? 
          <Fragment>
            <input type='email' className='editInput' value={email} onChange={this.handleInputChange}/> 
            <button className='edit' onClick={this.edit}>Save</button>
          </Fragment>:
          <Fragment>
            <span className='text'>Email: {email}</span>
            <button className='edit' onClick={this.editInput}>Edit</button>
          </Fragment>
        }
        </li>
    );
  }
}

export default Email;
