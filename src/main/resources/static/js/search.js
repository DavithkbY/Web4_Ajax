

function getRandomLectorAxios() {
    axios.get('/Controller?command=Random')
        .then(response => showRandomLector(response.data))
        .then(() => setTimeout(getRandomLectorAxios,5000))
}


async function searchComment(){
    let author = document.getElementById("inputSearch").value;
    let tableContainer = document.getElementById("tableContainer");
    tableContainer.innerHTML = "";
    if(!isEmpty(author)){
        const response = await axios.get(`/comments/${author}/comments`);
        const comments = await response.data;
        let commentsHTML = "";
        if(!comments || comments.length == 0){
            commentsHTML += `<div class="alert alert-danger" role="alert">
                          No comments found
                        </div>`
        }else{
            commentsHTML += `<table class="table">
                              <thead>
                                <tr>
                                  <th scope="col">Comment</th>
                                  <th scope="col">Date</th>
                                </tr>
                              </thead>
                              <tbody>`;
            for (const comment of comments) {
                const commentDate = new Date(comment.createdAt);
                const commentDateFormatted = getFormattedDate(commentDate);

                commentsHTML+=` <tr>
                                  <th scope="row">${comment.text}</th>
                                  <td>${commentDateFormatted}</td>
                                </tr>`;
            }
            commentsHTML += `  </tbody>
                            </table>`;
        }
        tableContainer.innerHTML += commentsHTML;
    }

}
function getFormattedDate(date) {
    let year = date.getFullYear()
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');

    return day + '/' + month + '/' + year;
}

function isEmpty(str) {
    return !str.trim().length;
}