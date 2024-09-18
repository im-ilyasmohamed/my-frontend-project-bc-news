import { useEffect, useState } from "react";
import apiClient from "../../util/my-axios-api";
function CommentsList({ article_id }) {
  const [comments, setComments] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentNewComment, setCurrentNewComment] = useState("");
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
    console.log(currentNewComment, "useState() new comment to post");
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
