import React, { Component } from 'react';
import { Menu, Button, Popover, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import avatarDefault from '../../../images/googleLogo.png';
import avatar from '../../../images/googleDrive.png';
import { connect } from 'react-redux';
// import { logout } from '../../../pages/signin/actions';
import './Style.css';
import { message } from 'antd';
import {
	BellOutlined,
	UserOutlined,
	LogoutOutlined,
	DownOutlined,
} from '@ant-design/icons';
// import Signin from '../../../pages/signin/Signin';
function logout() {
	window.location.reload();
}

function handleMenuClick(e) {
	message.info('Click on menu item.');
	console.log('click', e);
}
const content = (
	<div className="avatar-group-button-user">
		<Link to="/profile">
			<div>
				<img
					src={avatar}
					alt="my image"
					style={{
						marginTop: '1rem',
						width: 50,
						cursor: 'pointer',
					}}
				/>
			</div>
		</Link>
		<hr />
		<Menu onClick={handleMenuClick}>
			<Menu.Item key="1" icon={<UserOutlined />}>
				1st menu item
			</Menu.Item>
			<Menu.Item key="2" icon={<UserOutlined />}>
				2nd menu item
			</Menu.Item>
			<Menu.Item key="3" icon={<UserOutlined />}>
				3rd menu item
			</Menu.Item>
		</Menu>
		<hr />

		<Button
			type="dashed"
			shape="round"
			icon={<LogoutOutlined />}
			size={'middle'}
			onClick={logout}
		>
			Đăng xuất
		</Button>
	</div>
);

const menu = (
	<div className="avatar-group-notifi-detail">
		<Menu>
			<Menu.Item key="0">
				<div>Sơn Tùng MTP</div>
			</Menu.Item>
			<Menu.Item key="1">
				<div>Mr Siro vừa ra bài hát mới</div>
			</Menu.Item>
		</Menu>
	</div>
);
export class AvatarGroup extends Component {
	render() {
		return (
			<div
				style={{
					float: 'center',
					marginTop: '1rem',
				}}
			>
				<Dropdown overlay={menu} trigger={['click']}>
					<Button
						shape="circle"
						icon={<BellOutlined />}
						size={'large'}
					/>
				</Dropdown>

				<Popover content={content} trigger="click">
					<img
						src={avatarDefault}
						alt="my image"
						style={{
							width: 140,
							height: 40,
							cursor: 'pointer',
							margin: '0 0 0 2rem',
						}}
					/>
				</Popover>
			</div>
		);
	}
}
// const mapStateToProps = (state) => ({
// 	data: state.reducerLogin.data,
// 	userToken: state.reducerLogin.userToken,
// 	loading: state.reducerLogin.loading,
// 	error: state.reducerLogin.error,
// 	authenticated: state.reducerLogin.authenticated,
// });
// const mapDispatchToProps = {};
// export default connect(mapStateToProps, mapDispatchToProps)(AvatarGroup);
export default AvatarGroup;
