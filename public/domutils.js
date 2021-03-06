
let domutils = (function() {

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

    return {
        newComment: function (ulEl, comment) {
            createAndAppendCommentEl(ulEl, comment);
        },
        clearChildren: function (listEl) {
            // Remove nodes from memory:
            while (listEl.firstChild) {
                listEl.removeChild(listEl.firstChild);
            }
        },
        addCommentsToDom: function(ulEl, comments) {
            comments.forEach(comment => {
                createAndAppendCommentEl(ulEl, comment);
            });
        },
        notifyUser: function(notification) {
            let notifyBanner = document.createElement('div');
            notifyBanner.setAttribute('id', 'notify-banner')
            notifyBanner.innerText = notification;
            let bodyEl = document.getElementsByTagName('body')[0];
            bodyEl.append(notifyBanner);
            setTimeout(function() {
                notifyBanner.remove();
            }, 2500);
        }
    }
})()

// window.domutils = domutils;