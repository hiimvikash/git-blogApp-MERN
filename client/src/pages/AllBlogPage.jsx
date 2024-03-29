import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import { useUserInfo } from "../context/UserContext";

function AllBlogPage() {
  const [blogs, setBlogs] = useState({});
  const {userInfo} = useUserInfo();

  useEffect(() => {
    fetch("http://localhost:4000/blog").then((response) => {
      response.json().then((belogs) => {
        setBlogs(belogs);
      });
    });
  }, [userInfo, null]);
  
  const username = userInfo?.username;
  return (
    <>
      <h2 className="fronth2">All Blogs</h2>
      
      {blogs.length > 0 ? (
        blogs.map((blog) => <Post key={blog._id} {...blog} />)
      ) : (
        <p style={{textAlign:"center", color:"gray"}}>No Blogs found, create blog.</p>
      )}
    </>
  );
}

export default AllBlogPage;
