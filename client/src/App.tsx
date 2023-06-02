import React, { useState } from "react";
import PostCreate from "./PostCreate";
import PostList from "./PostList";

const App = () => {
  const [posts, setPosts] = useState({});
  return (
    <div className="container">
      <h1>Create Post</h1>
      <PostCreate />
      <hr />
      <h1>Posts</h1>
      <PostList />
    </div>
  );
};
export  {App} ;
