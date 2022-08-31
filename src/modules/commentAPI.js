const getComments = async () => {
  const commentCount = document.getElementById('recieved-comments');
  const submit = document.getElementById('submit');
  const commentContainer = document.getElementById('commentList');
  const id = submit.getAttribute('data');

  const get = () => fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/cuyuahQqhc46iVj8wwV2/comments?item_id=${id}`)
    .then((response) => response.json());

  const weatherComments = await get();

  commentCount.innerHTML = `${weatherComments.length > 0 ? `${weatherComments.length}` : 0}`;

  commentContainer.innerHTML = '';

  if (weatherComments.length > 0) {
    weatherComments.forEach((item) => {
      const li = document.createElement('li');
      li.innerHTML = `
            <p class="entered-comment"><span class="bold">${item.creation_date} - ${item.username}</span> : ${item.comment}</p>
            `;

      commentContainer.appendChild(li);
    });
  }
};

function postComment() {
  const userName = document.getElementById('userName');
  const userComment = document.getElementById('userComment');
  const submit = document.getElementById('submit');

  const post = (id, name, comment) => fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/cuyuahQqhc46iVj8wwV2/comments',
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(
        {
          item_id: id,
          username: name,
          comment,
        },
      ),
    })
    .then((res) => res.text());

  getComments();

  submit.addEventListener('click', async (e) => {
    e.preventDefault();

    const id = submit.getAttribute('data');
    const name = userName.value;
    const comment = userComment.value;
    alert.innerHTML = '';
    if (name !== '' && comment !== '') {
      userName.value = '';
      userComment.value = '';
      await post(id, name, comment)
        .then(() => getComments());
    }
  });
}

export default postComment;