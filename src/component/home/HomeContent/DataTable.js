import { EditFilled } from '@ant-design/icons';
import { Form, Input, message, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMusicStore } from "../../../actions/musicAction";
import { getListDatas } from "../../../actions/rootAction";
import FolderIcon from "../../../images/folder.png";
import Mp3Icon from "../../../images/music-main.png";

const renderIcon = (extension) => {
  switch (extension) {
    case "FOLDER":
      return <img className="img-type" alt="#" src={FolderIcon} />;
    case "mp3":
      return <img className="img-type" alt="#" src={Mp3Icon} />;
    default:
      break;
  }
};
const renderSize = (size) => (size != 0 ? (size / (1024 * 1024)).toFixed(2) + " MB" : "/");
const DataTable = ({ sendListRowKeys, sendListRecords, setListBreadcrumb }) => {
  const [selectedRowKeys, setSelectedRowked] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  // console.log(key, 'keyy');

  const listDatas = useSelector((state) => state.file);
  var { loading, error, datas } = listDatas;

  const currentType = useSelector((state) => state.fileType);
  var { type } = currentType;
  // console.log(type, 'ehehhe');


  const dataUsers = useSelector((state) => state.auth);
  var { loading, error, users } = dataUsers;

  // parent
  const [parent, setParent] = useState('');
  const [listParents, setListParents] = useState([]);

  const isEditing = (record) => record.id === editingKey;
  const [form] = Form.useForm();
  const dispatch = useDispatch();


  useEffect(() => {

    dispatch(getListDatas(type, users, parent));

  }, [parent, type]);

  useEffect(() => {
    setParent('');
    setListBreadcrumb([]);
    setListParents([]);

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
          dispatch(updateMusicStore(datas, row.name, index));
          setEditingKey("");
        } else {
          setEditingKey("");
        }
      }

    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "Loại",
      dataIndex: "type",
      render: (_, record) => renderIcon(record.extension),
    },
    {
      title: "Tên",
      dataIndex: "name",
      editable: true,
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
        const editable = isEditing(record);
        return editable ? (
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
          return record.extension === "FOLDER" ? {
            onClick: () => {
              setParent(record.name);
              setListParents([...listParents, record.name]);
              setListBreadcrumb([...listParents, record.name]);
            }
          } : { onDoubleClick: () => { alert('Dang chay', record.name) } };
        }}
      />
    </div>
  );
};
export default DataTable;
