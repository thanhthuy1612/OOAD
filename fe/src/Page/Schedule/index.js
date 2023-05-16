import axios from "axios";
import { useEffect, useState } from "react";
import { request } from "../../data/url";
import { Table } from "antd";
import AddSchedule from "../../components/AddSchedule";
import EditSchedule from "../../components/EditSchedule";
import "./Schedule.css";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  { title: "Schedule", dataIndex: "schedule", key: "schedule" },
  {
    title: "Time",
    dataIndex: "time",
    key: "time",
  },
];
const columnSchedule = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Schedule Name",
    dataIndex: "scheduleName",
    key: "scheduleName",
  },
  {
    title: "Time Start",
    dataIndex: "timeStart",
    key: "timeStart",
  },
  {
    title: "Time End",
    dataIndex: "timeEnd",
    key: "timeEnd",
  },
];
export default function Schedule() {
  const [schedule, setSchedule] = useState([]);
  const [scheduleStaff, setScheduleStaff] = useState([]);
  const [staff, setStaff] = useState([]);
  const [data, setData] = useState([]);
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    axios.get(`${request.STAFF}`).then((response) => {
      setStaff(response.data.staff);
    });
    axios.get(`${request.SCHEDULE}`).then((response) => {
      setSchedule(response.data.schedule);
    });
    axios.get(`${request.STAFF_SCHEDULE}`).then((response) => {
      setScheduleStaff(response.data.staffSchedule);
    });
  }, []);

  useEffect(() => {
    setData([]);
    scheduleStaff.forEach((element) => {
      let idSchedule = schedule.filter((id) => element.idSchedule === id.id);
      let idStaff = staff.filter((id) => element.idStaff === id.id);
      setData((pre) => [
        ...pre,
        {
          name: idStaff[0]?.name,
          schedule: idSchedule[0]?.scheduleName,
          time: `${idSchedule[0]?.timeStart}-${idSchedule[0]?.timeEnd}`,
        },
      ]);
    });
    for (let i = 0; i < 120; i++) {
      console.log(`result_answer["${i + 1}"]`);
    }
  }, [add, scheduleStaff, schedule, staff]);

  const handleAdd = () => {
    setAdd(true);
  };
  const handleEdit = () => {
    setEdit(true);
  };
  console.log(edit, add);

  return (
    <div>
      {!edit && !add ? (
        <div>
          <div className="button">
            <button onClick={handleAdd}>Add</button>
            <button onClick={handleEdit}>Edit</button>
          </div>
          <Table columns={columns} dataSource={data} />
          <Table columns={columnSchedule} dataSource={schedule} />
        </div>
      ) : (
        <></>
      )}
      {add ? (
        <AddSchedule
          handleClick={() => {
            setAdd(false);
          }}
        />
      ) : (
        <></>
      )}
      {edit ? (
        <EditSchedule
          handleClick={() => {
            setEdit(false);
          }}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
