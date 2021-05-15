import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';

const NavigationTab = ({ listBreadcrumb, setListBreadcrumb }) => {
	// console.log(listBreadcrumb)
	return (
		<>
			<Breadcrumb>
				<Breadcrumb.Item href="">
					<HomeOutlined />
				</Breadcrumb.Item>
				{listBreadcrumb.map((item, idx) => (
					<Breadcrumb.Item key={idx} onClick={()=>{setListBreadcrumb(idx);}}>
						<a>{item}</a>
					</Breadcrumb.Item>
				))}
			</Breadcrumb>
			<hr></hr>
		</>
	);
};
export default NavigationTab;
