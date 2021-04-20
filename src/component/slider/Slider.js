import React, { useState, useRef, useEffect, useContext } from 'react';
import { Layout, Menu, Breadcrumb, Modal, Upload, Popover, Input } from 'antd';
import SliderFormUpload from './SliderFormUpload';
import { LayoutProvider } from '../../context/LayoutContext';
import {
	PictureOutlined,
	PlayCircleFilled,
	VideoCameraFilled,
} from '@ant-design/icons';

const Slider = ({ clickHandler }) => {
	const audioRef = useRef();

	const handleClick = (e) => {
		console.log('click ', e);
	};

	return (
		<div>
			<SliderFormUpload />
			<div>
				<hr></hr>
				<Menu
					onClick={clickHandler}
					style={{ width: 256 }}
					defaultSelectedKeys={['1']}
					defaultOpenKeys={['sub1']}
					mode="inline"
				>
					<Menu.Item key="1">
						<PictureOutlined />
						Ảnh
					</Menu.Item>
					<Menu.Item key="2">
						<PlayCircleFilled />
						Âm nhạc
					</Menu.Item>
					<Menu.Item key="3">
						<VideoCameraFilled />
						Video
					</Menu.Item>
				</Menu>
			</div>
			<div>
				<hr></hr>
			</div>
		</div>
	);
};
export default Slider;
