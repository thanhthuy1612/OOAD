import { Button } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { request } from "../../data/url";
import "./Delete.css";

export default function DeleteAlert({ data, handleClose }) {
  const [staffSchedule, setStaffSchedule] = useState([]);
  useEffect(() => {
    axios.get(`${request.STAFF_SCHEDULE}`).then((response) => {
      setStaffSchedule(response.data.staffSchedule);
    });
  }, []);
  const handleSubmit = () => {
    axios
      .delete(`${request.STAFF}`, { params: { id: data.id } })
      .then((response) => response);
    const dataStaffSchedule = staffSchedule?.filter(
      (item) => item.idStaff === parseInt(data.id)
    );
    console.log(dataStaffSchedule, staffSchedule);
    dataStaffSchedule.forEach((item) => {
      axios
        .delete(`${request.STAFF_SCHEDULE}`, {
          params: { idSchedule: item.idSchedule, idStaff: item.idStaff },
        })
        .then((response) => response);
    });

    handleClose();
  };
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
