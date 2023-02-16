import { Form, Input, Button } from "antd";
import axios from "axios";
import { request } from "../../data/url";

export default function AddSchedule({ handleClick }) {
  const items = [
    {
      name: "idSchedule",
    },
    {
      name: "idStaff",
    },
  ];
  const [form] = Form.useForm();
  const idSchedule = Form.useWatch("idSchedule", form);
  const idStaff = Form.useWatch("idStaff", form);
  const handClick = () => {
    axios
      .post(
        `${request.STAFF_SCHEDULE}`,
        {},
        { params: { idSchedule, idStaff } }
      )
      .then((response) => {
        if (response.data.status === 1) {
          handleClick();
        }
      });
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
