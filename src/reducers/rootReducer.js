import { combineReducers } from 'redux'
// import audioReducer from './audioReducer'
import imageReducer from './imageReducer'
import musicReducer from './musicReducer'
import userReducer from './userReducer'
import {fileReducer,fileTypeReducer} from './fileRuducer'

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

const persisConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'musics', 'images']
}
const rootReducer = combineReducers({
    auth: userReducer,
    images: imageReducer,
    musics: musicReducer,
    
    file: fileReducer,
    fileType:fileTypeReducer
})

// export default rootReducer
export default persistReducer(persisConfig, rootReducer);