import React from "react";

export default ({ comments }) => {
  const renderedComments = comments.map((comment) => {
    let content;
    switch (comment.status) {
      case "APPROVED":
        content = comment.content;
        break;
      case "PENDING":
        content = "This comment is awaiting moderation";
        break;
      case "REJECTED":
        content = "This comment is rejected";
        break;
    }

    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};
