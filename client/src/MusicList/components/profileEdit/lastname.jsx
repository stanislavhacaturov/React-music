import React, { Component, Fragment } from 'react';
import axios from 'axios';

class LastName extends Component {

  state = {
    changeInput: false,
    lastname: '',
  }

  componentDidMount() {
    const userId = localStorage.getItem('user');
    axios.post(`http://localhost:3001/profile`,
      { userId }
    ).then(result => {

      const data = result.data;

      data.map((user) => {
        this.setState({
            lastname: user.lastname,
        });
      })
    })
    .catch(err => err);
  }

  handleInputChange = (event) => {
    this.setState({
        lastname: event.target.value,
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
    const { lastname, changeInput } = this.state;

    this.setState({
      changeInput: !changeInput,
    });

    axios.post(`http://localhost:3001/lastNameEdit`,
      { userId, lastname }
    ).then(result => {
      const data = result.data
      
      this.setState({
        lastname: data.lastname,
      });
		})
    .catch(err => console.log('err', err))
  }

  render() {
    const { lastname, changeInput } = this.state;
    return (
        <li className='item'>
        {changeInput ? 
          <Fragment>
            <input className='editInput' value={lastname} onChange={this.handleInputChange}/> 
            <button className='edit' onClick={this.edit}>Save</button>
          </Fragment>:
          <Fragment>
            <span className='text'>Last Name: {lastname}</span>
            <button className='edit' onClick={this.editInput}>Edit</button>
          </Fragment>
        }
        </li>
    );
  }
}

export default LastName;
