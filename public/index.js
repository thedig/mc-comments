// console.log('This is the main entry point');


let comments = [];

setupInitialComments();
// newComment('dig', 'I like ice cream');
// newComment('dig2', 'I love pizza');
addCommentButtonSetup();


function addCommentButtonSetup() {
    document.getElementById('submit-comment').addEventListener('click', function (e) {
        // var element = e.target;
        // // do anything you want with the element clicked
        // console.log(element);
        let name = document.getElementById('comment-name').value;
        let message = document.getElementById('comment-body').value;
        // debugger;
        if (name.length > 0 && message.length > 0) {
            newComment(name, message);
            document.getElementById('comment-name').value = '';
            document.getElementById('comment-body').value = '';
        }
    });

}

// document.addEventListener('click', function (e) {
//     var element = e.target;
//     // do anything you want with the element clicked
//     console.log(element);
// });

async function setupInitialComments() {
    let onLoadComments = await getComments();
    comments = onLoadComments;
    addCommentsToDom(onLoadComments);
}

function newComment(name, message) {
    let comment = {name: name, message: message};
    let dt = new Date();
    comment.created = `${dt.getFullYear()}-${dt.getMonth()}-${dt.getDate()} ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`;
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

// function getComments() {
//     let xhr = new XMLHttpRequest();
//     xhr.open('GET', '/getComments');
//     xhr.onload = function (e) {
//         console.log(e, xhr);
//         if (xhr.status === 200) {
//             console.log('success: ' + xhr.responseText);
//         } else {
//             console.log('failure: ' + xhr.responseText);
//         }
//     };
//     xhr.send();
// }

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
    console.log(response);
    return await response.json(); // parses JSON response into native JavaScript objects
}
