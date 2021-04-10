import React, { useState, useRef, useEffect } from 'react';
import { Layout, Menu, Breadcrumb, Input, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Slider from '../../component/home/Slider';
import HomeContent from '../../component/home/HomeContent/HomeContent';
import Header from '../../component/header/Header';
const { Sider } = Layout;
const { Search } = Input;

const MainPage = (props) => {
	return (
		<div>
			<Layout>
				<Header />
				<Layout>
					<Sider width={250} style={{ background: '#fff' }}>
						<Slider />
					</Sider>
					<Layout
						style={{ padding: '0 24px 24px', background: '#fff' }}
					>
						<HomeContent />
					</Layout>
				</Layout>
			</Layout>
		</div>
	);
};
export default MainPage;
