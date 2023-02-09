import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Space } from "antd";
import { request } from "../../data/url";
import "./Staff.css";
import Edit from "../../components/Edit";
import DeleteAlert from "../../components/Delete";
import Add from "../../components/Add";

export default function StaffPage() {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <button
            onClick={() => {
              setData(record);
              setShowEdit(true);
            }}
          >
            EDIT
          </button>
          <button
            onClick={() => {
              setData(record);
              setShowDelete(true);
            }}
          >
            DELETE
          </button>
        </Space>
      ),
    },
  ];

  const [staff, setStaff] = useState([]);
  const [data, setData] = useState();
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    axios.get(`${request.STAFF}`).then((response) => {
      setStaff(response.data.staff);
    });
  }, [showEdit, showDelete, showAdd]);
  const handleAdd = () => {
    setShowAdd(true);
  };

  return (
    <div className="staff">
      {!showAdd && !showDelete && !showEdit ? (
        <div className="staff_table">
          <div className="addStaff">
            <button onClick={handleAdd}>ADD STAFF</button>
          </div>
          <Table columns={columns} dataSource={staff} />
        </div>
      ) : (
        <></>
      )}
      {showEdit ? (
        <Edit
          className="update_staff"
          data={data}
          handleClose={() => {
            setShowEdit(false);
          }}
        />
      ) : (
        <></>
      )}
      {showDelete ? (
        <DeleteAlert
          className="update_staff"
          data={data}
          handleClose={() => {
            setShowDelete(false);
          }}
        />
      ) : (
        <></>
      )}
      {showAdd ? (
        <Add
          className="update_staff"
          handleClose={() => {
            setShowAdd(false);
          }}
        ></Add>
      ) : (
        <></>
      )}
    </div>
  );
}
