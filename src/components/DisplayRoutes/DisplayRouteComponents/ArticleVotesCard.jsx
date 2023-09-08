import { useEffect, useState } from "react";
import { patchArticleByVote } from "../axios";

export default function ArticleVotesCard({votes, article_id}) {
    
    const [voteCount, setVoteCount] = useState(votes)
    const [isUpVoted, setIsUpVoted] = useState(false);
    const [isDownVoted, setIsDownVoted] = useState(false);

    useEffect(() => {
    }, [voteCount])

    function handleUpVote() {
      if(isDownVoted) {
        upVoteFromDownVote()
        } else {
          upVote()
        }
    }

    function upVote() {
      let updatedVoteCount = voteCount;
      let plus = null;
      isUpVoted
        ? (updatedVoteCount--, setIsUpVoted(() => false), (plus = false))
        : (updatedVoteCount++, setIsUpVoted(() => true), (plus = true));
      patchArticleByVote(article_id, plus)
      .then(() => {
        setVoteCount(() => updatedVoteCount)
      })
      .catch(err => {
        alert('Failed to vote, please check your internet connection')
      })
    }

    function upVoteFromDownVote() {
      let updatedVoteCount = voteCount;
      updatedVoteCount += 2;
      patchArticleByVote(article_id, true, true)
      .then(() => {
        setIsDownVoted(() => false);
        setIsUpVoted(() => true);
        setVoteCount(() => updatedVoteCount)
      })
      .catch(err => {
          alert('Failed to vote, please check your internet connection')
      })
    }
     
    function handleDownVote() {
      if(isUpVoted) {
        downVoteFromUpVote()
      } else {
        downVote()
      }
    }

    function downVote() {
      let updatedVoteCount = voteCount;
      let minus = null;
      isDownVoted
      ? (updatedVoteCount++, setIsDownVoted(() => false), (minus = false))
      : (updatedVoteCount--, setIsDownVoted(() => true), (minus = true));
      patchArticleByVote(article_id, !minus)
      .then(() => {
        setVoteCount(() => updatedVoteCount)
      })
      .catch(err => {
        alert('Failed to vote, please check your internet connection')
      })
    }

    function downVoteFromUpVote() {
      let updatedVoteCount = voteCount;
      updatedVoteCount -= 2;
      patchArticleByVote(article_id, false, true)
      .then(() => {
        setIsDownVoted(() => true)
        setIsUpVoted(() => false)
        setVoteCount(() => updatedVoteCount)
      })
      .catch(err => {
      alert('Failed to vote, please check your internet connection')
      })
    }

    return (
        <span className="articleVotes">
        <div className="voteCount">
          {voteCount}
        </div>
        <button
          className={`upVoteBtn ${isUpVoted ? "active" : ""}`}
          onClick={() => handleUpVote()}
        >
          ↑
        </button>
        <button
          className={`downVoteBtn ${isDownVoted ? "active" : ""}`}
          onClick={() => handleDownVote()}
        >
          ↓
        </button>
      </span>
    )
}