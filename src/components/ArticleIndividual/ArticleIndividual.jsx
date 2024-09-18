import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "../../util/my-axios-api";
import CommentsList from "./CommentsList";
function ArticleIndividual() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
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
