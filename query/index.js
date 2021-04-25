const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());


app.get("/posts", (req, res) => {
  res.send(posts);
});


app.post("/events", (req, res) => {
  console.log("Event recieved ", req.body.type);
  res.send({});
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.PORT}`);
});
