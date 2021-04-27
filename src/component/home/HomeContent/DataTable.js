import { Form, Input, Popconfirm, Table, Typography, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListMusics, updateMusicStore } from "../../../actions/musicAction";
import FolderIcon from "../../../images/folder.png";
import Mp3Icon from "../../../images/music-main.png";

const renderIcon = (record) => {
  switch (record.extension) {
    case null:
      return <img alt="#" src={FolderIcon} style={{ width: 30, height: 30 }} />;
    case "mp3":
      return <img alt="#" src={Mp3Icon} style={{ width: 30, height: 30 }} />;
    default:
      break;
  }
};
const renderSize = (record) => (record.size != 0 ? record.size : "/");
const DataTable = ({ active, sendListRowKeys, sendListRecords }) => {
  // console.log(active);
  const [selectedRowKeys, setSelectedRowked] = useState([]);
  const [editingKey, setEditingKey] = useState("");

  const listMusics = useSelector((state) => state.musics);
  var { loading, error, musics } = listMusics;
  const isEditing = (record) => record.id === editingKey;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  //getdata
  useEffect(() => {
    dispatch(getListMusics());
  }, []);
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
    return (
      <td {...restProps}>
        {editing ? (
          <Form initialValues={{ name: record.name }} form={form}>
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
              <Input
              //  onChange={handleChange}
              />
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
      ...record,
      name: record.name,
    });
    setEditingKey(record.id);
  };
  const cancel = () => {
    setEditingKey("");
  };
  const save = async (record) => {
    try {
      const row = await form.validateFields();
      // console.log(row.name);
      const index = musics.findIndex((item) => record.id === item.id);
      const indexName = musics.findIndex((item) => row.name === item.name);
      if (indexName !== -1) {
        message.error(
          (row.extension !== null ? "File " : "Thư mục ") +`"${row.name}"` + " tồn tại rồi nè!"
        );
      }
      // console.log(index);
      else if (index !== -1) {
        dispatch(updateMusicStore(musics, row.name, index));
        setEditingKey("");
      } else {
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "Type",
      dataIndex: "type",
      render: (text, record) => renderIcon(record),
    },
    {
      title: "Name",
      dataIndex: "name",
      editable: true,
    },
    {
      title: "Kích thước",
      dataIndex: "size",
      render: (text, record) => renderSize(record),
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
              onClick={() => save(record)}
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
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
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
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const onSelectChange = (selectedRowKeys, record) => {
    setSelectedRowked(selectedRowKeys);
    // console.log(record)
    sendListRecords(record);
    sendListRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    hideDefaultSelections: true,
    // selections: [
    //   {
    //     key: "all-data",
    //     text: "Select All Data",
    //     onSelect: () => {
    //       setSelectedRowked([...Array(46).keys()]);
    //     },
    //   },
    //   {
    //     key: "odd",
    //     text: "Select Odd Row",
    //     onSelect: (changableRowKeys) => {
    //       let newSelectedRowKeys = [];
    //       newSelectedRowKeys = changableRowKeys.filter((key, index) => {
    //         if (index % 2 !== 0) {
    //           return false;
    //         }
    //         return true;
    //       });
    //       setSelectedRowked(newSelectedRowKeys);
    //     },
    //   },
    //   {
    //     key: "even",
    //     text: "Select Even Row",
    //     onSelect: (changableRowKeys) => {
    //       let newSelectedRowKeys = [];
    //       newSelectedRowKeys = changableRowKeys.filter((key, index) => {
    //         if (index % 2 !== 0) {
    //           return true;
    //         }
    //         return false;
    //       });
    //       setSelectedRowked(newSelectedRowKeys);
    //     },
    //   },
    // ],
  };
  return (
    <div>
      <Table
        rowSelection={rowSelection}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        columns={mergedColumns}
        rowClassName="editable-row"
        dataSource={musics}
        rowKey="id"
      />
    </div>
  );
};
export default DataTable;
