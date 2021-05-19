import Button from '@material-ui/core/Button';
import { Input, Modal, notification, Progress, Spin, Upload } from 'antd';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListDatas } from '../../actions/rootAction';
import PlusIcon from "../../images/plus.png";
import UploadIcon from "../../images/upload.png";

const pictureAccept = ".png, .jpeg, .jpg, .svg";
const videoAccept = ".mp4";
const audioAccept = ".mp3";
const SliderFormUpload = () => {
	// const [visible, setVisible] = useState(false);
	// const dispatch = useDispatch();
	const data = useSelector((state) => state.auth);
	const { users } = data;

	const currentType = useSelector((state) => state.fileType);
	const { type } = currentType;

	const currenParent = useSelector((state) => state.parent);
	const { parent } = currenParent;

	const showModal = () => {
		// setVisible(true);
	};

	const handleOk = () => {
		// setVisible(false);
	};

	const handleCancel = () => {
		// setVisible(false);
	};



	const openNotification = (title, curPercentNow, key) => {
		// notification.close(key)
		notification.open({
			message: title,
			description: <Progress
				strokeColor={{
					from: '#108ee9',
					to: '#87d068',
				}}
				percent={curPercentNow}
				status="active"
				size='small'
			/>,
			icon: <Spin />,
			key,
			placement: "bottomRight",
			duration:1
		});
	};
	const dispatch = useDispatch();
	const timeOut = useRef(null);
	const props = {
		name: 'file',
		action: `http://localhost:8080/api/user/${type}/upload/${users.username}/${parent}`,
		headers: {
			'Authorization': `Bearer ${users.token}`
		},
		onChange(info) {
			if (info.file.status === 'done') {
				console.log("ok");
			}
		},
		onStart: ({ uid, name }) => {
			// console.log(name);
			openNotification(name, 0, uid);
		},
		onSuccess: (_, { uid }) => {
			if (timeOut.current)
				clearTimeout(timeOut.current);
			timeOut.current = setTimeout(() => {
				dispatch(getListDatas(type, users, parent));
			}, 1000)
		},
		onProgress: ({ percent }, { uid, name }) => {
			openNotification(name, parseFloat(percent.toFixed(2)), uid);
		}

	};
	return (
		<div>
			<div style={{ margin: '3rem 0 1rem 15px' }}>
				<Upload {...props}
					multiple
					accept={type === 'pictures' ? pictureAccept : type === 'videos' ? videoAccept : audioAccept}
					showUploadList={false}
				>
					<Button
						className='btn-up-new'
						variant="contained"
						startIcon={
							<img src={UploadIcon} width='30' height='30' />
						}
					>
						Tải lên
					</Button>
				</Upload>
			</div>
			<div style={{ margin: '2rem 0 1rem 15px' }}>
				<Button
					className='btn-up-new'
					variant="contained"

					startIcon={
						<img src={PlusIcon} width='30' height='30' />
					}
					onClick={() => showModal()}
				>
					Thư mục mới
				</Button>
				<Modal
					title="Thư mục mới"
					// visible={visible}
					onOk={() => handleOk()}
					onCancel={() => handleCancel()}
				>
					<Input placeholder="Tiêu đề thư mục" />
				</Modal>

				{/* <Modal
				width={300}
					visible={true}
					title="Thư mục hiện tại có 2 tập tin trùng tên"
					onCancel={() => { }}
					footer={[
						<Button onClick={() => { } }>
							Return
            			</Button>
					]}
				>
					<div>
						<Button
							onClick={() => { } }
						>
							Submit
            			</Button>
					</div>
					<div>
						<Button
							onClick={() => { } }
						>
							Search on Google
            			</Button>
					</div>
				</Modal> */}
			</div>
		</div>
	);
};
export default SliderFormUpload;
