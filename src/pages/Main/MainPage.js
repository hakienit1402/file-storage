import React, { useState, useRef, useEffect, useContext } from 'react';
import { Layout, Menu, Breadcrumb, Input, Avatar } from 'antd';
import { UserOutlined, PictureOutlined } from '@ant-design/icons';
import Slider from '../../component/slider/Slider';
import HomeContent from '../../component/home/HomeContent/HomeContent';
import Header from '../../component/header/Header';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import getListMusics from "../../actions/musicAction"
const { Sider } = Layout;
const { Search } = Input;

const MainPage = (props) => {
	const [active, setActive] = useState(1);
	 const listMusics = useSelector(state => state)
	 const {loading,error,musics}= listMusics
	 const dispatch = useDispatch();
	const clickHandler = (event) => {
		setActive(event.key);
	};
	//getdata
	// useEffect(() => {
	// dispatch(getListMusics())
	// }, [])
	// console.log(musics)
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
						<HomeContent active={active} />
					</Layout>
				</Layout>
			</Layout>
		</div>
	);
};
export default MainPage;
