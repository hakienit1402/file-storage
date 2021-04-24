import React,{useState,useEffect} from "react";
import { Table } from "antd";
import { Breadcrumb, Alert, Popconfirm,Input, Form, Typography } from "antd";
import FolderIcon from '../../../images/folder.png'
import Mp3Icon from '../../../images/music-main.png'

import HomeContentButton from "./HomeContentButton";
import NavigationTab from "./NavigationTab";
import {useSelector} from 'react-redux'

const renderIcon =(record)=>{
  switch (record.extension) {
    case null:
      return (
        <img alt="#" src={FolderIcon} style={{width:30,height:30}}/>
      )
      case 'mp3':
      return (
        <img alt="#" src={Mp3Icon} style={{width:30,height:30}}/>
      )
    default:
      break;
  }
}
const renderSize =(record)=>(
 record.size!=0?record.size:"/"
)
const HomeContent = () => {
  const [selectedRowKeys, setSelectedRowked] = useState([]);
  const listMusics = useSelector(state => state.musics)
  const {loading,error,musics}= listMusics
  const [data,setData] = useState([])
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.id === editingKey;
  const [form] = Form.useForm();

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    // const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form initialValues={{name:record.name}} form={form}>
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            <Input />
          </Form.Item>
          </Form>
        ) : (
          children
        )}
      </td>
    );
  };
  
  const edit = (record) => {
    form.setFieldsValue({
      name:record.name,
      ...record,
    });
    setEditingKey(record.id);
    console.log(record)
  };
  const cancel = () => {
    setEditingKey('');
  };
  const save = async (key) => {
   console.log(key)
  //  try {
  //   const row = await form.validateFields();
  //   const newData = [...musics];
  //   const index = newData.findIndex((item) => key === item.id);

  //   if (index > -1) {
  //     const item = newData[index];
  //     newData.splice(index, 1, { ...item, ...row });
  //     setData(newData);
  //     setEditingKey('');
  //   } else {
  //     newData.push(row);
  //     setData(newData);
  //     setEditingKey('');
  //   }
  // } catch (errInfo) {
  //   console.log('Validate Failed:', errInfo);
  // }
  };

  const columns = [
    {
      title: "Type",
      dataIndex: "type",
    
      render:(text,record) =>
  
      renderIcon(record)
    },
    {
      title: "Name",
      dataIndex: "name",
      editable: true,
      
    },
    {
      title: "Kích thước",
      dataIndex: "size",
      render:(text,record) =>
  
      renderSize(record)
    },
    {
      title: "Sửa đổi lần cuối",
      dataIndex: "modifyDate",
    },
    {
      title: "",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
             
              onClick={() => save(record.id)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  const onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    // this.setState({ selectedRowKeys });
    setSelectedRowked(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    hideDefaultSelections: true,
    selections: [
      {
        key: "all-data",
        text: "Select All Data",
        onSelect: () => {
          // this.setState({
          // 	selectedRowKeys: [...Array(46).keys()], // 0...45
          // });
          setSelectedRowked([...Array(46).keys()]);
        },
      },
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          // this.setState({ selectedRowKeys: newSelectedRowKeys });
          setSelectedRowked(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowked(newSelectedRowKeys);
        },
      },
    ],
  };
  
  
  return (
    <>
      <div style={{ margin: "3rem 2rem 0 0" }}>
        <NavigationTab />
      </div>
      <div>
        <HomeContentButton />
      </div>
      <div>
        <Table
          rowSelection={rowSelection}
          components={{
            body: {
              cell: EditableCell
            },
          }}
         
          // columns={columns}
          columns={mergedColumns}
          rowClassName="editable-row"
          dataSource={musics}
          // dataSource={data}
          rowKey = 'id'
        />
      </div>
    </>
  );
}
// }
export default HomeContent;
