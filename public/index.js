// console.log('This is the main entry point');

let { 
    postComment,
    getComments,
    getComment,
    deleteComments 
// } = window.ajaxCalls;
} = ajaxCalls;

let { 
    newComment,
    clearChildren,
    addCommentsToDom,
    notifyUser 
} = domutils;

let comments = [];

setupInitialComments();
addCommentButtonSetup();
clearCommentsButtonSetup();

async function setupInitialComments() {
    try {
        let onLoadComments = await getComments();
        comments = onLoadComments;
        const ulEl = document.getElementById('comment-list');
        addCommentsToDom(ulEl, onLoadComments);
    } catch(e) {
        console.error(e);
    }
}

function addCommentButtonSetup() {
    document.getElementById('submit-comment').addEventListener('click', createComment);
}

function clearCommentsButtonSetup() {
    document.getElementById('clear-comments').addEventListener('click', clearComments);
}



// Handlers:

async function createComment() {
    let name = document.getElementById('comment-name').value;
    let message = document.getElementById('comment-body').value;
    if (name.length > 0 && message.length > 0) {
        try {
            let commentId = await postComment(name, message);
            let comment = await getComment(commentId.id);
            const ulEl = document.getElementById('comment-list');
            newComment(ulEl, comment);
            document.getElementById('comment-name').value = '';
            document.getElementById('comment-body').value = '';
            notifyUser(`New comment added: ${comment.message}, by ${comment.name}`);
            // Maintaining local store
            comments = [ ...comments, comment];
        } catch(e) {
            console.error(e);
        }
    }
}

async function clearComments() {
    try {
        let response = await deleteComments();
        const ulEl = document.getElementById('comment-list');
        clearChildren(ulEl);
    } catch(e) {
        console.error(e);
    }
}

