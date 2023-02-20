import { Form, Input, Button } from "antd";
import axios from "axios";
import { useState } from "react";
import { request } from "../../data/url";

export default function OutItem({ data, handleOpen }) {
  const items = [{ name: "image" }, { name: "time" }];
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
    let license;
    await axios.post(`${request.LICENSE_NUMBER}`, {}, { params: { image } });
    await axios.get(`${request.LICENSE_NUMBER}`).then((response) => {
      license = response.data.licenseNumber;
    });
    console.log(license[license.length - 1]);
    if (license[license.length - 1].license_number === data[0].lisence_number) {
      await axios.put(`${request.LOG_DETAIL}`, {}, { params: itemLogDetail });
      await axios.put(`${request.LOG}`, {}, { params: itemLog });
      handleOpen();
      form.resetFields();
    }
  };

  return (
    <Form name="basic" form={form}>
      <div className="content">
        <p>ADD</p>
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
        <Button onClick={handleSubmit} htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
