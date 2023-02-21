import { Form, Input, Button, Alert, Space } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { request } from "../../data/url";

export default function AddSchedule({ handleClick }) {
  const [schedule, setSchedule] = useState([]);
  const [staff, setStaff] = useState([]);
  const [error, setError] = useState("");
  const items = [
    {
      name: "idSchedule",
    },
    {
      name: "idStaff",
    },
  ];
  const [form] = Form.useForm();
  useEffect(() => {
    axios.get(`${request.STAFF}`).then((response) => {
      setStaff(response.data.staff);
    });
    axios.get(`${request.SCHEDULE}`).then((response) => {
      setSchedule(response.data.schedule);
    });
  }, []);
  useEffect(() => {
    setError("");
  }, [form]);
  const idSchedule = Form.useWatch("idSchedule", form);
  const idStaff = Form.useWatch("idStaff", form);
  const handClick = () => {
    const dataStaff = staff?.filter((item) => item.id === parseInt(idStaff));
    const dataSchedule = schedule?.filter(
      (item) => item.id === parseInt(idSchedule)
    );
    if (dataSchedule.length > 0 && dataStaff.length > 0) {
      axios
        .post(
          `${request.STAFF_SCHEDULE}`,
          {},
          { params: { idSchedule, idStaff } }
        )
        .then((response) => {
          if (response.data.status === 1) {
            setError("1");
            handleClick();
          } else {
            setError("2");
            setTimeout(() => {
              setError("1");
            }, 3000);
          }
        });
    } else {
      setError("2");
      setTimeout(() => {
        setError("1");
      }, 3000);
    }
  };
  return (
    <>
      <Form name="basic" form={form}>
        <div className="content">
          <p>ADD</p>
          <div className="click" onClick={handleClick}>
            X
          </div>
        </div>
        {error === "1" ? (
          <Space
            direction="vertical"
            style={{
              width: "100%",
            }}
          >
            <Alert message="Success" type="success" showIcon closable />
          </Space>
        ) : error === "2" ? (
          <Space
            direction="vertical"
            style={{
              width: "100%",
            }}
          >
            <Alert message="Error" type="error" showIcon closable />
          </Space>
        ) : (
          <></>
        )}
        {items.map((item, index) => (
          <Form.Item
            label={item.name}
            name={item.name}
            key={index}
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        ))}

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button onClick={handClick} htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
