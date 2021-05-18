import { Layout } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router';
import Header from '../../component/header/Header';
import HomeContent from '../../component/home/HomeContent/HomeContent';
import Slider from '../../component/slider/Slider';

const { Sider } = Layout;
// const { Search } = Input;

const MainPage = () => {
	const currentType = useSelector((state) => state.fileType);
	var { type } = currentType;

	const [active, setActive] = useState(type || 'pictures');
	const clickHandler = (currType) => {
		setActive(currType);
	};
	return (
		<div>
			<Header />
			<Layout>
				<Layout>
					<Sider width={250} style={{ background: '#fff' }}>
						<Slider clickHandler={clickHandler} type={active} />
					</Sider>
					<Layout
						style={{
							padding: '0 24px 24px',
							background: '#fff',
						}}
					>
						<Switch>
							<Route><HomeContent /></Route>
						</Switch>

					</Layout>
				</Layout>
			</Layout>
		</div>
	);
};
export default MainPage;
