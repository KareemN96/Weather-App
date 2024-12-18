let dataContainer = [];
async function allData(callData) {
  const apiUrl = 'https://api.weatherapi.com/v1/forecast.json?key=4cb8a9468f6a4caa8c465407241812&q=${callData}&days=3';
  const weatherData = await fetch(apiUrl);
  const allWeatherData = await weatherData.json();
  dataContainer = allWeatherData;
  currentWeather(dataContainer.location, dataContainer.current);
  anotherDays(dataContainer.forecast.forecastday);
}
allData("Alexandria");
document.getElementById("search-bar").addEventListener("keyup", function (e) {
  allData(e.target.value);
});
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
function currentWeather(loca, curr) {
  const date = new Date(curr.last_updated);
  let today = `<div class="col-lg ps-0 pe-0 ms-3 me-3 mb-4 gy-5">
  <div class="head-content d-flex justify-content-between bg-info ps-3 pe-3 pt-3 pb-3 rounded-5">
  <small>${days[date.getDay()]}</small>
  <small>${date.getDate() + months[date.getMonth()]}</small>
  </div>
  <div class="row bg-dark-subtle m-0 rounded-5 p-2 mt-2 h-100">
  <span class="col-12 mt-1">${loca.name}</span>
  <span class="col-12 display-1 fw-bolder lh-base">${
    curr.temp_c
  } <sup>o</sup>C</span>
  <img src="${
    curr.condition.icon
  }" class="col-12 w-auto fw-bolder img-fluid" alt="${curr.condition.text}">
  <span class="col-12 text-primary fw-normal">${curr.condition.text}</span>
  <div class="footer-content col-12 d-flex">
  <span>
                    <i class="fa-solid fa-umbrella me-2"></i>20%</span>
                    <span><i class="fa-solid fa-wind ms-3 me-2"></i>18km/h</span>
                    <span><i class="fa-solid fa-angles-right ms-3 me-2"></i>East</span>
                    </div>
                    </div>
                    </div>`;
  document.getElementById("weatherDisp").innerHTML = today;
}

function anotherDays(daysData) {
  let otherDays = "";
  for (let i = 1; i < daysData.length; i++) {
    const date = new Date(daysData[i].date);
    otherDays += `<div class="col-lg ps-0 pe-0 ms-3 me-3 mb-4 gy-5">
                      <div
                      class="head-content d-flex justify-content-center align-items-center bg-info-subtle ps-3 pe-3 pt-3 pb-3 rounded-5"
                      >
                      <small>${days[date.getDay()]}</small>
                      </div>
                      <div class="row text-center bg-info m-0 rounded-5 p-2 mt-2 h-100">
                      <img src="${
                        daysData[i].day.condition.icon
                      }" class="col-12 w-auto fw-bolder m-auto img-fluid" alt="${
      daysData[i].day.condition.text
    }">
                      <span class="col-12 fs-4 fw-bolder lh-base">${
                        daysData[i].day.maxtemp_c
                      } <sup>o</sup>C</span>
  <span class="col-12 fs-6 fw-light lh-base">${
    daysData[i].day.mintemp_c
  } <sup>o</sup>C</span>
  <span class="col-12 text-primary fw-normal">${
    daysData[i].day.condition.text
  }</span>
  </div>
  </div>
  `;
  }
  document.getElementById("weatherDisp").innerHTML += otherDays;
}
