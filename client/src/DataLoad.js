import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const DataLoad = ({ fileUpload, text, setText }) => {
  useEffect(() => {
    setText("");
  }, []);

  return (
    <div className="upload_section">
      <div>
        <h4>Please upload a csv File</h4>
        <input type="file" onChange={fileUpload} accept=".csv" />
        {text && <p>{text}</p>}
      </div>
      <div className="button_sec">
        <Link to="/d3">
          <button>Display Map</button>
        </Link>
      </div>
    </div>
  );
};

export default DataLoad;
