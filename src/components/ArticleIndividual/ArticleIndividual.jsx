function ArticleIndividual({ loading, currentArticleIndividual }) {
  function helperFunction() {
    console.log(currentArticleIndividual, "individual article page");
  }
  helperFunction();

  // could refactor to add loading states
  return (
    <>
      {/* api Load states renders */}
      {loading ? (
        <p>Loading article...</p>
      ) : currentArticleIndividual ? (
        <div
          id="article-card-homepage"
          key={currentArticleIndividual.article_id}
        >
          <img
            src={currentArticleIndividual.article_img_url}
            alt="Article"
            className="img-article-card-homepage"
          />
          <div>
            <h3>{currentArticleIndividual.title}</h3>
            <h4>{currentArticleIndividual.topic}</h4>
            <p>{currentArticleIndividual.body}</p>
          </div>
        </div>
      ) : (
        <p>No article found</p>
      )}
    </>
  );
}
export default ArticleIndividual;
