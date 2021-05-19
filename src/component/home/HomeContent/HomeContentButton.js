import {
	CloseCircleFilled, DownloadOutlined,
	InfoCircleOutlined,
	SwapOutlined
} from '@ant-design/icons';
import { Button, Input, Layout, message, Modal } from 'antd';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TreeSelectCustom from './TreeSelectCustom';
const { Header, Sider } = Layout;
const { Search } = Input;

const HomeContentButton = ({ listRowKeys }) => {
	const currentType = useSelector((state) => state.fileType);
	var { type } = currentType;

	const currenParent = useSelector((state) => state.parent);
	var { parent } = currenParent;


	const dataUsers = useSelector((state) => state.auth);
	var { users } = dataUsers;


	// const selectedRowKeys = props.selectedRowKeys;
	const dispatch = useDispatch()
	// useEffect(() => {
	// 	deleteMusicItem(selectedRowKeys);
	// }, [selectedRowKeys]);

	const handleDelete = () => {
		console.log(listRowKeys, 'home content button');
		// console.log('selectedRowKeys changed: ' + selectedRowKeys);
		// deleteMusicItem();
		// dispatch(deleteMusicItem(listRowKeys))
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

	const onOk = () => {
		console.log(ref.current, 'folder select');
	}
	const onCalcel = () => {
		console.log('cancle');

	}
	const ref = useRef('');
	const okok = (adu) => {
		console.log('aduadu', adu);
		// setFolderSelect(adu);
		ref.current = adu;
	}
	const [folderSelect, setFolderSelect] = useState('');
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
			<Button onClick={() => {
				listRowKeys.length === 0 ?
					message.warning('Vui lòng chọn ít nhất 1 file') :
					Modal.confirm({
						title: "Chọn thư mục",
						content: <TreeSelectCustom
							setFolderSelect={okok}
							user={users}
							type={type}
							curParent={parent}
						/>,
						okText: "Sao chép",
						cancelText: "Hủy",
						icon: <InfoCircleOutlined style={{ color: '#0e9c82' }} />,
						onOk() { onOk() },
						// onCalcel() { console.log("ca"); }
					});
			}}
				type="default" size="large" style={{ marginRight: '1rem' }}>
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
