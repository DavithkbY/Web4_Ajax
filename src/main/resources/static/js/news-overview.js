window.onload = loadNews
function loadNews() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            const properties = ['id', 'title', 'content', 'author', 'createdAt'];
            const jsonResponse = JSON.parse(this.responseText)
            for (let r = 0; r < jsonResponse.length; r++) {
                let tr = document.createElement('tr');
                let row = jsonResponse[r];
                for (let i = 0; i < properties.length; i++) {
                    let td = document.createElement('td');
                    td.appendChild(document.createTextNode(row[properties[i]]));
                    tr.appendChild(td);
                }
                document.getElementById('table-body').appendChild(tr);
            }
        }
    };
    xhttp.open("GET", "http://localhost:8080/news", true);
    xhttp.send();
}