const loc = document.querySelector(".location");
const weather = document.querySelector(".weather");
const temp = document.querySelector(".temp");
const container = document.querySelector(".container");
const searchBox = document.querySelector(".searchBox");
const error = document.querySelector(".errorMessage");

//ページが読み込まれた時
window.onload = function () {
    getWeather("Osaka");
}

//テキストボックスが入力中にEnterが押された時
searchBox.addEventListener("keydown", function(e) {
    if(e.key === "Enter"){
        if(searchBox.value === ""){
            error.innerHTML = "※都市名を入力してください";
            
        }else{
            error.innerHTML = "　";
            getWeather(searchBox.value);
        }
    }
});

/**
 * 引数の都市の天気をOpenWeatherApiから取得するプロパティ
 * @param 都市名
 */
async function getWeather(city){
    const apiKey = "3a42db27ca17498c47c5ef9cf422c33b";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=ja`;

    try{
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);

        if(res.ok){
            error.innerHTML = "　";
            loc.innerHTML = "都市: " + data["name"];
            weather.innerHTML = "天気: " + data["weather"][0]["main"];
            temp.innerHTML = "気温: " + (data["main"]["temp"] - 273.15).toFixed(1) + "°";
            bgChange(data["weather"][0]["main"]);

        }else{
            error.innerHTML = "※存在しない都市です";
        }

    }catch(error){
        console.error("ERROR:", error);
    }
}

/**
 * 引数の天気によって背景を変更するプロパティ
 * @param 天気 
 */
function bgChange(weather){
    switch(weather){
        case "Clouds":
            container.style.background = "url('/WeatherApp/images/cloud.jpg')";
            break;

        case "Rain":
            container.style.background = "url('/WeatherApp/images/rainy.jpg')";
            break;

        case "Snow":
        container.style.background = "url('/WeatherApp/images/snow.jpg')";
        break;

        case "Thunderstorm":
        container.style.background = "url('/WeatherApp/images/thunderstorm.jpg')";
        break;
        
        case "Mist":
        container.style.background = "url('/WeatherApp/images/Mist.jpg')";
        break;

        default:
            container.style.background = "url('/WeatherApp/images/sunny.jpg')";
    }

    container.style.backgroundPosition = "center";
    container.style.backgroundSize = "cover";
}
