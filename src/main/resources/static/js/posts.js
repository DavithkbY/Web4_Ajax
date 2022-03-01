window.onload = loadNews
let length;

function loadNews() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            const container = document.getElementById('mainContainer')
            if (this.responseText.length !== length) {
                container.innerHTML = "";
                let data = JSON.parse(this.responseText)
                length = this.responseText.length
                data.forEach(post => {
                    container.innerHTML += getCard(post.title, post.content, post.createdAt, post.author)
                    container.innerHTML += getComments(post.id)
                })
            }
        }
    };
    xhttp.open("GET", "/posts", true);
    xhttp.send();
    setTimeout(loadNews, 2000);
}

function getCard(title, content, date, author) {
    const d = new Date(date).toLocaleDateString();
    return `
    <div class='card col-md-12 mb-3'>
        <div class='card-header'>${EntitiesHtml(title)}</div>
            <div class='card-body'>
                <p class='card-text'>${EntitiesHtml(content)}</p>
            </div>
            <div  class='card-footer text-muted'>
                <p class='float-start'>${d}</p>
                <p class='float-end'>${EntitiesHtml(author)}</p>
            </div>
        </div>
    `
}

function getComments(id) {
    let innerHTML = ""
    fetch(`/posts/${id}/comments`)
        .then(comments => {
            innerHTML += `
                <div class="row d-flex justify-content-end">
                    <div class="col-md-10 pb-3">
                        <h3 class="py-2">Comments</h3>
                `
            comments.forEach(comment => {
                const d = new Date(comment.createdAt).toLocaleDateString();
                innerHTML += `
                    <div class="card p-3 mb-2">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="user d-flex flex-row align-items-center"> 
                                <small class="fw-bold">Author</small>
                            </div> 
                            <small>${d}</small>
                        </div>
                        <small class="pt-2">${comment.text}</small>
                    </div>
            `
            })
            innerHTML += `
                <form class="py-2">
                    <div class="row mb-3">
                        <div class="col-sm-10" id="author">
                            <input type="text" class="form-control" id="inputAuthor" aria-describedby="authorHelp" placeholder="Enter author">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-10" id="text">
                            <textarea type="text" class="form-control" id="inputText" aria-describedby="contentHelp" placeholder="Enter comment" rows="2"></textarea>
                        </div>
                        <div class="col-md-2">
                            <button class="btn btn-primary" id="addCommentButton">Comment</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        `
        })
        .catch(error => {
            // handle the error
        });
    return innerHTML
}

const form = document.querySelector("form");
form.onsubmit = addNews.bind(form);
let addNewsRequest = new XMLHttpRequest();

function addNews(form) {

    //Remove errors
    const errors = document.querySelectorAll('.invalid-feedback');
    errors.forEach(error => {
        error.remove();
    });

    form.preventDefault();
    let author = document.getElementById("inputAuthor");
    let content = document.getElementById("inputContent");
    let title = document.getElementById("inputTitle");

    addNewsRequest.open("POST", "/posts", true);
    addNewsRequest.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    addNewsRequest.send(JSON.stringify({"author": author.value, "content": content.value, "title": title.value}));
    addNewsRequest.onreadystatechange = function () {
        if (addNewsRequest.readyState === XMLHttpRequest.DONE) {

            const responseText = JSON.parse(addNewsRequest.responseText);
            const status = responseText.status;
            if (status === 400) {
                for (let r = 0; r < responseText.errors.length; r++) {
                    const div = document.getElementById(responseText.errors[r].field);
                    div.innerHTML += '<div class="invalid-feedback d-block">' + responseText.errors[r].defaultMessage + '</div>'
                }
            } else {
                let res = JSON.parse(this.responseText)
                document.getElementById('mainContainer').innerHTML =
                    getCard(res.title, res.content, res.createdAt, res.author)
                    + document.getElementById('mainContainer').innerHTML
                author.value = '';
                content.value = '';
                title.value = '';
            }
        }
    }
}


function EntitiesHtml(string) {
    return String(string).replace(/&/g, '&amp;').replace(/>/g, '&gt;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}
