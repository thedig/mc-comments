let { createAndAppendCommentEl, clearChildren } = window.domutils;


(function testCreateAndAppendCommentEl() {
    let element = document.createElement('div');
    element.setAttribute('id', 'comment-list');
    createAndAppendCommentEl(element, {id: 1, message: 'hello there', name: 'myself'});

    let result = element.firstChild.innerText.includes('hello there');
    addTestObj(`successfully appends: ${result}`);
    element.remove();
})();

(function testClearChildren() {
    let element = document.createElement('div');
    element.setAttribute('id', 'comment-list');
    createAndAppendCommentEl(element, { id: 1, message: 'hello there', name: 'myself' });
    createAndAppendCommentEl(element, { id: 2, message: 'goodbye', name: 'myself' });

    clearChildren(element);

    let result = !element.firstChild;
    addTestObj(`successfully removes all: ${result}`);
    element.remove();
})();



function addTestObj(result) {
    let element = document.createElement('div');
    element.innerText = result;
    let output = document.getElementById('test-output');
    output.append(element);
}
