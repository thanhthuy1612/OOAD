import { Button } from "antd";
import axios from "axios";
import { request } from "../../data/url";
import "./Delete.css";

export default function DeleteAlert({ data, handleClose }) {
  const handleSubmit = () => {
    axios
      .delete(`${request.STAFF}`, { params: { id: data.id } })
      .then((response) => response);
    handleClose();
  };
  console.log(data);
  return (
    <div className="delete">
      <div className="content">
        <p>DELETE</p>
        <div className="click" onClick={handleClose}>
          X
        </div>
      </div>
      <div className="delete_title">Delete staff {data.name}</div>
      <Button className="delete_button" onClick={handleClose}>
        CANCEL
      </Button>
      <Button className="delete_button" onClick={handleSubmit}>
        CONFIRM
      </Button>
    </div>
  );
}
