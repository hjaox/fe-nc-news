import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../../context/User"
import { deleteComment } from "../axios";

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
            console.log(err)
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
                <span className="commentVotes">
                    {comment.votes}
                </span>
                {
                    displayOptions ? 
                    (
                        <>
                        {
                            
                            deleting ?
                            (<p>Deleting Comment......</p>)
                            :
                            <span>
                                <button onClick={() => handleDeleteComment()}>delete</button>
                            </span>
                        }
                        </>
                    )
                    : ''
                }
                </>
            )
            
        }
        </>
    )
}