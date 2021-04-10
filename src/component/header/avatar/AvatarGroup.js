import React, { Component } from 'react';
import { Menu, Button, Popover, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import avatarDefault from '../../../images/googleLogo.png';
import avatar from '../../../images/googleDrive.png';
import './Style.css';
import { message } from 'antd';
import {
	BellOutlined,
	UserOutlined,
	LogoutOutlined,
	DownOutlined,
} from '@ant-design/icons';



const content = (
	<div className="avatar-group-button-user">
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
		<hr />
		<Menu >
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
			
		>
			Đăng xuất
		</Button>
	</div>
);

const menu = (
	<div className="avatar-group-notifi-detail">
		<Menu>
			<Menu.Item key="0">
				<div>1</div>
			</Menu.Item>
			<Menu.Item key="1">
				<div>2</div>
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

export default AvatarGroup;
