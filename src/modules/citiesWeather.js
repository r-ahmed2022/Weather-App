/* eslint-disable no-undef */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import img from '../images/heart.png';
import popUp from './commentPopup.js';
import { Displaylikes, likeapi } from './likes.js';

const apiKey = '54a6527497256dd9bae8275602a3260a';
const likesUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/cuyuahQqhc46iVj8wwV2/likes';
const parent = document.getElementById('main-content');
const btn = document.getElementsByClassName('btn');
const popInfo = document.querySelector('.popUp');
const header = document.querySelector('.searchContainer');
const main = document.querySelector('.main-content');
const footer = document.querySelector('.footerContainer');
let nolikes = 0;
const getLikes = async () => {
  await fetch(likesUrl)
    .then((result) => result.json())
    .then((data) => {
      nolikes = data.length;
    });
  return nolikes;
};
nolikes = getLikes();
const otherCitiesWeather = async (city) => {
  const container = document.createElement('div');
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  await fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const { temp } = data.main;
      const place = data.name;
      const { description, icon } = data.weather[0];
      const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      // const fahrenheit = (temp * 9) / 5 + 32;
      container.setAttribute('class', 'city-weather');
      container.innerHTML = ` 
                   <div id="icondiv"><img id="imgdesc" src=${iconUrl}></div>
                    <div class="likediv">
                        <span class="info">${place}</span>
                        <img src=${img} class="likeimg"  id="likeimgs" data=${data.name}>
                     </div>
         <ul class="'currentinfo'">
              <li class="weatherinfo">Degree: ${temp}</li>
              <li class="weatherinfo">Weather: ${description}</li> 
              <li class="likes-item"><span class= "likes-qty" id="likes-qty" data="${data.name}">0</span> likes</li>
          </ul>
          
          <button type="button" id=${data.name} class="bg-success btn">Comment</button>
        </div>
      </div> `;
      parent.appendChild(container);
    });
  for (let i = 0; i < btn.length; i += 1) {
    btn[i].addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn[i].getAttribute('id');
      popUp(id);
      header.classList.add('hidden');
      main.classList.add('hidden');
      footer.classList.add('hidden');
      popInfo.classList.remove('hidden');
    });
  }

  const like = () => {
    const likebtns = document.getElementsByClassName('likeimg');
    const likebtnsarray = Array.from(likebtns);
    likebtnsarray.forEach((element) => {
      const likeId = element.getAttribute('data');
      element.addEventListener('click', () => {
        element.classList.add('heart-active');
        likeapi(likeId);
      });
    });
  };

  setTimeout(() => like(), 1000);
  Displaylikes();
};
export default otherCitiesWeather;