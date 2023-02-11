import { Tabs } from "antd";
export default function Info({ data }) {
  const items = [
    {
      key: "1",
      label: `LOG`,
      children: `Time in: ${data[0][0].entry_id}\nTime out: ${data[0][0].exit_id}\nTotal price: ${data[0][0].total_price}`,
    },
    {
      key: "2",
      label: `CARD`,
      children: `Base price: ${data[2][0].base_price}\nCode: ${data[2][0].code}\nPrice script: ${data[2][0].price_script}\nType: ${data[2][0].type}`,
    },
    {
      key: "3",
      label: `LOG DETAIL`,
      children: `License number: ${data[1][0].lisence_number}\nTime: ${data[1][0].time}\nType: ${data[1][0].type}`,
    },
    {
      key: "4",
      label: `CARD TYPE`,
      children: `Name: ${data[3][0].name}`,
    },
  ];
  return <Tabs defaultActiveKey="1" items={items} />;
}
