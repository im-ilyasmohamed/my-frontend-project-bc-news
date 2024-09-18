import { useEffect, useState } from "react";
import apiClient from "../../util/my-axios-api";
import ArticleCard from "./ArticleCard";
function ArticlesList() {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get("/api/articles")
      .then((response) => {
        // handle success
        setArticles(response.data.allArticles);
        setLoading(false);
      })
      .catch((error) => {
        // handle error
        setLoading(false);
      });
  }, []);

  return (
    <div id="product-list-homepage">
      {/* api Load states renders */}
      {loading ? (
        <p>Loading articles...</p>
      ) : articles.length > 0 ? (
        articles.map((article_item, key) => {
          return <ArticleCard article_item={article_item} key={key} />;
        })
      ) : (
        <p>No articles found</p>
      )}
    </div>
  );
}

export default ArticlesList;
