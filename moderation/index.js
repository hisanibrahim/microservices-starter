const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  console.log("Event recieved ", type);

  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "REJECTED" : "APPROVED";
    await axios.post("http://event-bus-service:4005/events", {
      type: "CommentModerated",
      data: {
        id: data.id,
        content: data.content,
        postId: data.postId,
        status,
      },
    });
  }
  res.send({});
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.PORT}`);
});
