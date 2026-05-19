let getweather = async (city) => {
    let weatherapi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b4f8c485308dfe1d7d9fee1d3ac554f3&units=metric`;
    let weatherobj = await fetch(weatherapi);
    let response = await weatherobj.json();
    return response;
}
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');

searchBtn.addEventListener('click', () => {
    const cityName = cityInput.value; 
    
    if (cityName !== "") {
        processWeather(cityName);
    } else {
        alert("Please enter a city name");
    }
});

async function processWeather(city) {
    getweather(city)
        .then((response) => {
            console.log(response);
            
            if (response.cod === 200) {
                document.getElementById('city-name').innerText = `Weather in ${response.name}`;
                document.getElementById('temp').innerText = `Temperature: ${response.main.temp}°C`;
                document.getElementById('humidity').innerText = `Humidity: ${response.main.humidity}%`;
                document.getElementById('desc').innerText = `Conditions: ${response.weather[0].description}`;
            } else {
        
                document.getElementById('city-name').innerText = "City not found. Try again!";
                document.getElementById('temp').innerText = "";
                document.getElementById('humidity').innerText = "";
                document.getElementById('desc').innerText = "";
            }
        })
        .catch((err) => console.log("Error:", err));
}