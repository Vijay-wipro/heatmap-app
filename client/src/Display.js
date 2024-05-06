import { Link } from "react-router-dom";
import Heatmap from "react-heatmap-grid";
import "./styles.css";

const Display = ({ data }) => {
  //   console.log(data);
  const reqData = data?.map((item) => {
    return [item.QC_cell_count_cov, item.QC_position_effect];
  });
  const xLabels = ["1am", "2am", "3am"];
  const yLabels = ["Sun", "Mon", "Tue"];
  // console.log(reqData);
  return (
    <>
      <div className="upload_section">
        <Link to="/">
          <button>Go Back</button>
        </Link>
        <h4>Display the data Visualize screen</h4>

        <Heatmap xLabels={xLabels} yLabels={yLabels} data={reqData} />
      </div>
    </>
  );
};

export default Display;
