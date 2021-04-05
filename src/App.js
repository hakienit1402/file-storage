import React from 'react';
import HomePage from './pages/HomePage/HomePage';
import { Layout, Menu, Breadcrumb, Table } from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const App = () => {
	return (
		<div>
			<HomePage />
		</div>
	);
};

export default App;
