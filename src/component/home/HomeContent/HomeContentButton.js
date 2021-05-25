import {
	CloseCircleFilled, DownloadOutlined,
	InfoCircleOutlined,
	SwapOutlined,
	UserAddOutlined
} from '@ant-design/icons';
import { HistoryOutlined } from '@material-ui/icons';
import { Button, message, Modal, notification } from 'antd';
import axios from 'axios';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListDatas, moveToTrash, restoreItem } from '../../../actions/rootAction';
import TreeSelectCustom from './TreeSelectCustom';
// const { Header, Sider } = Layout;
// const { Search } = Input;

const HomeContentButton = ({ listRowKeys, setGiveListKey }) => {

	const dispatch = useDispatch();
	const listDatas = useSelector((state) => state.file);
	var { datas } = listDatas;
	const currentType = useSelector((state) => state.fileType);
	var { type } = currentType;

	const currenParent = useSelector((state) => state.parent);
	var { parent } = currenParent;


	const dataUsers = useSelector((state) => state.auth);
	var { users } = dataUsers;


	const handleDelete = () => {
		dispatch(moveToTrash(listRowKeys, datas, users.username, users.token, type));
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

	const onOk = async () => {
		const folderDestination = ref.current;
		// localhost:8080/api/user/videos/copy
		const creator = users.username;
		let datass = [];
		listRowKeys.forEach(key => {
			let ele = datas.find(v => v.id === key);
			datass.push(ele);
		});
		datass = datass.map(v => {
			return {
				id: v.id,
				name: v.name,
				extension: v.extension
			}
		});

		// console.log(datass);
		// datass = datas.filter(v=>)
		var config = {
			method: 'put',
			url: `http://localhost:8080/api/user/${type}/copy`,
			headers: {
				'Authorization': `Bearer ${users.token}`,
				'Content-Type': 'application/json'
			},
			data: {
				new_parent: folderDestination,
				creator: creator,
				datas: datass,
				type_copy_move: 0
			}
		};
		// console.log(folderDestination);
		try {
			const { data } = await axios(config);
			if (data.msg) {
				// show popup
				// console.log(config, 'before');
				// console.log({ ...config, data: data.data, type_copy_move: 1 }, 'after');
				Modal.warning({
					title: data.msg,
					content:
						<>
							<p>Chọn <b>Thao tác</b> hoặc <b>Bỏ qua</b></p>
							<Button
								onClick={() => handleClickMore({ ...config, data: { ...data.data, type_copy_move: 1 } })}
								style={{ marginBottom: 2 }} type="dashed" block>Thay thế file ở thư mục đích
							 </Button>
							<Button
								onClick={() => handleClickMore({ ...config, data: { ...data.data, type_copy_move: 2 } })} //2
								type="dashed" block>Sao chép với tên "Copy (n)"
							 </Button>
						</>,
					okText: "Bỏ qua",
					onOk() { },
				})
			} else {
				setGiveListKey([]);
				notification['success']({
					message: 'Thông báo',
					description: 'Sao chép file thành công',
					duration: 2
				});
				dispatch(getListDatas(type, users, parent));
				ref.current = '';
			}

		} catch (err) {
			console.log(err, 'err ne');
		}
	}
	const handleClickMore = async (config) => {
		try {
			await axios(config);
			Modal.destroyAll();
			notification['success']({
				message: 'Thông báo',
				description: 'Sao chép file thành công',
				duration: 2
			});
			setGiveListKey([]);
			dispatch(getListDatas(type, users, parent));
			ref.current = '';
		} catch (err) {
			console.log(err);
		}
	}
	const onCalcel = () => {
		ref.current = '';
	}
	const ref = useRef('');
	const okok = (adu) => {
		ref.current = adu;
	}
	const handleDeleteVV = () => {

	}
	const handleRestore = () => {
		dispatch(restoreItem(listRowKeys, datas, users.username, users.token))
		// listRowKeys
	}
	return type !== 'trash' ?
		(<div style={{ marginBottom: 10 }}>
			<Button disabled={listRowKeys.length === 0}
				onClick={onDownload}
				type="default" size="large" style={{ marginRight: '1rem' }}>
				<DownloadOutlined />
				Tải xuống
			</Button>
			<Button disabled={listRowKeys.length === 0}
				type="default"
				size="large"
				style={{ marginRight: '1rem' }}
				onClick={handleDelete}
			>
				<CloseCircleFilled />
				Xóa
			</Button>
			<Button disabled={listRowKeys.length === 0}
				onClick={() => {
					listRowKeys.length === 0 ?
						message.warning('Vui lòng chọn ít nhất 1 file') :
						Modal.confirm({
							title: "Chọn thư mục",
							content: <TreeSelectCustom
								setFolderSelect={okok}
								user={users}
								type={type}
								curParent={''}
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
				Sao chép
			</Button>
			<Button disabled={listRowKeys.length === 0}
				type="default" size="large" style={{ marginRight: '1rem' }}>
				<SwapOutlined />
				Di chuyển
			</Button>
			<Button disabled={listRowKeys.length === 0}
				icon={<UserAddOutlined />}
				type="default" size="large" style={{ marginRight: '1rem' }}>
				Chia sẻ
			</Button>
		</div>)
		:
		(<div style={{ marginBottom: 10 }}>
			<Button icon={<HistoryOutlined style={{ fontSize: 20, margin: '-3px 1px' }} />}
				disabled={listRowKeys.length === 0}
				onClick={() => { handleRestore() }}
				type="default" size="large" style={{ marginRight: '1rem' }}>
				Khôi phục
			</Button>
			<Button disabled={listRowKeys.length === 0}
				type="default"
				size="large"
				style={{ marginRight: '1rem' }}
				onClick={() => { handleDeleteVV() }}
			>
				<CloseCircleFilled />
				Xóa vĩnh viễn
			</Button>
		</div>);
};
export default HomeContentButton;
