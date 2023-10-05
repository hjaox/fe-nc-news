import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../../../context/User";
import { deleteComment } from "../../../../lib/axios";
import CommentsVotesCard from "./CommentsVotesCard";

export default function CommentCard({comment}) {
    const {username} = useContext(UserContext);
    const [displayOptions, setDisplayOptions] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        if(username === comment.author) {
            setDisplayOptions(true)
        } else {
            setDisplayOptions(false)
        }
    },[username, displayOptions, isDeleted])

    function handleDeleteComment() {    
        setDeleting(true)    
        deleteComment(comment.comment_id)
        .then(() => {
            setIsDeleted(true)
            setDeleting(false)
        })
        .catch(err => {
            if(err.code === 'ERR_NETWORK') {
                alert('Deleting failed, check your internet connection')
            }
        })
    }
    
    return (
        <>
        {
            isDeleted
            ? 
            (<p>isDeleted...........</p>)
            :
            (
                <>
                
                <h4 className="commentAuthor">
                    By: {comment.author}
                </h4>
                <span className="commentCreatedAt">
                    {new Date(comment.created_at).toDateString()}
                </span>
                <p className="commentBody">
                    {comment.body}
                </p>
                {
                    displayOptions ? 
                    (
                        <>
                        {
                            
                            deleting ?
                            (<p>Deleting Comment......</p>)
                            :
                            (<span>
                                <button className="submitButton" onClick={() => handleDeleteComment()}>delete</button>
                            </span>)
                        }
                        </>
                    )
                    : 
                    (<CommentsVotesCard
                    votes={comment.votes}
                    comment_id={comment.comment_id}
                    />)

                }
                </>
            )
        }
        </>
    )
}