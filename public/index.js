// console.log('This is the main entry point');

let { postComment, getComments, getComment, deleteComments } = window.ajaxCalls;

let comments = [];

setupInitialComments();
addCommentButtonSetup();
clearCommentsButtonSetup();

function addCommentButtonSetup() {
    document.getElementById('submit-comment').addEventListener('click', createComment);
}

function clearCommentsButtonSetup() {
    document.getElementById('clear-comments').addEventListener('click', clearComments);
}

async function createComment() {
    let name = document.getElementById('comment-name').value;
    let message = document.getElementById('comment-body').value;
    if (name.length > 0 && message.length > 0) {
        try {
            let commentId = await postComment(name, message);
            let comment = await getComment(commentId.id);
            newComment(comment);
            document.getElementById('comment-name').value = '';
            document.getElementById('comment-body').value = '';
        } catch(e) {
            console.error(e);
        }
    }
}

async function clearComments() {
    try {
        let response = await deleteComments();
        console.log(response);
        clearDOMComments();
    } catch(e) {
        console.error(e);
    }
}

async function setupInitialComments() {
    let onLoadComments = await getComments();
    comments = onLoadComments;
    addCommentsToDom(onLoadComments);
}

function clearDOMComments() {
    const ulEl = document.getElementById('comment-list');
    // Remove nodes from memory:
    while (ulEl.firstChild) {
        ulEl.removeChild(ulEl.firstChild);
    }
}

function newComment(comment) {
    const ulEl = document.getElementById('comment-list');
    createAndAppendCommentEl(ulEl, comment);
}

function addCommentsToDom(comments) {
    const ulEl = document.getElementById('comment-list');
    ulEl.setAttribute('class', 'comment-list');
    comments.forEach(comment => {
        createAndAppendCommentEl(ulEl, comment);
    });
}

function createAndAppendCommentEl(listEl, comment) {
    const commEl = document.createElement('li');
    commEl.setAttribute('id', `comment_${comment.id}`);
    commEl.setAttribute('class', 'comment');

    const bodyDiv = document.createElement('div');
    bodyDiv.setAttribute('class', 'comment__body');
    bodyDiv.innerText = `${comment.message}`;
    commEl.append(bodyDiv);

    const infoDiv = document.createElement('div');
    infoDiv.setAttribute('class', 'comment__info');
    infoDiv.innerText = `${comment.name} on ${comment.created}`;
    commEl.append(infoDiv);

    listEl.append(commEl);
}
