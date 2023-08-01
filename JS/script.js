
const apiKey = "87d7550439f8da25964eb607c34f6fd0"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="


const search = document.querySelector(".search")
const btnsearch = document.querySelector(".btn-search")

const weatherIcon = document.querySelector(".weather-icon")
async function getWeather(city){

    const response = await fetch(apiUrl + city  + `&appid=${apiKey}`)
    var data = await response.json() 
    document.querySelector(".city").innerHTML = data.name
    document.querySelector(".temprature").innerHTML = Math.round(data.main.temp) + "°C"
    document.querySelector(".humidity").innerHTML = Math.round(data.main.humidity) + "%"
    document.querySelector(".wind").innerHTML = Math.round(data.wind.speed)+"km/h"
    document.querySelector(".description").innerHTML = data.weather[0].description

 if(data.weather[0].main == "Clear"){
    weatherIcon.src = "../Assets/images/clear.png"
 }
 else if(data.weather[0].main == "Clouds"){
    weatherIcon.src = "../Assets/images/clouds.png"
 }
 else if(data.weather[0].main == "Rain"){
    weatherIcon.src = "../Assets/images/rain.png"
 }
 else if(data.weather[0].main == "Drizzle"){
    weatherIcon.src = "../Assets/images/drizzle.png"
 }
 else if(data.weather[0].main == "Mist"){
    weatherIcon.src = "../Assets/images/mist.png"
 }
 else if(data.weather[0].main == "Snow"){
    weatherIcon.src = "../Assets/images/snow.png"
 }
 
}
// getWeather("Lahore");



function getWeatherForecast(city) {

   const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?units=metric&q=${city}&appid=${apiKey}`;
 
   fetch(apiUrl)
     .then(response => response.json())
     .then(data => {
      const forecastData = data.list; // Array of forecast objects for 3-hour intervals
      const forecastCardsContainer = document.getElementById('forecast-cards');
         // console.log(forecastData)
      forecastCardsContainer.innerHTML = ''; 
  

     
      const filteredForecast = forecastData.filter((forecast, index) => index % 1 === 0);

      filteredForecast.forEach(forecast => {
        const date = new Date(forecast.dt * 1000); // Convert timestamp to Date object
        const temperature = forecast.main.temp;
        const weatherDescription = forecast.weather[0].description;
        const weatherIcon = forecast.weather[0].icon;

        const forecastCard = document.createElement('div');
        forecastCard.classList.add('forecast-card');

        const dateElement = document.createElement('h2');
        dateElement.textContent = date.toLocaleDateString();
        forecastCard.appendChild(dateElement);

        const timeElement = document.createElement('p');
        timeElement.textContent = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        forecastCard.appendChild(timeElement);

        const iconElement = document.createElement('img');
        iconElement.src = `https://openweathermap.org/img/wn/${weatherIcon}.png`;
        iconElement.alt = weatherDescription;
        forecastCard.appendChild(iconElement);

        const temperatureElement = document.createElement('p');
        temperatureElement.textContent = `Temperature: ${temperature} °C`;
        forecastCard.appendChild(temperatureElement);

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = weatherDescription;
        forecastCard.appendChild(descriptionElement);

        forecastCardsContainer.appendChild(forecastCard);
      });
       console.log(data);
      
     })
     .catch(error => {
       console.error('Error fetching forecast data:', error);
     });
 }

btnsearch.addEventListener("click", ()=>{
    getWeather(search.value)
    getWeatherForecast(search.value)
})