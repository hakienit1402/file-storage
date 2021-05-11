import axios from "axios";
import Cookies from "js-cookie";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_REQUEST,
} from "../constants/authConstants";

export const login = (username, password) => (dispatch) => {
    dispatch({type:LOGIN_REQUEST,payload:{username,password}})
    axios
    .post(
    //url
    //   "https://file-storage-2021.herokuapp.com/musics/thanhtri98"
    )
    .then((res) => {
    //   dispatch({ type: LOGIN_SUCCESS, payload: res.data.info });
    // Cookies.set('user-data',JSON.stringify(res.data))
    })
    .catch((err) => {
        // dispatch({ type: LOGIN_SUCCESS, payload: err.message });
    }
    )
};
export const register = (fullname,username,email,password)=>(dispatch)=>{
    dispatch({type:REGISTER_REQUEST,payload:{fullname,username,email,password}})
    axios
    .post(
    //url
    //   "https://file-storage-2021.herokuapp.com/musics/thanhtri98"
    )
    .then((res) => {
    //   dispatch({ type: REGISYER_SUCCESS, payload: res.data.info });
    // Cookies.set('user-data',JSON.stringify(res.data))
    })
    .catch((err) => {
        // dispatch({ type: LOGIN_SUCCESS, payload: err.message });
    }
    )
}
export const checkOTP = (otp)=>(dispatch)=>{
    axios
    .post(
    //url
    //   "https://file-storage-2021.herokuapp.com/musics/thanhtri98" 
    // , otp
    )
    .then((res) => {
    //   dispatch({ type: REGISYER_SUCCESS, payload: res.data.info });
    // Cookies.set('user-data',JSON.stringify(res.data))
    })
    .catch((err) => {
        // dispatch({ type: LOGIN_SUCCESS, payload: err.message });
    }
    )
}