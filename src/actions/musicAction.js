import axios from "axios";

import { REQUEST_GET_MUSIC, GET_MUSIC_SUCCESS, GET_MUSIC_FAIL } from "./type";
const getListMusics =() => (dispatch) => {
  try {
    dispatch({ type: REQUEST_GET_MUSIC });
   
    axios
      .get(
        "https://file-storage-2021.herokuapp.com/musics/files/thanhtri98/root"
      )
      .then((res) => {
        dispatch({ type: GET_MUSIC_SUCCESS, payload: res.data });
      });
  } catch (error) {
    dispatch({ type: GET_MUSIC_FAIL, payload: error.message });
  }
};
export default getListMusics;
