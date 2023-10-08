import { useEffect, useState } from "react";
import ArticleVotesCard from "./ArticleVotesCard";
import { BiCommentDetail } from 'react-icons/bi'


export default function SingleArticleCard({ article }) {
  const [articleToDisplay, setArticleToDisplay] = useState({});
  

  useEffect(() => {
    setArticleToDisplay((articleToDisplay) => {
      const obj = {};
      for (const [key, value] of Object.entries(article)) {
        obj[key] = value;
      }
      return obj
    })
  }, [article]);


  return (
    <div key={articleToDisplay.article_id} className="article">

      <h3 className="articleTitle">
        {articleToDisplay.article_id}# {articleToDisplay.title}
      </h3>

      <img className="articleImg" src={articleToDisplay.article_img_url} alt="article-img" />

      <h5 className="articleAuthor">Posted By: {articleToDisplay.author}</h5>

      <p className="articleBody">{articleToDisplay.body}</p>

      <ArticleVotesCard
      article_id={articleToDisplay.article_id}
      votes={articleToDisplay.votes}
      />

      <span className="articleCommentCount">
        <BiCommentDetail/> {articleToDisplay.comment_count} Comments
      </span>

    </div>
  );
}
