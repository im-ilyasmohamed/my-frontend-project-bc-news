import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import "./App.css";
import ArticlesList from "./components/ArticlesList/articlesList";
import ArticleIndividual from "./components/ArticleIndividual/ArticleIndividual";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import apiClient from "./util/my-axios-api";

function App() {
  return (
    <div>
      <div>
        <Link to="/">
          <button type="button">Home</button>
        </Link>
        <span> ...Header pending... </span>
      </div>
      <Routes>
        <Route path="/" element={<ArticlesList />} />
        <Route
          path="/article/:article_id"
          element={
            <>
              <ArticleIndividual />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
