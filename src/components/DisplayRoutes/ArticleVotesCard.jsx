import { useState } from "react";
import { patchArticleByVote } from "./axios";

export default function ArticleVotesCard({articleToDisplay, setArticleToDisplay}) {
    const [isUpVoted, setIsUpVoted] = useState(false);
    const [upVoteStatus, setUpVoteStatus] = useState(false);
    const [isDownVoted, setIsDownVoted] = useState(false);
    const [downVoteStatus, setDownVoteStatus] = useState(false);

    function handleUpVote() {
        const updatedArticleVotes = { ...articleToDisplay };
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
        let minus = null;
        isDownVoted
        ? (updatedArticleVotes.votes++, setIsDownVoted(false), (minus = false))
        : (updatedArticleVotes.votes--, setIsDownVoted(true), (minus = true));
        setArticleToDisplay(updatedArticleVotes);
        patchArticleByVote(updatedArticleVotes, !minus)
        .then(() => {
        downVoteStatus ? setDownVoteStatus(false) : setDownVoteStatus(true);
        })
        .catch(err => {
        alert('Server Error')
        })
    }

    return (
        <span className="articleVotes">
        <div className="voteCount">
          {articleToDisplay.votes}
        </div>
        <button
          className={`upVoteBtn ${upVoteStatus ? "active" : ""}`}
          onClick={() => handleUpVote()}
        >
          ↑
        </button>
        <button
          className={`downVoteBtn ${downVoteStatus ? "active" : ""}`}
          onClick={() => handleDownVote()}
        >
          ↓
        </button>
      </span>
    )
}