import { useEffect, useContext, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import DataContext from "./context/DataContext";
import api from "./api/posts";

const UpdatePost = () => {
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const { posts, setPosts } = useContext(DataContext);

  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);
  const navigate = useNavigate();

  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditTitle, setEditBody]);

  // Update post
  const handleEdit = async (id) => {
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const updatedPost = { id, title: editTitle, datetime, body: editBody };
    try {
      // put request - for all
      // patch for specific field
      const response = await api.put(`/posts/${id}`, updatedPost);
      // Use map, to avoid error
      setPosts(
        posts.map((post) => (post.id === id ? { ...response.data } : post))
      );
      setEditTitle("");
      setEditBody("");
      navigate("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <main className="NewPost">
      {/* Check if post exist */}

      {editTitle && (
        <>
          <h2>Edit Post</h2>
          <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="postTitle">Title:</label>
            <input
              id="postTitle"
              type="text"
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor="postBody">Post:</label>
            <input
              id="postBody"
              type="text"
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            />

            <button type="submit" onClick={() => handleEdit(post.id)}>
              Submit
            </button>
          </form>
        </>
      )}
      {!editTitle && (
        <>
          <h2>Post Not Found</h2>
          <p>Well, that&apos;s dissapointing.</p>
          <p>
            <Link to="/">Visit Our Homepage</Link>
          </p>
        </>
      )}
    </main>
  );
};

export default UpdatePost;
