import { useEffect, useState } from "react";
import apiClient from "../../util/my-axios-api";
import ArticleCard from "./ArticleCard";
function ArticlesList({ topic = undefined }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //
    let apiEndpoint = "/api/articles";
    if (topic) {
      apiEndpoint = `/api/articles?topic=${topic}`;
    }
    console.log(apiEndpoint);

    apiClient
      .get(apiEndpoint)
      .then((response) => {
        // handle success
        setArticles(response.data.allArticles || response.data.articlesByTopic); // two differenct property names
        setLoading(false);
      })
      .catch((error) => {
        // handle error
        setLoading(false);
      });
  }, [topic]);

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
