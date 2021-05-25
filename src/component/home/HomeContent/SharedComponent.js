import { DeleteOutlined } from '@ant-design/icons';
import { List } from 'antd';
import React from 'react';

function SharedComponent() {
    const data = [
        {
            title: 'Ant Design Title 1',
        },
        {
            title: 'Ant Design Title 2',
        },
        {
            title: 'Ant Design Title 3',
        },
        {
            title: 'Ant Design Title 4',
        },
    ];
    return (
        <List className="list-shared"
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<DeleteOutlined  className='delete-shared'/>}
                        title={<span className='title-shared'>{item.title}</span>}
                    />
                </List.Item>
            )}
        />
    );
}

export default SharedComponent;