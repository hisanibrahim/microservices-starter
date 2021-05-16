const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:postId/comments", (req, res) => {
  res.send(commentsByPostId[req.params.postId] || []);
});

app.post("/posts/:postId/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const { postId } = req.params;

  const comments = commentsByPostId[postId] || [];

  comments.push({ id: commentId, content, status: "PENDING" });

  commentsByPostId[postId] = comments;

  await axios.post("http://event-bus-service:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId,
      status: "PENDING",
    },
  });

  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  console.log("Event recieved ", type);
  if (type === "CommentModerated") {
    const { id, postId, status } = data;
    const comments = commentsByPostId[postId];
    const comment = comments.find((comment) => comment.id === id);
    comment.status = status;
    await axios.post("http://event-bus-service:4005/events", {
      type: "CommentUpdated",
      data: {
        id: comment.id,
        content: comment.content,
        postId,
        status: comment.status,
      },
    });
  }
  res.send({});
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.PORT}`);
});
