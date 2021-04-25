const express = require("express");
const cors = require("cors");

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

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  console.log("Event recieved ", req.body.type);
  const { type, data } = req.body;

  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId } = data;
    posts[postId].comments.push({ id, content });
  }

  console.log(posts);

  res.send({});
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.PORT}`);
});
