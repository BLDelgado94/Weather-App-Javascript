const apiKey = "";
const apiUrl = "";

async function checkWeather(){
    const response = await fetch(apiUrl + `&appid=${apiKey}`);
    let data = await response.json()
}