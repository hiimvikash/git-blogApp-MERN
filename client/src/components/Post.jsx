import {formatISO9075} from "date-fns";
import {Link} from "react-router-dom";

function Post({_id,title,summary,coverImageURL,content,createdAt,createdBy}) {
  return (
    <div className="post">
        <div className="image">
        <Link to={`/blog/${_id}`}>
          <img src={`http://localhost:4000${coverImageURL}`} alt="postImage" />
        </Link>
        </div>
        <div className="text">
        <Link to={`/blog/${_id}`}>
          <h2>{title}</h2>
        </Link>
          <p className="info">
            <a href="" className="author">{createdBy.username}</a>
            <time>{formatISO9075(new Date(createdAt))}</time>
          </p>
          <p className="summary">{summary}</p>
        </div>
    </div>
  )
}

export default Post