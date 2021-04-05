import React, { Component } from 'react';
import { Avatar, Image } from 'antd';
import logo from '../../images/googleLogo.png';
import AvatarGroup from './avatar/AvatarGroup';
import NavigationPage from './navigation/NavigationPage';
import SearchInput from './searchBar/SearchInput';
import { Row, Col } from 'antd';
import './HeaderStyle.css';
import { Link } from 'react-router-dom';
export class Header extends Component {
	state = {
		pageIndex: 0,
	};

	render() {
		return (
			<>
				<Row style={{}}>
					<Col span={5} style={{}}>
						<Link to="/">
							<Image
								src={logo}
								style={{
									width: '130px',
									padding: '0.3rem 0 0 1rem',
								}}
							/>
						</Link>
					</Col>
					<Col
						span={15}
						className="inputSearchHeader"
						style={{ display: 'flex' }}
					>
						<SearchInput></SearchInput>
					</Col>
					<Col span={4}>
						<AvatarGroup style={{}}></AvatarGroup>
					</Col>
				</Row>
			</>
		);
	}
}

export default Header;
