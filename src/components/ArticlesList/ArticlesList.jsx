// imports
import exampleArticlesData from "../../SampleData/api-articles.json";
import ArticleCard from "./ArticleCard";

//
function ArticlesList() {
  return (
    <div id="product-list-homepage">
      {exampleArticlesData.allArticles.map((article_item, key) => {
        return <ArticleCard article_item={article_item} key={key} />;
      })}
    </div>
  );
}

export default ArticlesList;
