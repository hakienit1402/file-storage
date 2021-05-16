import Button from '@material-ui/core/Button';
import { Input, message, Modal, Upload } from 'antd';
import { useRef } from 'react';
import PlusIcon from "../../images/plus.png";
import UploadIcon from "../../images/upload.png";


const SliderFormUpload = () => {
	// const [visible, setVisible] = useState(false);
	// const dispatch = useDispatch();
	const isLoad = useRef([]);

	const showModal = () => {
		// setVisible(true);
	};

	const handleOk = () => {
		// setVisible(false);
	};

	const handleCancel = () => {
		// setVisible(false);
	};


	// const [fileList, setFileList] = useState([]);
	// let isLoad = true;
	const onChange = (file) => {
		if (!isLoad.current) {
			isLoad.current = true;
			const reader = new FileReader();
			reader.readAsDataURL(file.file.originFileObj);
			reader.onload = () => {
				console.log(reader.result);
			}
		}
		// if (file.file.type.indexOf('image') === 0) {
		// 	console.log('this is the image file');
		// 	// dispatch(uploadImageFile(file));
		// }
	};
	const props = {
		name: 'file',
		action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
		headers: {
			authorization: 'authorization-text',
		},
		onChange(info) {
			if (!isLoad.current.includes(info.file.name)) {
				if (info.file.status === 'uploading') {
					console.log('dang up load', info.file.name);
					isLoad.current = [...isLoad.current, info.file.name];
				}
			}
			if (info.file.status === 'done') {
				message.success(`${info.file.name} file uploaded successfully`);
			} else if (info.file.status === 'error') {
				message.error(`${info.file.name} file upload failed.`);
			}
			// }
		},
		// progress: {
		// 	strokeColor: {
		// 		from: '#108ee9',
		// 		to: '#87d068',
		// 	},
		// 	strokeWidth: 3,
		// 	format: percent => `${parseFloat(percent.toFixed(2))}%`,
		// },
	};
	return (
		<div>
			<div style={{ margin: '3rem 0 1rem 15px' }}>
				<Upload {...props}
					// fileList={fileList}
					multiple
					// accept="image/png, image/jpeg"
					// onChange={(file) => onChange(file)}
					showUploadList={false}
				>
					<Button
						onClick={() => { isLoad.current = [] }}
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
			</div>
		</div>
	);
};
export default SliderFormUpload;
