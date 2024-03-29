import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useUserInfo } from "../context/UserContext";
import { Navigate, useNavigate } from "react-router-dom";

const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote','code-block'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      ['clean'],
    ],
  };

export default function CreateBlog() {
  const navigate = useNavigate();
  const {setIsLoggedIn, isLoggedIn, setUserInfo} = useUserInfo();

  
useEffect(()=>{
  async function verifyUser() {
    try {
      const response = await fetch('http://localhost:4000/user/verify', { credentials: 'include' });
      const rd = await response.json();
      if (!response.ok) {
        setIsLoggedIn(false);
        if(!isLoggedIn){
          navigate("/");
        }
      } else {
        setIsLoggedIn(true);
        setUserInfo(rd.info);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
    verifyUser();
  }, []);
  
  const [title,setTitle] = useState('');
  const [summary,setSummary] = useState('');
  const [content,setContent] = useState('');
  const [files,setFiles] = useState('');

  const [redirect, setRedirect] = useState(false);
  const [blog, setBlog] = useState({});

  async function CreateNewBlog(e){
    e.preventDefault();

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("coverImage", files[0]);


    const response = await fetch('http://localhost:4000/blog/addblog', {
      method : 'POST',
      body : data,
      credentials : 'include'
    })
    const rd = await response.json();
    if(response.ok){
      setBlog(rd);
      setRedirect(true);
    }else{
      console.log(rd.message);
    }
  }

  if(redirect){
    return <Navigate to={`/blog/${blog._id}`}/>
  }


  return (
    <form onSubmit={CreateNewBlog}>
      <input type="title" placeholder={"Title"} value={title} onChange={ev => setTitle(ev.target.value)} required/>
      <input type="summary" placeholder={" Summary"} value={summary} onChange={ev => setSummary(ev.target.value)} required/>
      <input type="file" onChange={(ev)=>setFiles(ev.target.files)}/>
      <ReactQuill value={content} onChange={val => setContent(val)} modules={modules} theme="snow" />
      <button type="submit" style={{ marginTop: "20px" }}>Upload Blog</button>
    </form>
  );
}
