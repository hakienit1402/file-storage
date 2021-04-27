import axios from 'axios';

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
} from './type';
export const getListMusics = () => (dispatch) => {
	try {
		dispatch({ type: REQUEST_GET_MUSIC });

		axios
			.get(
				'https://file-storage-2021.herokuapp.com/musics/files/thanhtri98/root'
			)
			.then((res) => {
				dispatch({ type: GET_MUSIC_SUCCESS, payload: res.data });
			});
	} catch (error) {
		dispatch({ type: GET_MUSIC_FAIL, payload: error.message });
	}
};

export const editMusicItem = (data) => (dispatch) => {
	try {
		dispatch({ type: POST_EDIT_MUSIC });

		// axios
		// 	.post(
		// 		'https://file-storage-2021.herokuapp.com/musics/editname',
		// 		data
		// 	)
		// 	.then((res) => {
		dispatch({ type: POST_EDIT_MUSIC_SUCCESS, payload: data });
		// });
	} catch (error) {
		dispatch({ type: POST_EDIT_MUSIC_FAIL, payload: error.message });
	}
};
export const deleteMusicItem = (data) => (dispatch) => {
	try {
		dispatch({ type: POST_DELETE_MUSIC });
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
