// imports
import { useEffect, useState } from "react";
import exampleArticlesData from "../../SampleData/api-articles.json";
import ArticleCard from "./ArticleCard";
import axios from "axios";

// Creating a custom axios instance
const apiClient = axios.create({
  baseURL: "https://my-backend-project-bc-news.onrender.com",
  timeout: 1000,
});
//
function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true); // was getting an error, return in the jsx below would not render, this is because the render was happening before the data was fetched from the api, instead I put in a conditional, when it loads it will then show!

  function helperFunction() {
    console.log(articles, "useState");
  }
  helperFunction();

  // useEffect means it only loads once, dont need it to load on every render
  useEffect(() => {
    apiClient
      .get("/api/articles")
      .then((response) => {
        // handle success

        setArticles(response.data.allArticles);
        setLoading(false); // so can render return statement below
      })
      .catch((error) => {
        // handle error
        setLoading(false); // stops the loading state, if cant get the data
      });
  }, []); // important to have a dependency array even if blank, this ensures that the resource is not loaded on every render, i.e. only set on first mount and not rerendered

  return (
    <div id="product-list-homepage">
      {/* api Load states renders */}
      {loading ? (
        <p>Loading articles...</p>
      ) : articles.length > 0 ? (
        articles.map((article_item, key) => {
          console.log(article_item);
          return <ArticleCard article_item={article_item} key={key} />;
        })
      ) : (
        <p>No articles found</p>
      )}
    </div>
  );
}

export default ArticlesList;
