import react from 'react';
import { Breadcrumb, Alert, Popconfirm } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';

const NavigationTab = (props) => {
	return (
		<>
			<Breadcrumb>
				<Breadcrumb.Item href="">
					<HomeOutlined />
				</Breadcrumb.Item>
				<Breadcrumb.Item href="">
					<UserOutlined />
					<span>Application List</span>
				</Breadcrumb.Item>
				<Breadcrumb.Item>Application</Breadcrumb.Item>
			</Breadcrumb>
			<hr></hr>
		</>
	);
};
export default NavigationTab;
