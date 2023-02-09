import { Form, Input, Button } from "antd";
import axios from "axios";
import { request } from "../../data/url";
export default function Add({ handleClose }) {
  const items = ["address", "email", "name", "phone", "salary"];
  const [form] = Form.useForm();
  const newData = {
    address: Form.useWatch("address", form),
    email: Form.useWatch("email", form),
    name: Form.useWatch("name", form),
    phone: Form.useWatch("phone", form),
    salary: Form.useWatch("salary", form),
  };

  const handleClick = () => {
    axios
      .post(`${request.STAFF}`, {}, { params: { ...newData } })
      .then((response) => response);
    handleClose();
  };

  return (
    <div className="edit">
      <div className="content">
        <p>ADD</p>
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
