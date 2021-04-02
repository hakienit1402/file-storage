import React, { useState, useRef, useEffect } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import Button from '@material-ui/core/Button';
import AddSharpIcon from '@material-ui/icons/AddSharp';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const Slider = (props) => {
	const [duration, setDuration] = useState(0);
	const audioRef = useRef();

	return (
		<div>
			<div style={{ margin: '3rem 0 1rem 15px' }}>
				<Button
					variant="contained"
					startIcon={<AddSharpIcon style={{ fontSize: '36px' }} />}
				>
					Upload
				</Button>
			</div>
			<div style={{ margin: '2rem 0 1rem 15px' }}>
				<Button
					variant="contained"
					startIcon={<AddSharpIcon style={{ fontSize: '36px' }} />}
				>
					New Folder
				</Button>
			</div>
			<div>
				<hr></hr>
			</div>
		</div>
	);
};
export default Slider;
