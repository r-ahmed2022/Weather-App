import cimg from '../images/close.png';
import postComment from './commentAPI.js';

const apiKey = '54a6527497256dd9bae8275602a3260a';
const popInfo = document.querySelector('.popUp');
const header = document.querySelector('.searchContainer');
const main = document.querySelector('.main-content');
const footer = document.querySelector('.footerContainer');

const popUp = async (id) => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${id}&appid=${apiKey}&units=metric`;
  await fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const result = data.name.localeCompare(id, undefined, { sensitivity: 'base' });
      const { icon } = data.weather[0];
      if (result === 0) {
        popInfo.innerHTML = `
          <div class="popupContainer">
          <div class="close-button">
          <img src=${cimg} class="likeimg" id="closeimg">
          </div>
          <h2>The Weather Forecast in ${data.name}</h2>
          <div class="weather-pic">
           <img src="http://openweathermap.org/img/wn/${icon}@4x.png" alt="${data.weather.main}">
          </div>
       <div class="country">
        <p>Country: ${data.name}
        <p>Symbol: ${data.sys.country}</p>
        </p>
        </div>
        <div class="temperature">
        <p>Min-Temperture: ${data.main.temp_min}
        <p>Max-Temperature: ${data.main.temp_max}</p>
        </p>
        </div>
        <div class="pressure">
        <p>Pressure: ${data.main.pressure}
        <p>Humidity: ${data.main.humidity}</p>
        </p>
        </div>

        <div class="comments-container">
        <h2>Comments <span id="recieved-comments">0</span></h2>
        <ul id="commentList">
        </ul>
        </div>

        <div class="comment-form">
        <h2>Add Comment</h2>
        <form action="POST" class="form">
        <input name="name" id="userName" placeholder="Your Name" required> <br>
        <textarea name="comment" id="userComment" placeholder="Your Insight" required rows="5" cols="20"></textarea> <br>
        <button id="submit" data=${data.name} type="submit">Submit</button>
        </form>
        </div>
        </div>
        </div>
       `;
      }
      postComment();
    });

  const close = document.querySelector('.close-button');
  close.addEventListener('click', () => {
    popInfo.classList.add('hidden');
    header.classList.remove('hidden');
    main.classList.remove('hidden');
    footer.classList.remove('hidden');
  });
};

export default popUp;