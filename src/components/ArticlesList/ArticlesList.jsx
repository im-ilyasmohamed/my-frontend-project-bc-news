import { useEffect, useState } from "react";
import apiClient from "../../util/my-axios-api";
import ArticleCard from "./ArticleCard";
function ArticlesList({ topic = undefined }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    let apiEndpoint = "/api/articles/";
    let params = {};

    if (topic) {
      params.topic = topic;
    } else {
      if (sortBy) {
        params.sort_by = sortBy;
      }

      if (order) {
        params.order = order;
      }
    }

    apiClient
      .get(apiEndpoint, { params })
      .then((response) => {
        console.log(response.data);
        // handle success
        setArticles(
          response.data.allArticles ||
            response.data.articlesByTopic ||
            response.data.allSortedArticles ||
            []
        ); // two differenct property names
        setLoading(false);
      })
      .catch((error) => {
        // handle error
        setLoading(false);
      });
  }, [topic, sortBy, order]);
  // Handle sorting option change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // Toggle between ascending and descending order
  const toggleOrder = () => {
    setOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };
  // const handleSort(){} // can do front end sorting

  return (
    <div id="product-list-homepage">
      <div>
        <p>Filter options:</p>
        {/* Dropdown for sorting */}
        <div>
          {topic === undefined && (
            <>
              <select value={sortBy} onChange={handleSortChange}>
                <option value="">Sort by...</option>
                <option value="created_at">Date</option>
                <option value="comment_count">Comment Count</option>
                <option value="votes">Votes</option>
              </select>
              {/* Button to toggle between ascending and descending order */}
              <button onClick={toggleOrder}>
                {order === "asc" ? "Ascending" : "Descending"}
              </button>
            </>
          )}
        </div>
      </div>

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
