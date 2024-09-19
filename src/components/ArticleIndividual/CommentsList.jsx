import { useEffect, useState } from "react";
import apiClient from "../../util/my-axios-api";
function CommentsList({ article_id }) {
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentNewComment, setCurrentNewComment] = useState("");
  const [error, setError] = useState(null);
  useEffect(() => {
    apiClient
      .get(`/api/articles/${article_id}/comments`)
      .then((response) => {
        const commentsList = response.data.commentItem;
        setComments(commentsList);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
        setLoading(false);
      });
  }, []);
  function handlePostTextInput(event) {
    console.log(event.target.value, "new comment to post");
    setCurrentNewComment(event.target.value);
  }
  function handleSubmitCommentButton(event) {
    console.log(currentNewComment, "attempted to post this");
    console.log(article_id, "<--- article id");
    setError(null); // set errror to null

    console.log(currentNewComment, "useState() new comment to post");

    // post request
    apiClient
      .post(`/api/articles/${article_id}/comments`, {
        username: "jessjelly",
        body: currentNewComment,
      })
      .then((response) => {
        // optimistic UI
        setComments((prevComments) => [
          ...prevComments,
          {
            comment_id: comments.length,
            author: "jessjelly",
            body: currentNewComment,
          }, //could cause error if comment id is duplicate of what was GET requested from axios in useEffect
        ]);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to post comment. Please try again");
      });
  }
  return (
    <>
      {/* Loading state */}
      {loading ? (
        <p>Loading comments...</p>
      ) : comments && comments.length > 0 ? (
        <div>
          <h2>Comments</h2>
          <div>
            <textarea
              placeholder="Write your comment here..."
              rows="3"
              style={{ resize: "none" }}
              onChange={handlePostTextInput}
              value={currentNewComment}
            ></textarea>
            <button onClick={handleSubmitCommentButton}>Submit Comment</button>
            {/* Error message */}
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
          {comments.map((comment) => (
            <div key={comment.comment_id}>
              <h4>{comment.author}</h4>
              <p>{comment.body}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No comments found</p>
      )}
    </>
  );
}

export default CommentsList;
