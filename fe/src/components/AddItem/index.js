import { Form, Input, Button, Alert, Space } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { request } from "../../data/url";

export default function AddItem({ handleOpen }) {
  const [logList, setLogList] = useState([]);
  const [cardList, setCardList] = useState([]);
  const [error, setError] = useState("");
  const items = [
    { name: "card_type_id" },
    { name: "image" },
    { name: "staffId" },
    { name: "time" },
  ];
  const [form] = Form.useForm();
  const card_type_id = Form.useWatch("card_type_id", form);
  const image = "./be/images/" + Form.useWatch("image", form);
  const staffId = Form.useWatch("staffId", form);
  const entry_id = Form.useWatch("time", form);
  const card = {
    base_price: card_type_id === "2" ? 50 : 3,
    card_type_id: card_type_id,
    code: card_type_id === "2" ? "M2" : "M1",
    price_script: "constant",
    type: 0,
  };

  const handleSubmit = async () => {
    let er = "1";
    if (card_type_id === "2" || card_type_id === "4") {
      await axios
        .post(`${request.CARD}`, {}, { params: card })
        .then((response) => {
          if (response.data.status === -1) {
            setError("2");
            er = "2";
          } else {
            setError("1");
          }
        });
    }

    const log = {
      card_id: cardList[cardList.length - 1].id + 1,
      entry_id,
      exit_id: "",
      total_price: card_type_id === "2" ? 50 : 3,
    };

    await axios.post(`${request.LOG}`, {}, { params: log }).then((response) => {
      if (response.data.status === -1) {
        setError("2");
        er = "2";
      } else {
        setError("1");
      }
    });

    const logDetail = {
      image,
      logId: logList[logList.length - 1].id + 1,
      staffId,
      time: entry_id,
      type: card_type_id === "2" ? "1" : "0",
    };

    await axios
      .post(`${request.LOG_DETAIL}`, {}, { params: logDetail })
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
    setError("");
    form.resetFields();
  };
  useEffect(() => {
    axios.get(`${request.LOG}`).then((response) => {
      setLogList(response.data.log);
    });
    axios.get(`${request.CARD}`).then((response) => {
      setCardList(response.data.card);
    });
  }, [form]);

  return (
    <Form name="basic" form={form}>
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
