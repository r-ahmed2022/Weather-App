const apiKey = '54a6527497256dd9bae8275602a3260a';
const displayLocalWeather = async () => {
  let lat;
  let lon;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          const { temp } = data.main;
          const place = data.name;
          const { description, icon } = data.weather[0];
          const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
          // const fahrenheit = (temp * 9) / 5 + 32;
          const container = document.getElementById('weather-card');
          container.innerHTML = `<div id="icondiv"><img id="imgdesc" src=${iconUrl}></div> `;
          const desc = document.createElement('span');
          desc.setAttribute('class', 'info');
          desc.innerHTML = place;
          const icondiv = document.getElementById('icondiv');
          icondiv.append(desc);
          const list = document.createElement('ul');
          list.setAttribute('class', 'currentinfo');
          list.innerHTML = `<li class="weatherinfo">Degree: ${temp}</li>
                            <li class="weatherinfo">Weather: ${description}</li> `;
          container.append(list);
        });
    });
  }
};

export default displayLocalWeather;