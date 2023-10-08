import { useEffect, useState } from "react";
import { patchCommentByVote } from "../../../../lib/axios";
import { AiOutlineDislike,AiOutlineLike,AiFillLike,AiFillDislike } from 'react-icons/ai'

export default function CommentsVotesCard({votes, comment_id}) {
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
      patchCommentByVote(comment_id, plus)
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
      patchCommentByVote(comment_id, true, true)
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
      patchCommentByVote(comment_id, !minus)
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
      patchCommentByVote(comment_id, false, true)
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
        <span className="commentVotes">        
        {
          isUpVoted ? (
            <AiFillLike className='upVoteBtn--filled'
            onClick={() => handleUpVote()}/>
          ) : (
            <AiOutlineLike className='upVoteBtn'
            onClick={() => handleUpVote()}/>
          )
        }
        <div className="voteCount">
          {voteCount}
        </div>
        {
          isDownVoted ? (
            <AiFillDislike className='downVoteBtn--filled'
            onClick={() => handleDownVote()}/>
          ) : (
            <AiOutlineDislike className='downVoteBtn'
            onClick={() => handleDownVote()}/>
          )
        }
      </span>
    )
}