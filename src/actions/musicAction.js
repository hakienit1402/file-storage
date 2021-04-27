import axios from "axios";
import { useSelector } from "react-redux";

import {
  REQUEST_GET_MUSIC,
  GET_MUSIC_SUCCESS,
  GET_MUSIC_FAIL,
  POST_EDIT_MUSIC,
  POST_EDIT_MUSIC_SUCCESS,
  POST_EDIT_MUSIC_FAIL,
  POST_DELETE_MUSIC,
  POST_DELETE_MUSIC_FAIL,
  POST_DELETE_MUSIC_SUCCESS,
  UPDATE_STORE_MUSIC_TMP,
  GET_LIST_MUSIC,
} from "./type";

export const getListMusics = () => (dispatch) => {
  try {
    dispatch({ type: REQUEST_GET_MUSIC });

    axios
      .get(
        "https://file-storage-2021.herokuapp.com/musics/thanhtri98"
      )
      .then((res) => {
        dispatch({ type: GET_MUSIC_SUCCESS, payload: res.data });
      });
  } catch (error) {
    dispatch({ type: GET_MUSIC_FAIL, payload: error.message });
  }
};
export const updateMusicStore = (musics, name, index) => (dispatch) => {
  let dataAlterUpdate = [...musics];
  dataAlterUpdate[index].name = name;
//   console.log(dataAlterUpdate[index]);
const bodyData = {
	id:musics[index].id,
	new_name:name,
	old_name:musics[index].parent,
	extension:musics[index].extension,
	creator:musics[index].creator
}
dispatch({ type: UPDATE_STORE_MUSIC_TMP, payload: dataAlterUpdate });
  // id, new_name,old_name,extension,creator

    // dispatch({ type: POST_EDIT_MUSIC });
    axios
      .put("https://file-storage-2021.herokuapp.com/musics/edit", bodyData
	//   dataAlterUpdate[index]
	  )
      .then((res) => {
		//   console.log(res)
		dispatch({ type: UPDATE_STORE_MUSIC_TMP, payload: dataAlterUpdate });
      }).catch((err)=>{
		dispatch({ type: UPDATE_STORE_MUSIC_TMP, payload: musics });
		// dispatch({ type: POST_EDIT_MUSIC_FAIL, payload:err.message });
		// console.log("iiiiiiii")
	  })
 
};
export const editMusicItem = (row, record) => (dispatch) => {

  try {
    // dispatch({ type: POST_EDIT_MUSIC });
    // console.log(record);
    // const dataUpdate = [...record];
    // const index = musics.findIndex((item) => record.id === item.id);
    // axios
    // 	.post(
    // 		'https://file-storage-2021.herokuapp.com/musics/editname',
    // 		data
    // 	)
    // 	.then((res) => {
    // // dispatch({ type: POST_EDIT_MUSIC_SUCCESS, payload: data });
    // });
  } catch (error) {
    dispatch({ type: POST_EDIT_MUSIC_FAIL, payload: error.message });
  }
};
export const deleteMusicItem = (listkey) => (dispatch) => {

  try {
    dispatch({ type: POST_DELETE_MUSIC });
	// let dataAlterDelete = [...musics]
	// console.log(dataAlterDelete)
    // console.log(data);
    // const dataDelete = data.filter(	res.data =>
    // 	data
    // );

    // axios
    // 	.post(
    // 		'https://file-storage-2021.herokuapp.com/musics/deletemussic',
    // data
    // 	)
    // 	.then((res) => {
    // dispatch({ type: POST_DELETE_MUSIC_SUCCESS, payload: res.data });
    // });
  } catch (error) {
    dispatch({ type: POST_DELETE_MUSIC_FAIL, payload: error.message });
  }
};
