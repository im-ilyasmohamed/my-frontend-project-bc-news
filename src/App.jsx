import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { useState } from "react";
import "./App.css";
import ArticlesList from "./components/ArticlesList/articlesList";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <p>Header</p>
      <ArticlesList />
    </>
  );
}

export default App;
