let { newComment, clearChildren } = domutils;

(function testNewComment() {
    let element = document.createElement('div');
    element.setAttribute('id', 'comment-list');
    newComment(element, {id: 1, message: 'hello there', name: 'myself'});

    let result = element.firstChild.innerText.includes('hello there');
    addTestObj(`successfully appends: ${result}`);
    element.remove();
})();

(function testClearChildren() {
    let element = document.createElement('div');
    element.setAttribute('id', 'comment-list');
    newComment(element, { id: 1, message: 'hello there', name: 'myself' });
    newComment(element, { id: 2, message: 'goodbye', name: 'myself' });

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
