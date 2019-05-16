import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Signin from './Authorization/Signin';
import Login from './Authorization/Login';
import Home from './Authorization/Home';
import AllMusicList from './MusicList/AllMusicList';
import ProfilePage from './MusicList/ProfilePage';
import PasswordEditPage from './MusicList/PasswordEdit';
import MyMusic from './MusicList/MyMusicPage';

import withAuth from './withAuth';

import './styles/App.css';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Route path='/' exact component={Home} />
                <Route path='/signin' component={Signin} />
                <Route path='/login' component={Login} />
                <Route path='/music' component={withAuth(AllMusicList)} />
                <Route path='/profile' component={withAuth(ProfilePage)} />
                <Route path='/password' component={withAuth(PasswordEditPage)} />
                <Route path='/mymusic' component={withAuth(MyMusic)} />
            </BrowserRouter>    
        )
    }
}

export default App;