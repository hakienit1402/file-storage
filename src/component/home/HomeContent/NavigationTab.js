import react from 'react';
import { Breadcrumb, Alert, Popconfirm } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';

const NavigationTab = ({listBreadcrumb}) => {
	// console.log(listBreadcrumb[0])
	return (
		<>
			<Breadcrumb>
			<Breadcrumb.Item href="">
				<HomeOutlined />
			</Breadcrumb.Item>
			{listBreadcrumb.map((item,idx)=>(
				<Breadcrumb.Item key={idx}>
				<span>{item}</span>
			</Breadcrumb.Item>
			))}
			</Breadcrumb>
			<hr></hr>
		</>
	);
};
export default NavigationTab;
