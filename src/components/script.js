export function resetCommentForm() {    
    const commentInputFormEle = document.getElementById('commentFormBody')
    const commentFormEle = document.getElementById('commentForm')
    commentFormEle.addEventListener('submit', e => {
        commentInputFormEle.value = '';
    })
}

export function resetCustomSearchForm() {
    const customSearchFormEle = document.getElementById('customSearchForm')
    const customSearchInputEle = document.getElementById('searchInput')
    customSearchFormEle.addEventListener('submit', e => {
        customSearchInputEle.value = '';
    })
}