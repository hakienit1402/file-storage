import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import "./auth.css";
import { isEmail } from "validator";
import { Button, Col, Layout, Menu, Row, Modal, Input as InputAnt,Form as FormAnt} from "antd";

import { Link } from "react-router-dom";
import logo from "../../images/logo micro.png";
const { Header, Content, Footer } = Layout;
// import { register } from "../actions/auth";
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};
const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};
const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};
const Register = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [otp, setOtp] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [uid, setUid] = useState('');
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const dispatch = useDispatch();
  //   modal
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
	  console.log(otp,uid)
	  setOtp('')
    }, 2000);
  };
  function uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  const onChangeOTP = (e) => {
    setOtp(e.target.value);
  };
  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };
  const onChangeFullname = (e) => {
    const fullname = e.target.value;
    setFullname(fullname);
  };
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // setSuccessful(false);
	setUid(uuidv4())
    console.log(fullname, username, password, email);
    // setIsSubmit(true);
    setVisible(true);
    form.current.validateAll();
    // if (checkBtn.current.context._errors.length === 0) {
    //   dispatch(register(username, email, password))
    //     .then(() => {
    //       setSuccessful(true);
    //     })
    //     .catch(() => {
    //       setSuccessful(false);
    //     });
    // }
  };
  const layout = {
	labelCol: {
	  span: 8,
	},
	wrapperCol: {
	  span: 16,
	},
  };
  return (
    <Layout>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <img
          src={logo}
          style={{
            width: "130px",
            padding: "0.3rem 0 0 1rem",
          }}
          alt="#"
        />
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ float: "right", fontSize: 15 }}
        >
          <Menu.Item>Liên hệ</Menu.Item>
          <Menu.Item>
            <Link to="/register">Đăng ký</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/login">Đăng nhập</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content
        className="site-layout"
        style={{ padding: "0 0px", marginTop: 64 }}
      >
        {/* Modal */}
        <Modal
          title="Mã xác nhận đã được gửi đến email của bạn"
          visible={visible}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          maskClosable={false}
		  footer={[
            // <Button key="back" onClick={handleCancel}>
            //   Return
            // </Button>,
            // <Button key="submit" type="primary" htmlType="submit" loading={confirmLoading} onClick={handleOk}>
            //   Submit
            // </Button>,
          ]}	
        >
			 <FormAnt
    //   {...layout}
      name="basic"
    //   initialValues={{ otp: otp }}
      onFinish={handleOk}

    //   onFinishFailed={onFinishFailed}
    >
		<FormAnt.Item
        // label="Mã xác nhận"
        name="otp"
        rules={[{ required: true, message: 'Vui lòng nhập otp của bạn!' }]}
      >
       <InputAnt value={otp} onChange={onChangeOTP} placeholder="Nhập mã OTP..."/>
      </FormAnt.Item>
	  <FormAnt.Item style={{float:'right'}}>
	  <Button style={{marginRight:5}} >
          Cancel
        </Button>
        <Button type="primary" htmlType="submit" loading={confirmLoading} >
          Submit
        </Button>
		
      </FormAnt.Item>
	  
	</FormAnt>
         
        </Modal>
        {/* end modal */}
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 380 }}
        >
          <div className="col-md-12">
            <div className="card card-container">
              <img
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                alt="profile-img"
                className="profile-img-card"
              />

              <Form onSubmit={handleRegister} ref={form}>
                {/* {!successful && ( */}
                <div>
                  <div className="form-group">
                    <label htmlFor="fullname">Fullname</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="username"
                      value={fullname}
                      onChange={onChangeFullname}
                      validations={[
                        required,
                        // vusername,
                      ]}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="username"
                      value={username}
                      onChange={onChangeUsername}
                      validations={[required, vusername]}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="email"
                      value={email}
                      onChange={onChangeEmail}
                      validations={[required, validEmail]}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Input
                      type="password"
                      className="form-control"
                      name="password"
                      value={password}
                      onChange={onChangePassword}
                      validations={[required, vpassword]}
                    />
                  </div>
                  <div className="form-group">
                    <button className="btn btn-primary btn-block">
                      Sign Up
                    </button>
                  </div>
                </div>
                {/* )} */}
                {/* {message && (
            <div className="form-group">
              <div className={ successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                {message}
              </div>
            </div>
          )} */}
                {/* <CheckButton
									style={{ display: 'none' }}
									ref={checkBtn}
								/> */}
              </Form>
            </div>
          </div>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default Register;
