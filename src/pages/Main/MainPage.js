import { Input, Layout } from 'antd';
import React, { useState } from 'react';
import Header from '../../component/header/Header';
import HomeContent from '../../component/home/HomeContent/HomeContent';
import Slider from '../../component/slider/Slider';

const { Sider } = Layout;
const { Search } = Input;

const MainPage = (props) => {
	const [active, setActive] = useState(1);
	const [listBreadcrumb,setListBreadcrumb]= useState(['Home'])
	const clickHandler = (event) => {
		setActive(event.key);
		// console.log(event.key)
	};

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
						<HomeContent active={active} listBreadcrumb={listBreadcrumb}/>
					</Layout>
				</Layout>
			</Layout>
		</div>
	);
};
export default MainPage;
