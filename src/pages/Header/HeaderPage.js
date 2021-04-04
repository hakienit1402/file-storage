import React, { useState, useRef, useEffect } from 'react';
import { Layout, Menu, Breadcrumb, Input, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import googleLogo from '../../images/googleLogo.png';
const { Header } = Layout;
const { Search } = Input;

const HeaderPage = (props) => {
	const [duration, setDuration] = useState(0);
	const audioRef = useRef();

	return (
		<div>
			<Header className="header">
				<div>
					<img
						src={googleLogo}
						alt="my logo"
						style={{
							width: '160px',
							height: '50px',
							marginLeft: '-35px',
						}}
					/>
					<Search
						placeholder="input search text"
						onSearch={(value) => console.log(value)}
						style={{
							width: 500,
							height: 100,
							margin: '1.5rem 0px 0px 6.5rem',
						}}
						size="lager"
					/>
					<div
						style={{
							float: 'right',
							backgroundColor: 'antiquewhite',
						}}
					>
						Vỹ Trần
						<Avatar
							style={{
								backgroundColor: '#87d068',
								margin: '1rem',
							}}
						>
							<UserOutlined />
						</Avatar>
					</div>
				</div>
			</Header>
		</div>
	);
};
export default HeaderPage;
