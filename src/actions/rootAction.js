import axios from "axios";
import { LOGOUT } from "../constants/authConstants";
import {
    GET_CURRENT,
    GET_LIST,
    GET_LIST_SUCCESS,

    GET_PARENT,

    POST_DELETE_MUSIC,
    POST_DELETE_MUSIC_FAIL,

    UPDATE_STORE_TMP
} from "./type";

export const updateType = (type) => (dispatch) => {
    dispatch({ type: GET_CURRENT, payload: type });
}
export const updateParent = (parent) => (dispatch) => {
    dispatch({ type: GET_PARENT, payload: parent });
}

const HEAD_URI = "http://localhost:8080/api/user";
// const data = JSON.parse(localStorage.getItem('data'));
// type: musics, pictures, videos
export const getListDatas = (typeFile, data, parent) => (dispatch) => {
    try {
        dispatch({ type: GET_LIST });

        var config = {
            method: 'get',
            url: `${HEAD_URI}/${typeFile}/${data.username}/${parent}`,
            headers: {
                'Authorization': `Bearer ${data.token}`
            }
        };
        // console.log(data);
        axios(config)
            .then((res) => {
                var data = res.data;
                // console.log(data);
                data.sort((a, b) => { return new Date(b.modifyDate) - new Date(a.modifyDate) });
                dispatch({ type: GET_LIST_SUCCESS, payload: data });
            }).catch(() => {
                dispatch({ type: LOGOUT });
                console.log('err1');
            });
    } catch (error) {
        console.log('err2');
        dispatch({ type: LOGOUT });
    }
};
const formatDateTime = () => {
    let d = new Date();
    return d.getFullYear() + '-' +
        ('0' + (d.getMonth() + 1)).slice(-2) + '-' +
        ('0' + d.getDate()).slice(-2) + ' ' +
        ('0' + d.getHours()).slice(-2) + ':' +
        ('0' + d.getMinutes()).slice(-2) + ':' +
        ('0' + d.getSeconds()).slice(-2);
}
export const editFileName = (datas, new_name, index, typeFile, token) => (dispatch) => {
    let dataAlterUpdate = [...datas];
    let oldName = datas[index].name;
    dataAlterUpdate[index].name = new_name;
    dataAlterUpdate[index].modifyDate = formatDateTime();
    const bodyData = {
        id: datas[index].id,
        new_name: new_name,
        old_name: oldName,
        cur_parent: datas[index].parent,
        extension: datas[index].extension,
        creator: datas[index].creator
    }
    // id, new_name,old_name,extension,creator

    // dispatch({ type: POST_EDIT_MUSIC });

    var config = {
        method: 'put',
        url: `${HEAD_URI}/${typeFile}/name`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        data: bodyData
    };

    axios(config)
        .then(function () {
            dispatch({ type: UPDATE_STORE_TMP, payload: dataAlterUpdate });
            // console.log(JSON.stringify(response.data));
        })
        .catch(function () {
            dispatch({ type: UPDATE_STORE_TMP, payload: datas });
            // console.log(error);
        });
};
export const deleteMusicItem = (listkey) => (dispatch) => {
    console.log(listkey, 'root action');
    // id, [name, extension], state, creator ->>>> trash, untrash

    // const bodyData = {
    //     id: datas[index].id,
    //     new_name: new_name,
    //     old_name: oldName,
    //     cur_parent: datas[index].parent,
    //     extension: datas[index].extension,
    //     creator: datas[index].creator
    // }
    // try {
    // dispatch({ type: POST_DELETE_MUSIC });
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
    // } catch (error) {
    //     dispatch({ type: POST_DELETE_MUSIC_FAIL, payload: error.message });
    // }
};


