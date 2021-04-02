import React from 'react';
import Slider from './pages/HomePage/Slider';
import HomeContent from './pages/HomePage/HomeContent';
import HeaderPage from './pages/Header/HeaderPage';
import { Layout, Menu, Breadcrumb, Table } from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const App = () => {
	return (
		<div>
			<Layout>
				<HeaderPage />
				<Layout>
					<Sider width={250} style={{ background: '#fff' }}>
						<Slider />
					</Sider>
					<Layout style={{ padding: '0 24px 24px' }}>
						<HomeContent />
					</Layout>
				</Layout>
			</Layout>
		</div>
	);
};

export default App;
