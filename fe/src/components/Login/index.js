import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import "./Login.css";
export default function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const userName = Form.useWatch("username", form);
  const password = Form.useWatch("password", form);
  const handClick = () => {
    if (userName && password) {
      navigate("/home");
    }
  };
  return (
    <Form name="basic" form={form} className="login">
      <div className="content">LOGIN</div>
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
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
  );
}
