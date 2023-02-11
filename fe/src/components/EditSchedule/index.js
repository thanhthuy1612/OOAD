import { Form, Input, Button } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { request } from "../../data/url";

export default function EditSchedule({ handleClick }) {
  const items = [
    { name: "idStaff" },
    { name: "idScheduleNew" },
    { name: "idScheduleCurrent" },
  ];
  const [form] = Form.useForm();
  const [data, setData] = useState();
  const idScheduleNew = Form.useWatch("idStaff", form);
  const idStaff = Form.useWatch("idStaff", form);
  const idScheduleCurrent = Form.useWatch("idScheduleCurrent", form);
  useEffect(() => {
    setData({
      idScheduleNew: idScheduleNew,
      idStaffNew: idStaff,
      idStaffCurrent: idStaff,
      idScheduleCurrent: idScheduleCurrent,
    });
  }, [idScheduleNew, idStaff, idScheduleCurrent]);
  console.log(data);
  const handClick = () => {
    axios
      .put(`${request.STAFF_SCHEDULE}`, {}, { params: { ...data } })
      .then((response) => {
        if (response.data.status === 1) {
          handleClick();
        }
      });
  };
  return (
    <>
      <Form name="basic" form={form}>
        <div className="content">EDIT SCHEDULE</div>
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
