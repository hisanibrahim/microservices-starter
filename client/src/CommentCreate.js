import React, { useState } from "react";
import axios from "axios";

export default ({ postId }) => {
  const [content, setContent] = useState("");

  const onSubmit = async (event) => {
    try {
      event.preventDefault();
      await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
        content,
      });
      setContent("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>New comment</label>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Comment</button>
      </form>
    </div>
  );
};
