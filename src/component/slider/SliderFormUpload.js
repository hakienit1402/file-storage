import Button from '@material-ui/core/Button';
import AddSharpIcon from '@material-ui/icons/AddSharp';
import { Input, Modal, Popover, Upload } from 'antd';
import { useState } from 'react';

const SliderFormUpload = (props) => {
	const [visible, setVisible] = useState(props.visible);

	const content = (
		<>
			<div>
				<Upload {...props}>
					<Button>Upload file</Button>
				</Upload>
			</div>
			<div>
				<Upload {...props} directory={true}>
					<Button>Upload directory</Button>
				</Upload>
			</div>
		</>
	);
	const showModal = () => {
		setVisible(true);
	};

	const handleOk = (e) => {
		console.log(e);
		setVisible(false);
	};

	const handleCancel = (e) => {
		console.log(e);
		setVisible(false);
	};

	return (
		<div>
			<div style={{ margin: '3rem 0 1rem 15px' }}>
				<Popover
					content={content}
					placement="bottomLeft"
					trigger="click"
				>
					<Button
						variant="contained"
						startIcon={
							<AddSharpIcon style={{ fontSize: '36px' }} />
						}
					>
						Upload
					</Button>
				</Popover>
			</div>
			<div style={{ margin: '2rem 0 1rem 15px' }}>
				<Button
					variant="contained"
					startIcon={<AddSharpIcon style={{ fontSize: '36px' }} />}
					onClick={() => showModal()}
				>
					New Folder
				</Button>
				<Modal
					title="Thư mục mới"
					visible={visible}
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
