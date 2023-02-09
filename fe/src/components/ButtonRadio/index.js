import { Radio } from "antd";
import { useState } from "react";
import "./ButtonRadio.css";

export default function ButtonRadio({ type, onChange }) {
  return (
    <div>
      <Radio.Group className="sidebar_button" value={type} onChange={onChange}>
        <Radio.Button value="in">IN</Radio.Button>
        <Radio.Button value="out">OUT</Radio.Button>
      </Radio.Group>
    </div>
  );
}
