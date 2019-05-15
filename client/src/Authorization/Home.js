import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

class Home extends Component {
    render() {    
        return (
            <div className="wrapperHome">
                <div className="form-wrapperHome">
                    <h1>Music App</h1>             
                    <form className='signup-formHome'>            
                        <div className="home">
                            <Link to='signin' className='homeButton'>Create new account</Link>   
                            <Link to='login' className='homeButton'>Log In</Link>   
                        </div>                                                   
                    </form>
                </div>
            </div> 
        );
    }
}

export default Home;