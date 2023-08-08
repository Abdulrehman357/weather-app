
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
    document.querySelector(".feels-like").innerHTML = "RealFeel     "+Math.round(data.main.feels_like) + "°"
    document.querySelector(".pressure").innerHTML = "Pressure:  "+Math.round(data.main.pressure) + "Br"
    document.querySelector(".visibilty").innerHTML = "Visibilty:  "+data.visibility/1000 + "Km"
    console.log(data.sys.sunrise)
// convert unix time stamp to hours and minutes for sunrise
   const unixTimestamp = data.sys.sunrise;
   const sunrise = unixTimestamp *1000;
   const date = new Date(sunrise)
   const amOrPm = date.getHours() >= 12 ? 'PM' : 'AM';
    document.querySelector("#sunrise").innerHTML = "Sunrise:  "+ date.getHours() +":"+date.getMinutes() + "  "+amOrPm
    document.querySelector(".cloud-cover").innerHTML = "Cloud Cover:  "+data.clouds.all + "%"
   
 
 // convert unix time stamp to hours and minutes for sunset
 const unixTimestamp1 = data.sys.sunset;
 const sunset = unixTimestamp1 *1000;
 const dates = new Date(sunset)
 const amOrPms = date.getHours() >= 12 ? 'PM' : 'AM';
 
 document.querySelector(".sunset").innerHTML = "Sunset:  "+ dates.getHours() +":"+dates.getMinutes() + "  "+amOrPm
 
 
 
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

      const forecastData = data.list; 
      const forecastCardsContainer = document.getElementById('forecast-cards');
    
      forecastCardsContainer.innerHTML = ''; 
  

     
      const filteredForecast = forecastData.filter((forecast, index) => index % 1 === 0);

      filteredForecast.forEach(forecast => {
        const date = new Date(forecast.dt * 1000); 
        const temperature = forecast.main.temp;
        const weatherDescription = forecast.weather[0].description;
        const weatherIcon = forecast.weather[0].icon;

        const forecastCard = document.createElement('div');
        forecastCard.classList.add('forecast-card');

        const dateElement = document.createElement('h2');
        dateElement.textContent = date.toLocaleString('en-us', {weekday: 'long'});
        forecastCard.appendChild(dateElement);

        const timeElement = document.createElement('p');
        timeElement.textContent = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        forecastCard.appendChild(timeElement);

        const iconElement = document.createElement('img');
        
        iconElement.src = `https://openweathermap.org/img/wn/${weatherIcon}.png`;
        iconElement.alt = weatherDescription;
        forecastCard.appendChild(iconElement);


        const temperatureElement = document.createElement('p');
        temperatureElement.textContent = `${temperature} °C`;
        forecastCard.appendChild(temperatureElement);

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = weatherDescription;
        forecastCard.appendChild(descriptionElement);

        forecastCardsContainer.appendChild(forecastCard);
        document.querySelector(".alert").innerHTML =""
      });
       console.log(data);
      
     })
     .catch(error => {
       console.error('Error fetching forecast data:', error);
      
       document.querySelector(".alert").innerHTML = "Invalid City Name"
     });
 }

btnsearch.addEventListener("click", ()=>{
    getWeather(search.value)
    getWeatherForecast(search.value)
})

