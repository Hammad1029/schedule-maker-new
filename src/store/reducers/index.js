// third-party
import { combineReducers } from 'redux';

// project import
import user from "./user";
import app from "./app";

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ user, app });

export default reducers;
