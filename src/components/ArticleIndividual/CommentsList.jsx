import { useEffect, useState } from "react";
import apiClient from "../../util/my-axios-api";
function CommentsList({ article_id }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentNewComment, setCurrentNewComment] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); //delay submit button
  const [isDeleting, setIsDeleting] = useState(null); //delay delete comment button

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
    if (isSubmitting) {
      return true; // is state is true return, and stop process
    }
    setIsSubmitting(true);
    setError(null); // set errror to null

    console.log(currentNewComment, "useState() new comment to post");

    // post request
    apiClient
      .post(`/api/articles/${article_id}/comments`, {
        username: "jessjelly",
        body: currentNewComment,
      })
      .then((response) => {
        ///////////////////////////////////////////////////
        ///////////////////////////////////////////////////
        // database updates in the order of latest first //
        ///////////////////////////////////////////////////
        ///////////////////////////////////////////////////
        const response_comment_id = response.data.pushedComment.comment_id;

        // optimistic UI
        setComments((prevComments) => [
          {
            comment_id: response_comment_id,
            author: "jessjelly",
            body: currentNewComment,
          }, //could cause error if comment id is duplicate of what was GET requested from axios in useEffect
          ...prevComments,
        ]);
        setIsSubmitting(false);

        // // optimistic UI - poor use of comment.length

        // setComments((prevComments) => [
        //   ...prevComments,
        //   {
        //     comment_id: comments.length,
        //     author: "jessjelly",
        //     body: currentNewComment,
        //   }, //could cause error if comment id is duplicate of what was GET requested from axios in useEffect
        // ]);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to post comment. Please try again");
        setIsSubmitting(false);
      });
  }
  function handleDeleteComment(event) {
    //preevnt.default();
    const buttonCommentId = parseInt(event.target.value); // comment_id from button
    if (isDeleting === buttonCommentId) {
      return; // if button already pressed, stop return and stop function from running
    }
    setIsDeleting(buttonCommentId);
    const tempCommentToDelete = comments.find((comment) => {
      return comment.comment_id === buttonCommentId;
    }); // comment to remove from render
    // optimitically locd comment
    setComments((prevComments) => {
      return prevComments.filter(
        (comment) => comment.comment_id !== buttonCommentId
      );
    });

    //
    apiClient
      .delete(`/api/comments/${event.target.value}`)
      .then((response) => {
        // get back delete comment
        console.log(response, "comment successfully deleted");
        setIsDeleting(null);
      })
      .catch((error) => {
        console.error(error);
        console.log(error);
        setComments((prevComments) => [tempCommentToDelete, ...prevComments]);
        setIsDeleting(null);
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
              {comment.author === "jessjelly" ? (
                <>
                  <button
                    value={comment.comment_id}
                    onClick={handleDeleteComment}
                  >
                    Delete my comment
                  </button>
                </>
              ) : null}
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
