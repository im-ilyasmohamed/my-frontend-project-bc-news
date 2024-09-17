import { Link } from "react-router-dom";

function ArticleCard({ article_item, setCurrentArticle }) {
  function handleButtonSetArticle() {
    setCurrentArticle(article_item);
  }
  return (
    <div id="article-card-homepage" kay={article_item.article_id}>
      <img
        src={article_item.article_img_url}
        alt="Article"
        className="img-article-card-homepage"
      />
      <div>
        <h3>{article_item.title}</h3>
        <h4>{article_item.topic}</h4>
        <p className="p-text-ellipsis">{article_item.body}</p>
        <Link to="/article">
          <button type="button" onClick={handleButtonSetArticle}>
            Read Article
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ArticleCard;
