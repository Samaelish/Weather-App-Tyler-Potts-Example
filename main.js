// Api ключ и базовый юрл
const api = {
    key: 'e7798d1bc37b5a7ae2ff3f308fa429e7',
    base: 'http://api.openweathermap.org/data/2.5/'
}

// Кнопка поиска и действие этой кнопки
const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery);

// Функция, которая запускается при нажатии enter(13ая кнопка)
function setQuery(event){
    if (event.keyCode == 13) {
        getResults(searchBox.value);
    }
}

// Получение результатов от Openweathermap API в виде JSON
function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}&lang=ru`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}

// Вывод результатов на экран
function displayResults(weather) {
    // console.log(weather); json объект, который получаем с api
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}`;
    
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].description;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;
}

// Подбор правильной даты, дня, месяца
function dateBuilder(d) {
    const months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
    const days = ["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}

// Первый вызов, чтобы все верно отображалось на странице
getResults('Москва');