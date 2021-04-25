const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/events", (req, res) => {
  const event = req.body;
  console.log(event);
  axios.post("http://localhost:4000/events", event);
  axios.post("http://localhost:4001/events", event);
  axios.post("http://localhost:4002/events", event);

  res.send({ status: "OK" });
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.PORT}`);
});
