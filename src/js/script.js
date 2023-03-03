const searchButton = document.getElementById('searchButton');


searchButton.addEventListener('click', async () => {
  const getWeather = async (inputValue) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=metric&appid=${APIKey}`);

    return response.json();
  };

  const updateUI = (details) => {
    const container = document.querySelector('#weather-results');
    container.classList.remove('d-none');

    const weatherLocation = document.querySelector('#weather-location');
    weatherLocation.innerText = details.name;
    const weatherDescription = document.querySelector('#weather-situation');

    const detailWeather = details.weather[0];

    // Image change
    const imageWeather = document.querySelector('#image-weather');
    switch (detailWeather.main) {
      case 'Clear':
        imageWeather.src = 'src/img/clear.png';
        break;
      case 'Clouds':
        imageWeather.src = 'src/img/clouds.png';
        break;
      case 'Haze':
        imageWeather.src = 'src/img/mist.png';
        break;
      case 'Rain':
        imageWeather.src = 'src/img/rain.png';
        break;
      case 'Snow':
        imageWeather.src = 'src/img/snow.png';
        break;
      case 'Mist':
        imageWeather.src = 'src/img/mist.png';
    }

    weatherDescription.innerText = detailWeather.description;
    const wind = document.querySelector('#wind-speed');
    wind.innerText = `${parseFloat(details.wind.speed * 2.2369).toFixed(1)} mph`;
    const temperature = document.querySelector('#temp');
    temperature.innerText = `${parseFloat(details.main.temp).toFixed(1)}°C | ${parseFloat(details.main.temp * (9 / 5) + 32).toFixed(1)}°F`;
    const humid = document.querySelector('#humid');
    humid.innerText = `${details.main.humidity}%`;

    return container;
  };

  try {
    const inputKeyword = document.querySelector('#inputKeyword');
    const weather = await getWeather(inputKeyword.value);
    switch (weather.cod) {
      case '404':
        throw new Error(weather.message);
      case '400':
        throw new Error('Please write your location.');
    }
    updateUI(weather);
  } catch (e) {
    alert(e);
    // location.reload();
  }
});
