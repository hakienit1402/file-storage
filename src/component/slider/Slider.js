import {
	PictureOutlined,
	PlayCircleFilled,
	VideoCameraFilled
} from '@ant-design/icons';
import { Menu } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentType } from '../../actions/rootAction';
import SliderFormUpload from './SliderFormUpload';
const Slider = ({ clickHandler }) => {
	const [currentType, setCurrentType] = useState('pictures');
	const dispatch = useDispatch();
	const handleItemClick = e => {
		// console.log(e.key);
		clickHandler(e);
		dispatch(getCurrentType(e.key));
		setCurrentType(e.key);
	}
	return (
		<div>
			<SliderFormUpload />
			<div>
				<hr></hr>
				<Menu
					onClick={handleItemClick}
					style={{ width: 256 }}
					defaultSelectedKeys={[currentType]}
					mode="inline"
				>
					<Menu.Item key="pictures">
						<Link
							to='/main/pictures'>
							<PictureOutlined />
						Ảnh
						</Link>

					</Menu.Item>
					<Menu.Item key="musics">
						<Link
							to='/main/musics'>
							<PlayCircleFilled />
						Âm nhạc
					</Link>

					</Menu.Item>
					<Menu.Item key="videos" >
						<Link
							to='/main/videos'>
							<VideoCameraFilled />
						Video
					</Link>

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
