import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import {formatISO9075} from "date-fns";
import { useUserInfo } from "../context/UserContext";


function ViewBlog() {
    const {id} = useParams();
    const [blog, setBlog] = useState(null);
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState("");
    const {setIsLoggedIn, isLoggedIn, setUserInfo, userInfo} = useUserInfo();
    const navigate = useNavigate();

    useEffect(()=>{
        fetch(`http://localhost:4000/blog/${id}`, { credentials: 'include' }).then((response)=>{
            response.json().then(res=>{
              setBlog(res.blog);
              setComments(res.comments);

              if(res.info!==null){
                setIsLoggedIn(true);
                setUserInfo(res.info);
              }else {
                setIsLoggedIn(false);
              }
            })
        })
    }, [])

    function addcomment(){
      fetch(`http://localhost:4000/blog/${blog._id}/addcomment`, {
        credentials:'include',
        method:"POST",
        body:JSON.stringify({content}),
        headers : {'Content-Type': 'application/json'},
      }).then(res=>res.json().then((cmnt)=> console.log(cmnt)))
    }

    function deleteblog(){
      fetch(`http://localhost:4000/blog/delete/${blog._id}`, {
        credentials: 'include'
      }).then(response=>response.json().then((rd)=>{
        console.log(rd.message);
        return navigate("/");
      }))
    }


  if(!blog) return  <p style={{textAlign: "center"}}>No Blog Found</p>;
  // navigate("sdbvfjhgse");
  

  return (
    <div className="post-page">
      <h1>{blog.title}</h1>
      <time>{formatISO9075(new Date(blog.createdAt))}</time>
      <div className="author">by @{blog.createdBy.username}</div>
      <div className="image">
        <img src={`http://localhost:4000${blog.coverImageURL}`} alt=""/>
      </div>
      <div className="content" dangerouslySetInnerHTML={{__html:blog.content}} />
      {isLoggedIn ? (
        
        <form className="comment" onSubmit={addcomment}>
        {/* <h3>Add Comment</h3> */}
        <input type="text" value={content} onChange={(e)=>setContent(e.target.value)} placeholder="Add your comments"/>
        <button type="submit">Comment</button>
        </form>
        
      ): (
        <div className="commentbanner">
        <p>login to add comments</p>
        </div>
      )}

      <div className="commentList">
        <h3>Comments({comments.length})</h3>
        {comments.length > 0 && (
          <ul>
            {comments.map(comment => (
              <li key={comment._id}>
                <div>
                  <strong>{comment.createdBy.username}</strong>: {comment.content}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {isLoggedIn && userInfo._id === blog.createdBy._id && (
        <button className="deletebutton" onClick={deleteblog}>Delete Blog</button>
      )}
    </div>
  )
}

export default ViewBlog