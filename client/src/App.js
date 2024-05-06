import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Papa from "papaparse";

import DataLoad from "./DataLoad";
import Heatmap from "./d3Chart";

const App = () => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");

  const fileUpload = async (e) => {
    await setFile(e.target.files[0]);
    const uploaded_file = e.target.files[0];

    Papa.parse(uploaded_file, {
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        setFile(result.data);
      },
      skipEmptyLines: true,
    });
    setText("The file uploaded successfully");
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          exact
          element={
            <DataLoad
              fileUpload={fileUpload}
              setFile={setFile}
              text={text}
              setText={setText}
            />
          }
        />
        <Route path="/d3" element={<Heatmap reqData={file} />} />
      </Routes>
    </Router>
  );
};

export default App;
