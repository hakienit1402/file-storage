import axios from "axios";
import {
    LOGIN_FAIL,
    LOGIN_REQUEST,


    LOGIN_SUCCESS,


    LOGOUT,


    REGISTER_REQUEST
} from "../constants/authConstants";
const HEAD_URI = "http://localhost:8080/api";
export const login = (username, password) => (dispatch) => {
    // dispatch({ type: LOGIN_REQUEST, payload: { username, password } })
    axios
        .post(
            //url
            `${HEAD_URI}/signin`, { username, password }
        )
        .then((res) => {
            // localStorage.setItem("isAuth",true)

            dispatch({ type: LOGIN_SUCCESS, payload: res.data });
            // window.location.reload()
            // console.log('asdjadsa');
            // Cookies.set('user-data',JSON.stringify(res.data))
        })
        .catch((err) => {
            // console.log(err);
            dispatch({ type: LOGIN_FAIL, payload: "Tài khoản hoặc mật khẩu không chính xác"});
        }
        )
};
export const register = (fullname, username, email, password) => (dispatch) => {
    dispatch({ type: REGISTER_REQUEST, payload: { fullname, username, email, password } })
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
export const logout = () => (dispatch) => {
    dispatch({ type: LOGOUT });
    // localStorage.removeItem('isAuth')
}
export const checkOTP = (otp) => (dispatch) => {
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