import React from 'react';
import { Table } from 'antd';
import { Breadcrumb, Alert, Popconfirm } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import HomeContentButton from './HomeContent/HomeContentButton';
const columns = [
	{
		title: 'Type',
		dataIndex: 'type',
	},
	{
		title: 'Name',
		dataIndex: 'name',
	},
	{
		title: 'Kích thước',
		dataIndex: 'size',
	},
	{
		title: 'Sửa đổi lần cuối',
		dataIndex: 'modifyTime',
	},
	{
		title: '',
		dataIndex: 'operation',
		render: (text, record) => (
			<Popconfirm
				title="Sure to delete?"
				onConfirm={() => console.log(record.key)}
				// this.handleDelete(record.key)
			>
				<a>Delete</a>
			</Popconfirm>
		),
	},
];

const data = [];
for (let i = 0; i < 20; i++) {
	data.push({
		key: i,
		type: `Edward King ${i}`,
		name: 32,
		size: `London, Park Lane no. ${i}`,
		modifyTime: 10,
	});
}

class HomeContent extends React.Component {
	state = {
		selectedRowKeys: [], // Check here to configure the default column
	};

	onSelectChange = (selectedRowKeys) => {
		console.log('selectedRowKeys changed: ', selectedRowKeys);
		this.setState({ selectedRowKeys });
	};

	render() {
		const { selectedRowKeys } = this.state;
		const rowSelection = {
			selectedRowKeys,
			onChange: this.onSelectChange,
			hideDefaultSelections: true,
			selections: [
				{
					key: 'all-data',
					text: 'Select All Data',
					onSelect: () => {
						this.setState({
							selectedRowKeys: [...Array(46).keys()], // 0...45
						});
					},
				},
				{
					key: 'odd',
					text: 'Select Odd Row',
					onSelect: (changableRowKeys) => {
						let newSelectedRowKeys = [];
						newSelectedRowKeys = changableRowKeys.filter(
							(key, index) => {
								if (index % 2 !== 0) {
									return false;
								}
								return true;
							}
						);
						this.setState({ selectedRowKeys: newSelectedRowKeys });
					},
				},
				{
					key: 'even',
					text: 'Select Even Row',
					onSelect: (changableRowKeys) => {
						let newSelectedRowKeys = [];
						newSelectedRowKeys = changableRowKeys.filter(
							(key, index) => {
								if (index % 2 !== 0) {
									return true;
								}
								return false;
							}
						);
						this.setState({ selectedRowKeys: newSelectedRowKeys });
					},
				},
			],
		};
		return (
			<>
				<div style={{ margin: '3rem 2rem 0 0' }}>
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
				</div>
				<div>
					<HomeContentButton />
				</div>
				<div>
					<Table
						rowSelection={rowSelection}
						columns={columns}
						dataSource={data}
					/>
				</div>
			</>
		);
	}
}
export default HomeContent;
