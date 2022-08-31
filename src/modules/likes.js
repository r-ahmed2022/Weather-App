const Displaylikes = async () => {
  const likeditems = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/cuyuahQqhc46iVj8wwV2/likes')
    .then((response) => response.json())
    .then((data) => data);

  const likesnumber = document.getElementsByClassName('likes-qty');
  const likebtnsarray = Array.from(likesnumber);
  likebtnsarray.forEach((element) => {
    const likeId = element.getAttribute('data');
    const currentSpan = element;
    likeditems.forEach((e) => {
      if (likeId === e.item_id) {
        currentSpan.innerHTML = e.likes;
      }
    });
  });
};

const likeapi = async (itemid) => {
  console.log(itemid);
  await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/cuyuahQqhc46iVj8wwV2/likes', {
    method: 'POST',
    body: JSON.stringify({
      item_id: itemid,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then(() => {
      Displaylikes();
    });
};

export { Displaylikes, likeapi };
