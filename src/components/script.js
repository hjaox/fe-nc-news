export function resetCommentForm() {    
    const commentInputFormEle = document.getElementById('commentFormBody')
    const commentFormEle = document.getElementById('commentForm')
    commentFormEle.addEventListener('submit', e => {
        commentInputFormEle.value = '';
    })
}

