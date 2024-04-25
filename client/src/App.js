import React, { useState } from "react";
import axios from "axios";
import Heatmap from "react-heatmap-grid";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [data, setData] = useState([]);

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onFileUpload = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    console.log("File is uploading");

    const api = axios.create({
      baseURL: "http://localhost:5000",
      timeout: 5000,
    });

    try {
      await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const response = await api.get("/data");
      setData(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const heatmapData = {
    xLabels: Array.from(new Set(data.map((item) => item.x))),
    yLabels: Array.from(new Set(data.map((item) => item.y))),
    data: data.map((item) => [item.x, item.y, item.value]),
  };

  return (
    <div className="App">
      <h1>Heatmap</h1>

      <div>
        <input type="file" onChange={onFileChange} />
        <button onClick={onFileUpload}>Upload</button>
      </div>

      <div style={{ marginTop: "20px" }}>
        {data.length > 0 && (
          <Heatmap
            xLabels={heatmapData.xLabels}
            yLabels={heatmapData.yLabels}
            data={heatmapData.data}
            width={20}
            height={20}
            squares
            onClick={(x, y) => alert(`Clicked ${x}, ${y}`)}
            cellRender={(value) => value && `${value.toFixed(2)}`}
          />
        )}
      </div>
    </div>
  );
}

export default App;
