import { combineReducers } from 'redux'
import audioReducer from './audioReducer'
import imageReducer from './imageReducer'
import musicReducer from './musicReducer'
import userReducer from './userReducer'

const rootReducer = combineReducers({
    users: userReducer,
    images:imageReducer,
    audios:audioReducer,
    musics:musicReducer
})

export default rootReducer