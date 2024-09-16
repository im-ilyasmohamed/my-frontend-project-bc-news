import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import "./App.css";
import ArticlesList from "./components/ArticlesList/articlesList";
import ArticleIndividual from "./components/ArticleIndividual/ArticleIndividual";
import axios from "axios";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
// Creating a custom axios instance
//
const apiClient = axios.create({
  baseURL: "https://my-backend-project-bc-news.onrender.com",
  timeout: 1000,
});
function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true); // was getting an error, return in the jsx below would not render, this is because the render was happening before the data was fetched from the api, instead I put in a conditional, when it loads it will then show!
  const [currentArticleIndividual, setCurrentArticleIndividual] = useState(); // for displaying individual article page
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
    <div>
      <p>Header</p>
      <Routes>
        <Route
          path="/"
          element={<ArticlesList articles={articles} loading={loading} />}
        />
        <Route
          path="/"
          element={
            <>
              <ArticleIndividual
                currentArticleIndividual={currentArticleIndividual}
                loading={loading}
              />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
