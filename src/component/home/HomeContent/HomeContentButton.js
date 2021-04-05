import React, { useState, useRef, useEffect } from 'react';
import { Layout, Menu, Breadcrumb, Input, Avatar, Button } from 'antd';
import {
	DownloadOutlined,
	CloseCircleFilled,
	SwapOutlined,
} from '@ant-design/icons';
const { Header, Sider } = Layout;
const { Search } = Input;

const HomeContentButton = (props) => {
	return (
		<div>
			<Button type="default" size="large">
				<DownloadOutlined />
				Download
			</Button>
			<Button type="default" size="large">
				<CloseCircleFilled />
				Delete
			</Button>
			{/* <Button type="primary" size="large">
				<CloseCircleFilled />
				Delete
			</Button> */}
			<Button type="default" size="large">
				<SwapOutlined />
				Move
			</Button>
		</div>
	);
};
export default HomeContentButton;
