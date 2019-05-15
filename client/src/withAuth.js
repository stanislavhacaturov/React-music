import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default function withAuth(ComponentToProtect) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
      };
    }

    componentDidMount() {
      const token = localStorage.getItem('token');
      axios.post(`http://localhost:3001/checkToken`,
      { token }
      ).then(res => {
        this.setState({ loading: false });
        localStorage.setItem('token', token)
      }).catch(err => {
          console.log('err', err);
          this.setState({ loading: false, redirect: true });
      })
    }

    render() {
      const { loading, redirect } = this.state;
      if (loading) {  
        return null;       
      }
      if (redirect) {
        return <Redirect to="/login" />;
      }
      return (
        <React.Fragment>
          <ComponentToProtect />
        </React.Fragment>
      );
    }
  }
}