console.log('This is the main entry point');


const comments = [];

async function prePopComments() {
    
    // let comments = [
    //     { id: 1, name: 'test', created: Date.now(), message: 'test text 123' },
    //     { id: 2, name: 'test2', created: Date.now() + 1000, message: 'test text 456789' }
    // ];

    let onLoadComments = await getComments();
    
    // getComment(2);

    // try {
        // const data = await getComment('http://example.com/answer', { id: 4 });
    // const oneComment = await getComment(4);
    // console.log(JSON.stringify(oneComment)); // JSON-string from `response.json()` call
    // } catch (error) {
    //     console.error(error);
    // }

    console.log(onLoadComments);

    // addCommentsTo
    addCommentsToDom(onLoadComments);

    // console.log(JSON.parse(onLoadComments));
}

prePopComments();

function addCommentsToDom(comments) {
    const ulEl = document.getElementById('comment-list');
    ulEl.setAttribute('class', 'comment-list');
    // comments.forEach(comment => {
    //     const commEl = document.createElement('li');
    //     commEl.innerText = `${comment.message}`;
    //     ulEl.append(commEl);
    // });
    comments.forEach(comment => {
        createCommentObj(ulEl, comment);
    });

}

function createCommentObj(listEl, comment) {
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
