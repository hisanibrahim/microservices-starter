const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(cors());

const posts = {};

/*

posts === {
    "1a2s3d": {
        id: '1a2s3d',
        title: 'Post name'
        comments: [
            { id: 'q1w2e3', content: 'New comment 1!' },
            { id: 'q9w8e7', content: 'New comment 2!' },
        ]
    }
}

*/

const handleEvent = (type, data) => {
  console.log("Event processed ", type);

  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    posts[postId].comments.push({ id, content, status });
  }

  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    const comment = post.comments.find((comment) => comment.id == id);
    comment.status = status;
    comment.content = content;
  }
};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  console.log("Event recieved ", req.body.type);
  const { type, data } = req.body;

  handleEvent(type, data);

  console.log(posts);

  res.send({});
});

app.listen(process.env.PORT, async () => {
  console.log(`Listening on ${process.env.PORT}`);

  const events = await axios.get("http://event-bus-service:4005/events");
  for (let event of events.data) {
    handleEvent(event.type, event.data);
  }
});
