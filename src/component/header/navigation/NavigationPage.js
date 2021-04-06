import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Space, Typography, Divider, Button } from 'antd';

export class NavigationPage extends Component {
	state = {};

	render() {
		return (
			<>
				<div>
					<Space split={<Divider type="vertical" />}>
						<Button type="link">
							<Link to="/top-new" style={{ color: 'white' }}>
								MP3 CHART
							</Link>
						</Button>
						<Button type="link">
							<Link to="/new-release" style={{ color: 'white' }}>
								MỚI PHÁT HÀNH
							</Link>
						</Button>
						<Button type="link" style={{ color: 'white' }}>
							TOP 100
						</Button>
						<Button type="link">
							<Link to="/singer" style={{ color: 'white' }}>
								NGHỆ SĨ
							</Link>
						</Button>
					</Space>
				</div>
			</>
		);
	}
}

export default NavigationPage;
