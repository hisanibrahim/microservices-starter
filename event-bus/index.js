const express = require("express");
const axios = require("axios");

const app = express();

const events = [];

app.use(express.json());

app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event);

  console.log(`Received ${event.type} at event-bus`);

  axios
    .post("http://localhost:4000/events", event)
    .then(() => console.log("Event emitted to 4000"))
    .catch(() => console.log("Problem in emitting event to 4000"));

  axios
    .post("http://localhost:4001/events", event)
    .then(() => console.log("Event emitted to 4001"))
    .catch(() => console.log("Problem in emitting event to 4001"));

  axios
    .post("http://localhost:4002/events", event)
    .then(() => console.log("Event emitted to 4002"))
    .catch(() => console.log("Problem in emitting event to 4002"));

  axios
    .post("http://localhost:4003/events", event)
    .then(() => console.log("Event emitted to 4003"))
    .catch(() => console.log("Problem in emitting event to 4003"));

  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.PORT}`);
});
