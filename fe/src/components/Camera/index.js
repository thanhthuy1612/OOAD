import React from "react";
import { CameraFeed } from "./CameraFeed";

// Upload to local seaweedFS instance
const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  // Connect to a seaweedfs instance
};

export default function Camera() {
  return (
    <div className="App">
      <h1>Image capture test</h1>
      <p>Capture image from USB webcamera and upload to form</p>
      <CameraFeed sendFile={uploadImage} />
    </div>
  );
}
