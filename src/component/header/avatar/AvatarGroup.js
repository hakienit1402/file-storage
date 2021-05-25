import {
	BellOutlined,
	LogoutOutlined, UserOutlined
} from '@ant-design/icons';
import { Button, Dropdown, Menu, Popover } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { logout } from '../../../actions/authAction';
import MyProfile from '../../../component/home/myProfile/MyProfile';
import avatar from '../../../images/googleDrive.png';
import avatarDefault from '../../../images/googleLogo.png';
import './Style.css';

const AvatarGroup = () => {
	const dispatch = useDispatch();
	const [visible, setVisible] = useState(false);
	const his = useHistory();
	const handleLogout = () => {
		dispatch(logout());
		his.replace('/');
		// console.log(
	};

	const showModal = () => {
		setVisible(true);
	};

	const handleOk = (e) => {
		console.log(e);
		setVisible(false);
	};

	const handleCancel = (e) => {
		console.log(e);
		setVisible(false);
	};

	const menu = (
		<div className="avatar-group-notifi-detail">
			<Menu>
				<Menu.Item key="0">
					<div>Bạn đang sử dụng gói cơ bản </div>
				</Menu.Item>
				<Menu.Item key="1">
					<div>Hãy nâng cấp lên Premium ngay!!</div>
				</Menu.Item>
			</Menu>
		</div>
	);
	const content = (
		<div className="avatar-group-button-user">
			<div>
				<img
					src={avatar}
					alt="my image"
					style={{
						margin: '1rem 0 0 5rem',
						width: 50,
						cursor: 'pointer',
					}}
				/>
			</div>
			<hr />
			<Menu>
				<Menu.Item key="1" icon={<UserOutlined />}>
					<Link type="primary" onClick={showModal}>
						Open Modal
					</Link>
					<Modal
						visible={visible}
						onOk={handleOk}
						onCancel={handleCancel}
					>
						<MyProfile />
					</Modal>
				</Menu.Item>
				<Menu.Item key="2" icon={<UserOutlined />}>
					<Link to="/upgrade">Nâng cấp tài khoản</Link>
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
				style={{ marginLeft: '3rem' }}
				onClick={handleLogout}
			>
				Đăng xuất
			</Button>
		</div>
	);

	return (
		<div
			style={{
				float: 'center',
				marginTop: '1rem',
			}}
		>
			<Popover content={content} trigger="click">
				<img
					src={avatarDefault}
					alt="my image"
					style={{
						width: 140,
						height: 40,
						cursor: 'pointer',
						float: 'right',
						margin: '0 2rem 0 2rem',
					}}
				/>
			</Popover>
			<div style={{ float: 'left' }}>
				<Dropdown
					overlay={menu}
					placement="bottomCenter"
					trigger={['click']}
				>
					<Button
						previewVisible={true}
						shape="circle"
						icon={<BellOutlined />}
						size={'large'}
					/>
				</Dropdown>
			</div>
		</div>
	);
};

export default AvatarGroup;