import axios from "axios";
import { LOGOUT } from "../constants/authConstants";
import {
    GET_CURRENT,
    GET_LIST,
    GET_LIST_SUCCESS,
    GET_PARENT,
    GET_USED_MEMORY,
    UPDATE_STORE_TMP
} from "./type";

export const updateType = (type) => (dispatch) => {
    dispatch({ type: GET_CURRENT, payload: type });
}
export const updateParent = (parent) => (dispatch) => {
    dispatch({ type: GET_PARENT, payload: parent });
}

const HEAD_URI = "http://localhost:8080/api/user";
// type: musics, pictures, videos
export const getListDatas = (typeFile, data, parent, state = 1) => (dispatch) => {
    // console.log('state', state);
    let url = typeFile !== 'trash' ? `${HEAD_URI}/${typeFile}/${state}/${data.username}/${parent}`
        : `${HEAD_URI}/${typeFile}/${data.username}`;
    try {
        dispatch({ type: GET_LIST });
        let config = {
            method: 'get',
            // url: `${HEAD_URI}/${typeFile}/${state}/${data.username}/${parent}`,
            url: url,
            headers: {
                'Authorization': `Bearer ${data.token}`
            }
        };
        axios(config)
            .then((res) => {
                var data = res.data;
                data.sort((a, b) => { return new Date(b.modifyDate) - new Date(a.modifyDate) });
                dispatch({ type: GET_LIST_SUCCESS, payload: data });
            }).catch(() => {
                dispatch({ type: LOGOUT });
            });
    } catch (error) {
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

    let config = {
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
export const moveToTrash = (listIds, listDatas, creator, token, type) => (dispatch) => {
    var datas = listDatas.filter(f => listIds.includes(f.id)).map(f => {
        return {
            id: f.id,
            name: f.name,
            extension: f.extension
        }
    });
    let dataRequest = {
        creator: creator,
        state: 0,
        datas: datas
    }
    const config = {
        method: 'put',
        url: `${HEAD_URI}/${type}/trash`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        data: dataRequest
    }
    try {
        // console.log('ok');
        axios(config).then(() => {
            let list = listDatas.filter(f => !listIds.includes(f.id));
            // console.log(list);
            dispatch({ type: GET_LIST_SUCCESS, payload: list });
        });
    } catch (err) {
        console.log(err);
    }
    // console.log(dataRequest);

};

export const restoreItem = (listId, listDatas, creator, token) => (dispatch) => {
    let dataPictures = [];
    let dataVideos = [];
    let dataMusics = [];
    // lọc ra theo nhóm: videos, musics, pictures
    listDatas.filter(f => listId.includes(f.id))
        .map(f => {
            if (f.parent === 'videos')
                dataVideos.push({ id: f.id, name: f.name, extension: f.extension })
            else if (f.parent === 'pictures')
                dataPictures.push({ id: f.id, name: f.name, extension: f.extension })
            else
                dataMusics.push({ id: f.id, name: f.name, extension: f.extension })
        });

    const dataRequest = {
        creator: creator,
        state: 1,
        datas: null
    }
    const config = {
        method: 'put',
        url: null,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        data: null
    }
    try {
        if (dataPictures.length !== 0)
            axios({ ...config, url: `${HEAD_URI}/pictures/trash`, data: { ...dataRequest, datas: dataPictures } });
        if (dataVideos.length !== 0)
            axios({ ...config, url: `${HEAD_URI}/videos/trash`, data: { ...dataRequest, datas: dataVideos } });
        if (dataMusics.length !== 0)
            axios({ ...config, url: `${HEAD_URI}/musics/trash`, data: { ...dataRequest, datas: dataMusics } });

        const list = listDatas.filter(f => !listId.includes(f.id));
        // console.log(list);
        dispatch({ type: GET_LIST_SUCCESS, payload: list });

    } catch (err) { console.log(err); }
    // console.log(dataPictures, 'pic');
    // console.log(dataVideos, 'video');
    // console.log(dataMusics, 'music');
}
//
export const getUsedMemory = (creator, token) => (dispatch) => {
    var config = {
        method: 'get',
        url: `${HEAD_URI}/${creator}`,
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    };
    try {
        axios(config)
            .then((res) => {
                dispatch({ type: GET_USED_MEMORY, payload: res.data });
            }).catch(err => {
                console.log(err);
            })
    } catch (err) {
        console.log(err);
    }

}
// export const formatBytes = (bytes) => {
//     if (bytes === 0) return '0 B';
//     const k = 1024;
//     const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
// }


