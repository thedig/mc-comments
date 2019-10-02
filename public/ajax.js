
let ajaxCalls = (function() {
    return {
        postComment: async function (name, message) {
            let body = { name: name, message: message };
            const response = await fetch('/createComment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            return await response.json();
        },

        getComments: async function () {
            const response = await fetch('/getComments', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }

            });
            return await response.json()
        },

        getComment: async function (id) {
            const response = await fetch(`/getComment?id=${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return await response.json();
        },

        deleteComments: async function () {
            const response = await fetch('/deleteComments', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return await response.json();
        }
    };
})();
