/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import _ from 'lodash';
import './style.css';
import displayLocalWeather from './modules/displayData.js';
import otherCitiesWeather from './modules/citiesWeather.js';

const cities = ['Madrid', 'Addis Ababa', 'Delhi', 'Washington', 'London', 'Berlin', 'Sydney', 'Warsaw', 'Tokyo', 'Arendal'];
const search = document.querySelector('#search');
const apiKey = '54a6527497256dd9bae8275602a3260a';
const parent = document.getElementById('myModal');
const likeimage = document.getElementById('likeimg');
const span = document.getElementsByClassName('close')[0];
// eslint-disable-next-line no-var

window.addEventListener('load', async () => {
  displayLocalWeather();
  cities.forEach((cityName) => {
    otherCitiesWeather(cityName);
  });
  const count = document.getElementById('entries');
  count.innerHTML = '&nbsp;&nbsp;(';
  count.innerHTML += `${cities.length})`;
  search.addEventListener('click', (e) => {
    const cityName = document.getElementById('cityname').value;
    parent.style.display = 'block';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const { temp } = data.main;
        const place = data.name;
        const { description, icon } = data.weather[0];
        const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        // const fahrenheit = (temp * 9) / 5 + 32;
        parent.innerHTML = `
                                <div class="modal-content">
                                        <div class="modal-header">
                                            <span class="info">${place}</span>
                                            <span class="close">&times;</span>
                                        </div>
                                        <div class="modal-body" style="padding:40px 50px;">
                                                <div id="icondiv"><img id="imgdesc" src=${iconUrl}>
                                                </div>
                                                <ul class="currentinfo">
                                                    <li class="weatherinfo">Degree: ${temp}</li>
                                                    <li class="weatherinfo">Weather: ${description}</li>
                                                </ul>
                                        </div>
                       
                              </div>     
                `;
      });
  });
});
// eslint-disable-next-line no-multi-assign
window.onclick = (e) => {
  if (e.target === parent) {
    parent.style.display = 'none';
  }
};
