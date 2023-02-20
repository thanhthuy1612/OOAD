import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: "user",
};
const Profile = () => {
  const [picture, setPicture] = useState("");
  const webcamRef = useRef(null);
  const capture = useCallback(() => {
    const pictureSrc = webcamRef.current.getScreenshot();
    setPicture(pictureSrc);
  }, []);

  const handleClickRetake = (e) => {
    e.preventDefault();
    setPicture("");
  };

  const handleClickCapture = (e) => {
    e.preventDefault();
    capture();
  };

  return (
    <div>
      <div>Camera: </div>
      <div>
        {picture === "" ? (
          <Webcam
            audio={false}
            height={400}
            ref={webcamRef}
            width={400}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
        ) : (
          <img src={picture} alt="" />
        )}
      </div>
      <div>
        {picture !== "" ? (
          <button onClick={handleClickRetake} className="btn btn-primary">
            Retake
          </button>
        ) : (
          <button onClick={handleClickCapture} className="btn btn-danger">
            Capture
          </button>
        )}
      </div>
    </div>
  );
};
export default Profile;
