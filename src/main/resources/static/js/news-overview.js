window.onload = loadNews
function loadNews() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        let jsonResponse = null;
        if (this.readyState === 4 && this.status === 200) {
            const container = document.getElementById('mainContainer')
            if(JSON.parse(this.responseText) != jsonResponse){
                container.innerHTML = "";
                jsonResponse = JSON.parse(this.responseText)
                for (let r = 0; r < jsonResponse.length; r++) {
                    const date = new Date(jsonResponse[r].createdAt).toLocaleDateString();
                    container.innerHTML += "<div class='card text-center col-md-12 mb-3'>\n" +
                        "            <div class='card-header'>"+jsonResponse[r].title+"</div>\n" +
                        "            <div class='card-body'>\n" +
                        "                <p class='card-text'>"+jsonResponse[r].content+"</p>\n" +
                        "            </div>\n" +
                        "            <div  class='card-footer text-muted'>" +
                        "               <p class='float-start'>"+date+"</p>" +
                        "               <p class='float-end'>"+jsonResponse[r].author+"</p>"+
                        "            </div>\n" +
                        "        </div>"
                }
            }
        }
    };
    xhttp.open("GET", "http://localhost:8080/news", true);
    xhttp.send();

    const form = document.querySelector("form");
    form.onsubmit = addNews.bind(form);



    let addNewsRequest = new XMLHttpRequest();

    function addNews (form) {
        const errors = document.querySelectorAll('.alert-danger');
        errors.forEach(error => {
            error.remove();
        });
        form.preventDefault();
        let author = document.getElementById("inputAuthor").value;
        let content = document.getElementById("inputText").value;
        let title = document.getElementById("inputTitle").value;
        addNewsRequest.open("POST", "/news", true);
        addNewsRequest.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        addNewsRequest.send(JSON.stringify({ "author": author, "content": content,"title":title }));
        addNewsRequest.onreadystatechange = function() {
            if (addNewsRequest.readyState == XMLHttpRequest.DONE) {

                const responseText = JSON.parse(addNewsRequest.responseText);
                const status = responseText.status;
                if(status == 400){
                    console.log(responseText.errors.length)
                    for (let r = 0; r < responseText.errors.length; r++) {
                        const div = document.getElementById(responseText.errors[r].field);
                        div.innerHTML += "<div class=\"alert alert-danger\" role=\"alert\">\n"+responseText.errors[r].defaultMessage +
                            "</div>"
                    }
                }
            }}
    }
}