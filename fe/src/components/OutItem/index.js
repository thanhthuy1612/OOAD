import { Form, Input, Button, Alert, Space } from "antd";
import axios from "axios";
import { useState } from "react";
import { request } from "../../data/url";

export default function OutItem({ data, handleOpen }) {
  const items = [{ name: "image" }, { name: "time" }];
  const [error, setError] = useState("");
  const [form] = Form.useForm();
  const timeOut = Form.useWatch("time", form);
  const itemLogDetail = {
    time: data[0].time + "-" + timeOut,
    id: data[0].id,
  };
  const itemLog = {
    exit_id: timeOut,
    id: data[0].logId,
  };
  const image = "./be/images/" + Form.useWatch("image", form);

  const handleSubmit = async () => {
    let er = "1";
    if ((timeOut, image)) {
      let license;
      await axios.post(`${request.LICENSE_NUMBER}`, {}, { params: { image } });
      await axios.get(`${request.LICENSE_NUMBER}`).then((response) => {
        license = response.data.licenseNumber;
      });
      console.log(license[license.length - 1]);
      if (
        license[license.length - 1].license_number === data[0].lisence_number
      ) {
        await axios
          .put(`${request.LOG_DETAIL}`, {}, { params: itemLogDetail })
          .then((response) => {
            if (response.data.status === -1) {
              setError("2");
              er = "2";
            } else {
              setError("1");
            }
          });
        await axios
          .put(`${request.LOG}`, {}, { params: itemLog })
          .then((response) => {
            if (response.data.status === -1) {
              setError("2");
              er = "2";
            } else {
              setError("1");
            }
          });
        if (er === "1") {
          handleOpen();
        }
        setTimeout(() => {
          setError("");
        }, 10000);
        form.resetFields();
      } else {
        setError("2");
        setTimeout(() => {
          setError("");
        }, 10000);
      }
    }
  };

  return (
    <Form name="basic" form={form}>
      <div className="content">
        <p>ADD</p>
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
        <Button onClick={handleSubmit} htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
