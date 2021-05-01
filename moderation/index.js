const express = require("express");

const app = express();

app.use(express.json());

app.post("/events", (req, res) => {
  console.log("Event recieved ", req.body.type);
  res.send({});
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.PORT}`);
});
