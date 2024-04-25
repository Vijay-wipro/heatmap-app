const express = require("express");
const multer = require("multer");
const csvParser = require("csv-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");

mongoose.connect("mongodb://localhost:27017/vijaydb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const dataSchema = new mongoose.Schema({
  x: Number,
  y: Number,
  value: Number,
});

const Data = mongoose.model("Data", dataSchema);

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file.buffer.toString("utf8");
    const results = [];

    fs.writeFileSync("./uploads/data.csv", file);

    fs.createReadStream("./uploads/data.csv")
      .pipe(csvParser())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        await Data.deleteMany({});

        await Data.insertMany(results);

        res.status(200).json({ message: "Data uploaded successfully" });
      });
  } catch (error) {
    res.status(500).json({ message: "Error uploading file", error });
  }
});

app.get("/data", async (req, res) => {
  try {
    const data = await Data.find({});
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
