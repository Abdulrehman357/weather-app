
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
getWeather("Lahore");

btnsearch.addEventListener("click", ()=>{
    getWeather(search.value)
})