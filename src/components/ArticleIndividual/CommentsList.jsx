import { useEffect, useState } from "react";
import apiClient from "../../util/my-axios-api";
function CommentsList({ article_id }) {
  const [comments, setComments] = useState(null);
  const [loading, setLoading] = useState(true);
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
  return (
    <>
      {/* Loading state */}
      {loading ? (
        <p>Loading comments...</p>
      ) : comments && comments.length > 0 ? (
        <div>
          <h2>Comments</h2>
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
