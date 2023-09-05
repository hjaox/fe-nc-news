import { useEffect, useState } from "react";
import { patchArticleByVote } from "./axios";

export default function ArticleCard({ article }) {
  const [articleToDisplay, setArticleToDisplay] = useState({});
  const [isUpVoted, setIsUpVoted] = useState(false);
  const [upVoteStatus, setUpVoteStatus] = useState(false);
  const [isDownVoted, setIsDownVoted] = useState(false);
  const [downVoteStatus, setDownVoteStatus] = useState(false);

  useEffect(() => {
    setArticleToDisplay((articleToDisplay) => {
      const obj = {};
      for (const [key, value] of Object.entries(article)) {
        obj[key] = value;
      }
      return obj;
    });
  }, [article]);

  function handleUpVote() {
    const updatedArticleVotes = { ...articleToDisplay };
    console.log(articleToDisplay.votes, 'up before')
    let plus = null;
    isUpVoted
      ? (updatedArticleVotes.votes--, setIsUpVoted(false), (plus = false))
      : (updatedArticleVotes.votes++, setIsUpVoted(true), (plus = true));      
    setArticleToDisplay(updatedArticleVotes);
    patchArticleByVote(updatedArticleVotes, plus)
    .then(() => {
      upVoteStatus ? setUpVoteStatus(false) : setUpVoteStatus(true);
    })
    .catch(err => {
        alert('Server Error')
      })
  }

  function handleDownVote() {
    const updatedArticleVotes = { ...articleToDisplay };
    console.log(articleToDisplay.votes, 'down')
    let minus = null;

  isDownVoted
    ? (updatedArticleVotes.votes++, setIsDownVoted(false), (minus = false))
    : (updatedArticleVotes.votes--, setIsDownVoted(true), (minus = true));
  setArticleToDisplay(updatedArticleVotes);
  patchArticleByVote(updatedArticleVotes, !minus)
  .then(() => {
    console.log()
    downVoteStatus ? setDownVoteStatus(false) : setDownVoteStatus(true);
  })
  .catch(err => {
    alert('Server Error')
  })
  }

  return (
    <div key={articleToDisplay.article_id} className="article">
      <h3 className="articleTitle">{articleToDisplay.title}</h3>
      <img className="articleImg" src={articleToDisplay.article_img_url} alt="article-img" />
      <h5 className="articleAuthor">By: {articleToDisplay.author}</h5>
      <p className="articleBody">{articleToDisplay.body}</p>
      <span className="articleVotes">
        {articleToDisplay.votes}
        <button
          className={`upVoteBtn ${upVoteStatus ? "active" : ""}`}
          onClick={() => handleUpVote()}
        >
          UpVoteButton
        </button>
        <button
          className={`downVoteBtn ${downVoteStatus ? "active" : ""}`}
          onClick={() => handleDownVote()}
        >
          DownVoteButton
        </button>
      </span>
      <span className="articleCommentCount">{articleToDisplay.comment_count}</span>
    </div>
  );
}
