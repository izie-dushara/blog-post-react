import { Link, useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import DataContext from "./context/DataContext";
import api from "./api/posts";

const PostPage = () => {
  const { posts, setPosts } = useContext(DataContext);
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);
  const navigate = useNavigate();

  // Delete Post
  const handleDelete = async (id) => {
    try {
      // Delete request
      await api.delete(`/posts/${id}`);
      const postsList = posts.filter((post) => post.id !== id);
      setPosts(postsList);
      navigate("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };
  return (
    <main className="PostPage">
      <article className="post">
        {/* Show individual post */}
        {post && (
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="postBody">{post.body}</p>
            <Link to={`/edit/${post.id}`}>
              <button className="editButton">Edit Post</button>
            </Link>
            <button
              className="deleteButton"
              onClick={() => handleDelete(post.id)}
            >
              Delete Post
            </button>
          </>
        )}
        {/* If post not exists */}
        {!post && (
          <>
            <h2>Post Not Found</h2>
            <p>Well, that&apos;s dissapoint</p>
            <p>
              <Link to="/">Visit Our Homepage</Link>
            </p>
          </>
        )}
      </article>
    </main>
  );
};

export default PostPage;
