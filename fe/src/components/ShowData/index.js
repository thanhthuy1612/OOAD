import "./ShowData.css";

export default function ShowData({ data }) {
  const img =
    "../../assets/images/" +
    data.image.split("/")[data.image.split("/").length - 1];
  console.log(img);
  return (
    <div className="data">
      <div>Image: </div>
      <img
        className="data_img"
        src={require("../../assets/images/" +
          `${data.image.split("/")[data.image.split("/").length - 1]}`)}
        alt=""
      />
      <div> License number: {data.lisence_number}</div>
    </div>
  );
}
