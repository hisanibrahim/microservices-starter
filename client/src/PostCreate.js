import React, { useState } from "react";
import axios from "axios";

export default () => {
  const [title, setTitile] = useState("");

  const onSubmit = async (event) => {
    try {
      event.preventDefault();
      await axios.post("http://localhost:4000/posts", {
        title,
      });
    } catch (err) {
      console.log(err);
    }
    setTitile("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitile(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};
