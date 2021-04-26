import React, { useState, useRef, useEffect } from 'react';
import { Layout, Menu, Breadcrumb, Input, Avatar, Button } from 'antd';
import { deleteMusicItem } from '../../../actions/musicAction';
import {
	DownloadOutlined,
	CloseCircleFilled,
	SwapOutlined,
} from '@ant-design/icons';
const { Header, Sider } = Layout;
const { Search } = Input;

const HomeContentButton = (props) => {
	const selectedRowKeys = props.selectedRowKeys;

	useEffect(() => {
		deleteMusicItem(selectedRowKeys);
	}, [selectedRowKeys]);

	const handleDelete = (e) => {
		console.log('selectedRowKeys changed: ' + selectedRowKeys);
		deleteMusicItem();
	};
	return (
		<div>
			<Button type="default" size="large" style={{ marginRight: '1rem' }}>
				<DownloadOutlined />
				Download
			</Button>
			<Button
				type="default"
				size="large"
				style={{ marginRight: '1rem' }}
				onClick={handleDelete}
			>
				<CloseCircleFilled />
				Delete
			</Button>
			<Button type="default" size="large" style={{ marginRight: '1rem' }}>
				<CloseCircleFilled />
				Copy
			</Button>
			<Button type="default" size="large" style={{ marginRight: '1rem' }}>
				<SwapOutlined />
				Move
			</Button>
		</div>
	);
};
export default HomeContentButton;
