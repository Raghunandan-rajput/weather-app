const api_key = `9824e5109120c16f9707e2d56a77cfe3`
const form = document.querySelector('form')
const search = document.querySelector('#search')
const weather = document.querySelector('#weather')
const col_main = document.querySelector('.col-main')
const maintag=document.querySelector('main')
const getdata = async (city) => {
    weather.innerHTML = `<h2> Loading.... </h2>`
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    return showWeather(data)
}
const showWeather = (data) => {
    if (data.cod == "404") {
        weather.innerHTML = `<h2>City Not Found </h2>`
        return;
    }
    maintag.style.backgroundImage=`url("https://source.unsplash.com/random/900×700/?${data.weather[0].description}")`
    weather.innerHTML = `<div>
                                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather image" width="90px">
                        </div>
                         <div>
                            <h2>${data.main.temp}℃</h2>
                            <h4>${data.weather[0].main}</h4>
                        </div>`
    col_main.innerHTML = `<div class="col">
                <div class="top-h" style="text-align: center;"> 
                     <h4 id="heading">Temperature</h4>
                     <h3>${data.main.temp}℃</h3>
                     <p>Description is ${data.weather[0].description}</p>
                     <p>Min Temperature is ${data.main.temp_min}</p>
                     <p>Max Temperature is ${data.main.temp_max}</p>
                </div>
            </div>
            <div class="col">
                <div class="top-h" style="text-align: center;"> 
                     <h4 id="heading">Humidity Info</h4>
                     <h3>${data.main.humidity}%</h3>
                     <p>Wind Degree is ${data.wind.deg}</p>
                     <p>Feels Like is ${data.main.feels_like}</p>
                     <p>Humidity is ${data.main.humidity}</p>
                </div>
            </div>
            <div class="col">
                <div class="top-h" style="text-align: center;"> 
                     <h4 id="heading">Wind Info</h4>
                     <h3>${data.wind.speed} Km/hr</h3>
                     <p>Wind speed is ${data.wind.speed}</p>
                     <p>Sunrise Time is ${data.sys.sunrise}</p>
                     <p>sunset Time is ${data.sys.sunset}</p>
                </div>
            </div>`
            form.reset()
}
form.addEventListener("submit", (event) => {
    event.preventDefault()
    getdata(search.value)
    // console.log(search.value)
})

