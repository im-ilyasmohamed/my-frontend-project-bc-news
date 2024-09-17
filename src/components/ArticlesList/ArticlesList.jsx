// imports

import exampleArticlesData from "../../SampleData/api-articles.json"; //used sample data for testing before using api
import ArticleCard from "./ArticleCard";
//
function ArticlesList({ loading, articles, setCurrentArticleIndividual }) {
  return (
    <div id="product-list-homepage">
      {/* api Load states renders */}
      {loading ? (
        <p>Loading articles...</p>
      ) : articles.length > 0 ? (
        articles.map((article_item, key) => {
          return (
            <ArticleCard
              article_item={article_item}
              key={key}
              setCurrentArticleIndividual={setCurrentArticleIndividual}
            />
          );
        })
      ) : (
        <p>No articles found</p>
      )}
    </div>
  );
}

export default ArticlesList;
