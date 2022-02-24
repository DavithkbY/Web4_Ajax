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
                for (let r = 0; r < data.length; r++) {
                    container.innerHTML += getCard(data[r].title, data[r].content, data[r].createdAt, data[r].author)
                }
            }
        }
    };
    xhttp.open("GET", "/posts", true);
    xhttp.send();
    setTimeout(loadNews, 2000);
}

function getCard(title, content, date, author) {
    const d = new Date(date).toLocaleDateString();
    return "<div class='card col-md-12 mb-3'>\n" +
        "            <div class='card-header'>" + EntitiesHtml(title)+ "</div>\n" +
        "            <div class='card-body'>\n" +
        "                <p class='card-text'>" + EntitiesHtml(content) + "</p>\n" +
        "            </div>\n" +
        "            <div  class='card-footer text-muted'>" +
        "               <p class='float-start'>" + d + "</p>" +
        "               <p class='float-end'>" + EntitiesHtml(author) + "</p>" +
        "            </div>\n" +
        "        </div>"
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
