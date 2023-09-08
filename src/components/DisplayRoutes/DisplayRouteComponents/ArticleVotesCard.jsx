import { useEffect, useState } from "react";
import { patchArticleByVote } from "../axios";

export default function ArticleVotesCard({articleToDisplay, setArticleToDisplay, votes}) {
    
    const [voteCount, setVoteCount] = useState(0)
    const [isUpVoted, setIsUpVoted] = useState(false);
    const [upVoteStatus, setUpVoteStatus] = useState(false);
    const [isDownVoted, setIsDownVoted] = useState(false);
    const [downVoteStatus, setDownVoteStatus] = useState(false);

    useEffect(() => {
      setVoteCount(num => articleToDisplay.votes)
    },[articleToDisplay.votes, voteCount])

    function handleUpVote() {
      console.log(voteCount, 'line 17')
      if(isDownVoted) {
          downVote()
          .then(() => {
            console.log(voteCount, 'line 21')
            upVote()
          })
        } else {
          upVote()
        }
    }

    function upVote() {
      const updatedArticleVotes = { ...articleToDisplay };
        let plus = null;
        isUpVoted
          ? (updatedArticleVotes.votes--, setIsUpVoted(isUpVoted => false), (plus = false))
          : (updatedArticleVotes.votes++, setIsUpVoted(isUpVoted => true), (plus = true));
        // if(isUpVoted) {
        //   updatedArticleVotes.votes = currentVoteCount++;
        //   setIsUpVoted(false)
        //   plus = false
        // } else {
        //   updatedArticleVotes.votes = currentVoteCount--;
        //   setIsUpVoted(true)
        //   plus = true
        // }
        
        setArticleToDisplay(articleToDisplay => updatedArticleVotes);
        return patchArticleByVote(updatedArticleVotes, plus)
        .then(() => {
          upVoteStatus ? setUpVoteStatus(upVoteStatus => false) : setUpVoteStatus(upVoteStatus => true);
          setVoteCount(voteCount => updatedArticleVotes.votes)
          console.log(voteCount, 'line 50')
          // setVoteCount(updatedArticleVotes.votes)
          // return updatedArticleVotes.votes
        })
        .catch(err => {
            alert('Server Error')
        })
    }
    
    function handleDownVote() {
      if(isUpVoted) {
        upVote()
        .then(() => {
          downVote()
        })
      } else {
        downVote()
      }
    }

    function downVote() {
      const updatedArticleVotes = { ...articleToDisplay };
      let minus = null;
      isDownVoted
      ? (updatedArticleVotes.votes++, setIsDownVoted(isDownVoted => false), (minus = false))
      : (updatedArticleVotes.votes--, setIsDownVoted(isDownVoted => true), (minus = true));
      // if(isDownVoted) {
      //   updatedArticleVotes.votes = currentVoteCount++;
      //   setIsDownVoted(false);
      //   minus = false;
      // } else {
      //   updatedArticleVotes.votes = currentVoteCount--;
      //   setIsDownVoted(true)
      //   minus = true
      // }
      setArticleToDisplay(articleToDisplay => updatedArticleVotes);
      return patchArticleByVote(updatedArticleVotes, !minus)
      .then(() => {
        downVoteStatus ? setDownVoteStatus(downVoteStatus => false) : setDownVoteStatus(downVoteStatus => true);
        setVoteCount(voteCount => updatedArticleVotes.votes)
        // setVoteCount(updatedArticleVotes.votes)
        // return updatedArticleVotes.votes
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