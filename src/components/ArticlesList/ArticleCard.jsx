function ArticleCard({ article_item }) {
  return (
    <div id="article-card-homepage" kay={article_item.article_id}>
      <img
        src={article_item.article_img_url}
        alt="Article"
        className="img-article-card-homepage"
      />
      <div>
        <h3>{article_item.title}</h3>
        <p>{article_item.body}</p>
      </div>
    </div>
  );
}

export default ArticleCard;
