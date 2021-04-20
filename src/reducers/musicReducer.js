import {REQUEST_GET_MUSIC,GET_MUSIC_SUCCESS,GET_MUSIC_FAIL} from "../actions/type"

const musicReducer = (state={loading:false,musics:[],error:''}, action) => {
    switch (action.type) {
      case REQUEST_GET_MUSIC:
        return {loading:true};
      case GET_MUSIC_SUCCESS:
        return {loading:false,musics:action.payload};
      case GET_MUSIC_FAIL:
          return {loading:false,error:action.payload} ;
      default:
        return state;
    }
  };
  export default musicReducer;