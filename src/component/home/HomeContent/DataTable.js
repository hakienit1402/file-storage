import { EditFilled } from '@ant-design/icons';
import { Form, Input, message, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editFileName, getListDatas, updateParent } from "../../../actions/rootAction";
import FolderIcon from "../../../images/folder.png";
import JpgIcon from "../../../images/jpg.svg";
import Mp3Icon from "../../../images/mp3.png";
import Mp4Icon from "../../../images/mp4.png";
import PngIcon from "../../../images/png.svg";

const renderIcon = (extension) => {
  switch (extension) {
    case "jpg":
      return <img className="img-type" alt="#" src={JpgIcon} />;
    case "png":
      return <img className="img-type" alt="#" src={PngIcon} />;
    case "FOLDER":
      return <img className="img-type" alt="#" src={FolderIcon} />;
    case "mp3":
      return <img className="img-type" alt="#" src={Mp3Icon} />;
    case "mp4":
      return <img className="img-type" alt="#" src={Mp4Icon} />;
    default:
      break;
  }
};
const renderSize = (size) => (size != 0 ? (size / (1024 * 1024)).toFixed(2) + " MB" : "/");
const pictureFilter = [
  {
    text: 'Thư mục',
    value: 'FOLDER',
  },

  {
    text: 'PNG',
    value: 'png',
  },
  {
    text: 'JPG',
    value: 'jpg',
  },
]
const musicFilter = [
  {
    text: 'Thư mục',
    value: 'FOLDER',
  },

  {
    text: 'MP3',
    value: 'mp3',
  },
]
const videoFilter = [
  {
    text: 'Thư mục',
    value: 'FOLDER',
  },

  {
    text: 'MP4',
    value: 'mp4',
  },
]
const DataTable = ({ sendListRowKeys, sendListRecords, updateListBreadcrumb }) => {
  const [selectedRowKeys, setSelectedRowked] = useState([]);
  const [editingKey, setEditingKey] = useState("");



  const listDatas = useSelector((state) => state.file);
  var { loading, error, datas } = listDatas;

  const currentType = useSelector((state) => state.fileType);
  var { type } = currentType;

  const currenParent = useSelector((state) => state.parent);
  var { parent } = currenParent;


  const dataUsers = useSelector((state) => state.auth);
  var { loading, error, users } = dataUsers;


  const isEditing = (record) => record.id === editingKey;
  const [form] = Form.useForm();
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getListDatas(type, users, parent));
    // console.log('datatable paree type- -', parent,'--', type);
  }, [parent]);

  useEffect(() => {
    // console.log('datatable type - ', type);
    dispatch(getListDatas(type, users, ''));
    dispatch(updateParent(''));
    updateListBreadcrumb();
    setEditingKey("");
    setSelectedRowked([]);
    clearAll();
  }, [type]);
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
                  message: `Vui lòng nhập dữ liệu!`,
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
      const index = datas.findIndex((item) => record.id === item.id);
      const indexName = datas.findIndex((item) => row.name === item.name && datas[index].extension === item.extension);
      if (indexName !== -1) {
        message.error(
          (row.extension !== null ? "File " : "Thư mục ") + `"${row.name}"` + " đã tồn tại!"
        );
      } else {
        if (index !== -1) {
          dispatch(editFileName(datas, row.name, index, type, users.token));
        }
        setEditingKey("");
      }

    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const clearAll = () => {
    setFilteredInfo(null);
    setSortedInfo(null);
  };
  const columns = [
    {
      title: "Loại",
      dataIndex: "type",
      render: (_, record) => renderIcon(record.extension),
      filteredValue: filteredInfo && (filteredInfo.type || null),
      filters: type === 'pictures' ? pictureFilter : type === 'musics' ? musicFilter : videoFilter,
      filterMultiple: false,
      onFilter: (value, record) => record.extension.indexOf(value) === 0,
      ellipsis: true,
    },
    {
      title: "Tên",
      dataIndex: "name",
      editable: true,
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo && (sortedInfo.field === 'name' && sortedInfo.order),
      ellipsis: true,
    },
    {
      title: "Kích thước",
      dataIndex: "size",
      render: (_, record) => renderSize(record.size),
    },
    {
      title: "Sửa đổi lần cuối",
      dataIndex: "modifyDate",
    },
    {
      title: "Thao tác",
      dataIndex: "operation",
      render: (_, record) => {
        return isEditing(record) ? (
          <span>
            <a
              onClick={() => save(record)}
              style={{
                marginRight: 8,
              }}
            >
              Lưu
            </a>
            <a onClick={cancel}>Hủy</a>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            <EditFilled
              style={{
                fontSize: 18, paddingLeft: 20
              }
              } />
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
    sendListRecords(record);
    sendListRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    hideDefaultSelections: true,
  };
  return (
    <div>
      <Table
        onChange={handleChange}
        rowSelection={rowSelection}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        columns={mergedColumns}
        rowClassName="editable-row"
        dataSource={datas}
        rowKey="id"
        onRow={(record, _) => {
          return {
            onDoubleClick: () => {
              if (record.extension === 'FOLDER') {
                dispatch(updateParent(record.name));
                updateListBreadcrumb(record.name)
              } else {
                alert('PLAYYYY');
              }
            }
          }
        }}
      />
    </div>
  );
};
export default DataTable;
