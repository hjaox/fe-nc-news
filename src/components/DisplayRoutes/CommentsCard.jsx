export default function CommentsCard(comment) {
    return (
        <div key={comment.comment_id} className="comment">
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
        </div>
    )
}