import {combineReducers} from 'redux'
import user from "./user/reducer";
import auth from "./auth/reducers"
import error from './error/reducers'

export default reducers => combineReducers({
    user,
    auth,
    error
});
