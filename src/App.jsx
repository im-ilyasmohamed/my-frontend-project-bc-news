import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import "./App.css";
import ArticlesList from "./components/ArticlesList/articlesList";
import ArticleIndividual from "./components/ArticleIndividual/ArticleIndividual";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import apiClient from "./util/my-axios-api";
import NotFound from "./components/ErrorHandling/NotFound";

function App() {
  return (
    <div>
      <div>
        <Link to="/">
          <button type="button">Home</button>
        </Link>
        <Link to="/article/topic/cooking">
          <button type="button">Cooking</button>
        </Link>
        <Link to="/article/topic/coding">
          <button type="button">Coding</button>
        </Link>
        <Link to="/article/topic/football">
          <button type="button">football</button>
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
        <Route
          path="/article/topic/cooking"
          element={<>{<ArticlesList topic="cooking" />}</>}
        />
        <Route
          path="/article/topic/coding"
          element={<>{<ArticlesList topic="coding" />}</>}
        />
        <Route
          path="/article/topic/football"
          element={<>{<ArticlesList topic="football" />}</>}
        />
        {/* Other routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
