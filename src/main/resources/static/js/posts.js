window.onload = loadNews
let length;

function loadNews() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = async function () {
        if (this.readyState === 4 && this.status === 200) {
            const container = document.getElementById('mainContainer')
            if (this.responseText.length !== length) {
                let scrollPos = window.scrollY
                container.innerHTML = "";
                let data = JSON.parse(this.responseText)
                length = this.responseText.length
                for (const post of data) {
                    container.innerHTML += getCard(post.title, post.content, post.createdAt, post.author)
                    container.innerHTML += await getComments(post.id)
                }
                window.scrollTo(0, scrollPos)
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

function getComment(author, text, date) {
    const d = new Date(date).toLocaleDateString();
    return `
            <div class="card p-3 mb-2">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="user d-flex flex-row align-items-center"> 
                        <small class="fw-bold">${author}</small>
                    </div> 
                    <small>${d}</small>
                </div>
                <small class="pt-2">${text}</small>
            </div>
    `
}

async function getComments(id) {
    let response = await fetch(`/posts/${id}/comments`)
    let comments = JSON.parse(await response.text());
    let innerHTML = ""
    innerHTML += `
        <div class="row d-flex justify-content-end">
            <div class="col-md-10 pb-3" id="comments-${id}">
                <h3 class="py-2">Comments</h3>
        `
    comments.forEach(comment => {
        innerHTML += getComment(comment.author,comment.text,comment.createdAt)
    })
    innerHTML += `
            </div>
            <div class="col-md-10">
                <div class="py-2">
                    <div class="row mb-3">
                        <div class="col-sm-10" id="author-$id}">
                            <input name="author" type="text" class="form-control" id="inputAuthor-${id}" aria-describedby="authorHelp" placeholder="Enter author">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-10" id="text-${id}">
                            <textarea name="text" type="text" class="form-control" id="inputText-${id}" aria-describedby="contentHelp" placeholder="Enter comment" rows="2"></textarea>
                        </div>
                        <div class="col-md-2">
                            <button class="btn btn-primary" onclick="addComment(${id})">Comment</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>    
    `
    return innerHTML
}

const form = document.getElementById("addNewsForm")
form.onsubmit = addNews.bind(form);
let addNewsRequest = new XMLHttpRequest();

function addComment(id) {
    let author = document.getElementById(`inputAuthor-${id}`);
    let text = document.getElementById(`inputText-${id}`);
    fetch(`/posts/${id}/comments`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            author: author.value,
            text: text.value
        })
    }).then(response => response.json()).then(comment => {
        author.value = ''
        text.value = ''
        document.getElementById(`comments-${id}`).innerHTML += getComment(comment.author,comment.text,comment.createdAt)
    })
}

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
