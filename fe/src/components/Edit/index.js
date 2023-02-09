import { Form, Input, Button } from "antd";
import { useEffect } from "react";
import axios from "axios";
import "./Edit.css";
import { request } from "../../data/url";
export default function Edit({ data, handleClose }) {
  const items = ["address", "email", "name", "phone", "salary"];
  const [form] = Form.useForm();
  const newData = {
    address: Form.useWatch("address", form),
    email: Form.useWatch("email", form),
    name: Form.useWatch("name", form),
    phone: Form.useWatch("phone", form),
    salary: Form.useWatch("salary", form),
    id: data.id,
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data, form]);
  const handleClick = () => {
    axios
      .put(`${request.STAFF}`, {}, { params: { ...newData } })
      .then((response) => response);
    handleClose();
  };

  return (
    <div className="edit">
      <div className="content">
        <p>EDIT</p>
        <div className="click" onClick={handleClose}>
          X
        </div>
      </div>
      <Form form={form}>
        {items.map((item, index) => (
          <Form.Item
            key={index}
            name={item}
            label={item.charAt(0).toUpperCase() + item.slice(1)}
            rules={[
              {
                required: true,
                message: "Please input info",
              },
            ]}
          >
            <Input />
          </Form.Item>
        ))}
        <Form.Item>
          <Button onClick={handleClick}>Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
}
