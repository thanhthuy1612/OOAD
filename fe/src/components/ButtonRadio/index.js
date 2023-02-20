import { Radio } from "antd";
import "./ButtonRadio.css";

export default function ButtonRadio({ type, onChange, typeOpen, onOpen }) {
  return (
    <div className="buttonRadio">
      <Radio.Group className="sidebar_button" value={type} onChange={onChange}>
        <Radio.Button value="in">IN</Radio.Button>
        <Radio.Button value="out">OUT</Radio.Button>
      </Radio.Group>

      <Radio.Group
        className="sidebar_button"
        value={typeOpen}
        onChange={onOpen}
      >
        <Radio.Button value="open">OPEN</Radio.Button>
        <Radio.Button value="close">CLOSE</Radio.Button>
      </Radio.Group>
    </div>
  );
}
