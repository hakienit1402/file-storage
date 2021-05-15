import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { login } from '../../actions/authAction';
import '../../fonts/font_awesome/css/all.css';
import avatar from '../../images/auth/avatar.svg';
import bg from '../../images/auth/bg.svg';
import wave from '../../images/auth/wave.png';
import './style.css';


// SignIn.propTypes = {

// };

function SignIn() {
    const [eventU, setU] = useState(false);
    const [eventP, setP] = useState(false);

    const user = useSelector((state) => state.auth);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const dispatch = useDispatch();
    const { loading, error, users } = user;
    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };
    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };
    const his = useHistory();
    const [isClick, setIsClick] = useState(false);
    const [isUser, setIsUser] = useState(false);
    const handleLogin = e => {
        e.preventDefault();
        setIsClick(true);
        dispatch(login(username, password));
    }
    useEffect(() => {
        if (users) {
            setIsUser(false);
            his.push('/main/pictures');
        }
        else {
            setIsUser(true);
        }
    }, [user]);

    return (
        <div className='auth-page'>
            <link crossOrigin href="https://fonts.googleapis.com/css?family=Poppins:600&display=swap" rel="stylesheet" />
            <img className="wave" src={wave} />
            <div className="container-auth">
                <div className="img-auth">
                    <img src={bg} />
                </div>
                <div className="login-content">
                    <form className='form-auth' onSubmit={handleLogin}>
                        <img src={avatar} />
                        <h2 className="title">Xin chào!!!</h2>
                        <div className={"input-div one " + (eventU ? "focus" : "")}>
                            <div className="i-auth">
                                <i className="fas fa-user" />
                            </div>
                            <div className="div">
                                <h5>Tài khoản</h5>
                                <input type="text" className="input" onFocus={() => { setU(true) }} onBlur={(e) => { e.target.value === '' && setU(false) }} onChange={onChangeUsername} />
                            </div>
                        </div>
                        <div className={"input-div pass " + (eventP ? "focus" : "")}>
                            <div className="i-auth">
                                <i className="fas fa-lock" />
                            </div>
                            <div className="div">
                                <h5>Mật khẩu</h5>
                                <input type="password" className="input" onFocus={() => { setP(true) }} onBlur={(e) => { e.target.value === '' && setP(false) }} onChange={onChangePassword} />
                            </div>
                        </div>
                        {isClick && isUser && <p style={{ fontSize: 14, color: '#b90a0a' }}>Tài khoản hoặc mật khẩu không chính xác.</p>}
                        <Link to="/signup" style={{ textDecoration: 'underline' }} className='a-signin'>Quên mật khẩu?</Link>
                        <input type="submit" className="btn-auth" value="Đăng nhập" />
                        <div className='bt'><p>Bạn chưa có tài khoản? </p><Link to="./signup">Đăng ký</Link> <p>ngay</p>.</div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignIn;