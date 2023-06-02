import React, { useState, useEffect } from "react";
import axios from "axios";
export type Comment  = {
  id: string;
  content: string;
  status: "approved" | "pending" | "rejected"
}
interface ICommentListProps {
  comments: Comment[]
}
const CommentList = ({ comments } : ICommentListProps) => {
  const renderedComments = comments.map((comment : Comment) => {
    const commentsHandler = {
      "approved": comment.content,
      "pending": "This comment is awaiting moderation",
      "rejected": "This comment has been rejected" 
    }
    return <li key={comment.id}>{commentsHandler[comment.status]}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
