import {
  REQUEST_GET_MUSIC,
  GET_MUSIC_SUCCESS,
  GET_MUSIC_FAIL,
  POST_EDIT_MUSIC,
  POST_EDIT_MUSIC_SUCCESS,
  POST_EDIT_MUSIC_FAIL,
  POST_DELETE_MUSIC,
  POST_DELETE_MUSIC_SUCCESS,
  POST_DELETE_MUSIC_FAIL,
  UPDATE_STORE_MUSIC_TMP,
  GET_LIST_MUSIC,
} from "../actions/type";

const musicReducer = (
  state = { loading: false, musics: [], error: "" },
  action
) => {
  switch (action.type) {
    case REQUEST_GET_MUSIC:
      return { loading: true };
    case GET_MUSIC_SUCCESS:
      return { loading: false, musics: action.payload };
    case GET_MUSIC_FAIL:
      return { loading: false, error: action.payload };
    case POST_EDIT_MUSIC:
      return { loading: true };
    case UPDATE_STORE_MUSIC_TMP:
      return { loading: false, musics: action.payload };
    case GET_LIST_MUSIC:
      return state;
    case POST_EDIT_MUSIC_SUCCESS:
      return { loading: false, musics: action.payload };
    case POST_EDIT_MUSIC_FAIL:
      return { loading: false, error: action.payload };
    case POST_DELETE_MUSIC:
      return { loading: true };
    case POST_DELETE_MUSIC_SUCCESS:
      return { loading: false, musics: action.payload };
    case POST_DELETE_MUSIC_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export default musicReducer;
