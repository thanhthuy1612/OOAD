import { useState, useEffect } from "react";
import ButtonRadio from "../../components/ButtonRadio";
import axios from "axios";
import { request } from "../../data/url";
import ShowData from "../../components/ShowData";
import { Form, Input, Button } from "antd";
import "./Home.css";
import Info from "../../components/Info";
import Profile from "../../components/Camera";
import AddItem from "../../components/AddItem";
import OutItem from "../../components/OutItem";

export default function Home() {
  const [logDetail, setLogDetail] = useState([]);
  const [card, setCard] = useState([]);
  const [cardType, setCardType] = useState([]);
  const [log, setLog] = useState([]);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [idLog, setIdLog] = useState([]);
  const [type, setType] = useState("in");
  const [typeOpen, setTypeOpen] = useState("close");

  const id = Form.useWatch("cardId", form);

  useEffect(() => {
    axios.get(`${request.LOG_DETAIL}`).then((response) => {
      setLogDetail(response.data.logDetail);
    });
    axios.get(`${request.CARD_TYPE}`).then((response) => {
      setCardType(response.data.card_type);
    });
    axios.get(`${request.CARD}`).then((response) => {
      setCard(response.data.card);
    });
    axios.get(`${request.LOG}`).then((response) => {
      setLog(response.data.log);
    });
  }, [form]);

  const handleChange = () => {
    switch (type) {
      case "in":
        setType("out");
        break;
      case "out":
        setType("in");
        break;
      default:
        break;
    }
  };
  const handleOpen = () => {
    switch (typeOpen) {
      case "open":
        setTypeOpen("close");
        break;
      case "close":
        setTypeOpen("open");
        break;
      default:
        break;
    }
  };

  const handleOpenList = async () => {
    setTimeout(() => {
      setTypeOpen("open");
    }, 5000);
    setTimeout(() => {
      setTypeOpen("close");
    }, 10000);
  };

  const handClick = () => {
    const dataLog = log?.filter((log) => log.card_id === parseInt(id));
    const dataLogDetail = logDetail?.filter(
      (logDetail) => logDetail.logId === dataLog[0]?.id
    );
    const dataCard = card?.filter((card) => card.id === parseInt(id));
    const dataCardType = cardType?.filter(
      (cardType) => cardType.id === dataCard[0]?.card_type_id
    );
    setIdLog([dataLog, dataLogDetail, dataCard, dataCardType]);
    setData(dataLogDetail);
  };

  return (
    <div>
      <ButtonRadio
        type={type}
        onChange={handleChange}
        typeOpen={typeOpen}
        onOpen={handleOpen}
      />
      {type === "out" ? (
        <div className="showData">
          <Form name="basic" form={form}>
            <Form.Item
              label="CardId"
              name="cardId"
              rules={[
                {
                  required: true,
                  message: "Please input id!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Button onClick={handClick} htmlType="submit">
              Submit
            </Button>
          </Form>
          {data.length !== 0 ? (
            <div className="home_list">
              <div>
                <ShowData data={data[0]} />
                <Info data={idLog} />
              </div>
              <Profile />
              <OutItem data={data} handleOpen={handleOpenList} />
            </div>
          ) : (
            <div className="data">Card Id does not exit</div>
          )}
        </div>
      ) : (
        <div className="flex">
          <Profile />
          <AddItem handleOpen={handleOpenList} />
        </div>
      )}
    </div>
  );
}
