import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "../../util/my-axios-api";
import CommentsList from "./CommentsList";
function ArticleIndividual() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  useEffect(() => {
    // Fetch the article data using the article_id
    apiClient
      .get(`/api/articles/${article_id}`)
      .then((response) => {
        const articleItem = response.data.articleItem[0];
        setArticle(articleItem);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching article:", error);
        setLoading(false);
      });
  }, []);
  function handleVoteButton(event) {
    setError(null); // set error back to null

    // typeof is string, so make int
    const updateVote = parseInt(event.target.value);

    // make patch request
    apiClient
      .patch(`/api/articles/${article_id}`, {
        inc_votes: updateVote,
      })
      .then((response) => {
        // dont do anything with response, as OPTIMISTIC LOADING is used
        setArticle((prevArticleItem) => ({
          ...prevArticleItem,
          votes: prevArticleItem.votes + updateVote,
        }));
      })
      .catch((error) => {
        console.error("Error updating votes:", error);
        setError("Failed to update votes. Please try again.");
      });
  }
  return (
    <>
      {/* api Load states renders */}
      {loading ? (
        <p>Loading article...</p>
      ) : article ? (
        <>
          <div id="article-card-homepage" key={article.article_id}>
            <img
              src={article.article_img_url}
              alt="Article"
              className="img-article-card-homepage"
            />
            <div>
              <h3>{article.title}</h3>
              <h4>{article.topic}</h4>
              <p>{article.body}</p>
              <div>
                <h4>Votes: {article.votes}</h4>
                <button value={1} onClick={handleVoteButton}>
                  {" "}
                  +{" "}
                </button>
                <button value={-1} onClick={handleVoteButton}>
                  {" "}
                  -{" "}
                </button>
              </div>
              {/* Error message */}
              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
          </div>
          <CommentsList article_id={article_id} />
        </>
      ) : (
        <p>No article found</p>
      )}
    </>
  );
}
export default ArticleIndividual;
