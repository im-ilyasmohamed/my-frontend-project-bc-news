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
        console.log(response.data.allArticles);
        setArticles(response.data.allArticles);
      })
      .catch((error) => {
        // handle error
      });
  }, []); // important to have a dependency array even if blank, this ensures that the resource is not loaded on every render

  return (
    <div id="product-list-homepage">
      {articles.length > 0 ? (
        articles.map((article_item, key) => {
          console.log(article_item);
          return <ArticleCard article_item={article_item} key={key} />;
        })
      ) : (
        <p>Loading articles...</p>
      )}
    </div>
  );
}

export default ArticlesList;
