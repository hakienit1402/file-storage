import { Input, Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router';
import { getCurrentType } from '../../actions/rootAction';
import Header from '../../component/header/Header';
import HomeContent from '../../component/home/HomeContent/HomeContent';
import Slider from '../../component/slider/Slider';

const { Sider } = Layout;
const { Search } = Input;

const MainPage = () => {
	const [active, setActive] = useState('pictures');
	const clickHandler = (event) => {
		setActive(event.key);
		// console.log(event.key)
	};
	const dispatch = useDispatch();
	useEffect(()=>{
		dispatch(getCurrentType(active));
	},[]);
	// console.log(active,'asdasd');
	return (
		<div>
			<Layout>
				<Header />
				<Layout>
					<Sider width={250} style={{ background: '#fff' }}>
						<Slider clickHandler={clickHandler} />
					</Sider>
					<Layout
						style={{
							padding: '0 24px 24px',
							background: '#fff',
						}}
					>
						{/* <HomeContent active={active} listBreadcrumb={listBreadcrumb}/> */}
						{/* <HomeContent key={'pictures'} /> */}
						<Switch>
							<Route path={'/main/:' + active} ><HomeContent /></Route>
						</Switch>

					</Layout>
				</Layout>
			</Layout>
		</div>
	);
};
export default MainPage;
