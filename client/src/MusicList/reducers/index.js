import { combineReducers } from 'redux';

import songs from './songs';
import users from './profile';
import mySongs from './mySongs';

const rootReducer = combineReducers({ songs, users, mySongs });

export default rootReducer;
