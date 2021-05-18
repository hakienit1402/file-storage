import React, { useState, useRef, useEffect } from 'react';
import { Layout, Menu, Breadcrumb, Input, Avatar, Button } from 'antd';
import { deleteMusicItem } from '../../../actions/rootAction';
import {
	DownloadOutlined,
	CloseCircleFilled,
	SwapOutlined,
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
const { Header, Sider } = Layout;
const { Search } = Input;

const HomeContentButton = ({listRowKeys}) => {
	
	
	// const selectedRowKeys = props.selectedRowKeys;
 	const dispatch = useDispatch()
	// useEffect(() => {
	// 	deleteMusicItem(selectedRowKeys);
	// }, [selectedRowKeys]);

	const handleDelete = () => {
		console.log(listRowKeys,'home content button');
		// console.log('selectedRowKeys changed: ' + selectedRowKeys);
		// deleteMusicItem();
		dispatch(deleteMusicItem(listRowKeys))
	};
	
const onDownload = () => {
		console.log('selectedRowKeys changed: ' + listRowKeys);
		// dispatch(downloadMusicItem(selectedRowKeys));
		// fetch('http://localhost:8080/employees/download').then((response) => {
		// 	console.log(response + ' 1213');
		// 	response.blob().then((blob) => {
		// 		let url = window.URL.createObjectURL(blob);
		// 		let a = document.createElement('a');
		// 		a.href = url;
		// 		a.download = 'employees.json';
		// 		a.click();
		// 	});
		// 	window.location.href = response.url;
		// });
	};
	return (
		<div>
			<Button onClick={onDownload}
			type="default" size="large" style={{ marginRight: '1rem' }}>
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
