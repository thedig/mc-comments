// console.log('This is the main entry point');


let comments = [];

setupInitialComments();
addCommentButtonSetup();


function addCommentButtonSetup() {
    document.getElementById('submit-comment').addEventListener('click', createComment);
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

async function setupInitialComments() {
    let onLoadComments = await getComments();
    comments = onLoadComments;
    addCommentsToDom(onLoadComments);
}

function newComment(comment) {
    // let comment = {name: name, message: message};
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

// AJAX calls

async function postComment(name, message) {
    let body = { name: name, message: message };
    const response = await fetch('/createComment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    return await response.json();
}

async function getComments() {
    const response = await fetch('/getComments', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }

    });
    return await response.json()
}

async function getComment(id) {
    const response = await fetch(`/getComment?id=${id}`, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }
    });
    return await response.json();
}