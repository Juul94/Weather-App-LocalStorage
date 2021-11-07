
const cityForm = document.querySelector('.change-location');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const imageTime = document.querySelector('img.imageTime');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {

    // Test purpose only
    console.log(data);

    // As variables
    let cityDetails = data.cityDetails;
    let weather = data.weather;

    // Update details template
    details.innerHTML = `
        <h5 class="my-3">${ cityDetails.EnglishName }</h5>
        <div class="my-3">${ weather.WeatherText }</div>
        <div class="display-4 my-4">
            <span>${ weather.Temperature.Metric.Value }</span>
            <span>&deg;C</span>
        </div>
    `;

    // Updating icons
    const iconSource = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSource);

    // Updating nigh/day images
    let timeSource = null;

    if(weather.IsDayTime) {
        imageTime.classList.remove('d-none');
        timeSource = 'https://raw.githubusercontent.com/Juul94/Weather-App-LocalStorage/65aa9b48d1cdfb69d2257c40ad44d30f415f05e0/img/day.svg';
        document.body.style.backgroundColor = '#b8dbf4';
    }
    
    else {
        imageTime.classList.remove('d-none');
        timeSource = 'https://raw.githubusercontent.com/Juul94/Weather-App-LocalStorage/65aa9b48d1cdfb69d2257c40ad44d30f415f05e0/img/night.svg';
        document.body.style.backgroundColor = '#243046';
    }

    imageTime.setAttribute('src', timeSource);
};

// async: returns a promise
const updateCity = async (city) => {

    // await --> we're waiting till get getting the values before running the getCity function
    let cityDetails = await getCity(city);
    let weather = await getWeather(cityDetails.Key);
    
    return { cityDetails, weather };
};

cityForm.addEventListener('submit', e => {

    // Preventing default action (submit)
    e.preventDefault();

    // Getting city values
    let city = cityForm.city.value.trim();

    // Storing the city with local storage
    localStorage.setItem('latestCityName', city);

    // Resets the fields after search
    cityForm.reset();

    card.classList.remove('d-none');

    // Update UI with the new city (Displaying data for that city the user search for)
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
});

// Display data if local storage exists (else hide)

if(localStorage.getItem('latestCityName')) {
    card.classList.remove('d-none');
    imageTime.classList.remove('d-none');
}

else {
    card.classList.add('d-none');
    imageTime.classList.add('d-none');
}

window.onload = function(e) {
    if (localStorage.getItem('latestCityName')) { // check if the user has this item in the local storage.

        document.getElementById('locationName').value = localStorage.getItem('latestCityName'); //Getting the item from the local storage.

        let city = cityForm.city.value.trim();
        localStorage.setItem('latestCityName', city);

        card.classList.remove('d-none');

        updateCity(city)
            .then(data => updateUI(data))
            .catch(err => console.log(err));
    }
};

// Test purpose only
console.log(`Latest city: ${ localStorage.getItem('latestCityName') }`);
