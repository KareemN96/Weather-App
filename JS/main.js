let dataContainer = [];
async function allData(callData) {
  const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=4cb8a9468f6a4caa8c465407241812&q=${callData}&days=3`;
  const weatherData = await fetch(apiUrl);
  const allWeatherData = await weatherData.json();
  dataContainer = allWeatherData;
  currentWeather(dataContainer.location, dataContainer.current);
  anotherDays(dataContainer.forecast.forecastday);
  dayPerHours(dataContainer.forecast.forecastday[0].hour);
}
allData("Cairo");
function showPosition(position) {
  allData(position.coords.latitude + "+" + position.coords.longitude);
}
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
}
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
  <div class="head-content d-flex justify-content-between  p-3 rounded-5" style="background-color:#194a7a">
  <small class="text-white">${
    days[date.getDay()]
  }<i class="fa-regular fa-calendar-days fs-4 ms-2"></i></small>
  <small class="text-white"><i class="fa-regular fa-calendar-days fs-4 me-2"></i>${
    date.getDate() + " " + months[date.getMonth()]
  }</small>
  </div>
  <div class="row m-0 rounded-5 p-2 mt-2 h-100" style="background-color:#a3b7ca">
  <span class="col-12 mt-1 text-primary"><i class="fa-solid fa-location-dot me-1"></i>${
    loca.name
  }</span>
  <span class="col-12 display-1 fw-bolder lh-base text-primary">${
    curr.temp_c
  } <sup>o</sup>C</span>
  <img src="${
    curr.condition.icon
  }" class="col-12 w-auto fw-bolder img-fluid" alt="${curr.condition.text}">
  <span class="col-12 text-primary fw-normal">${curr.condition.text}</span>
  <div class="footer-content col-12 d-flex text-primary">
  <span>
                    <i class="fa-solid fa-umbrella me-2"></i>${
                      curr.cloud
                    }%</span>
                    <span><i class="fa-solid fa-wind ms-3 me-2"></i>${
                      curr.wind_kph
                    } km/h</span>
                    <span><i class="fa-solid fa-angles-right ms-3 me-2"></i>${
                      curr.wind_dir
                    }</span>
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
              <div class="head-content d-flex justify-content-between text-primary p-3 rounded-5" style="background-color:#a3b7ca">
              <small>${
                days[date.getDay()]
              }<i class="fa-regular fa-calendar-days fs-4 ms-2"></i></small>
              <small><i class="fa-regular fa-calendar-days fs-4 me-2"></i>${
                date.getDate() + " " + months[date.getMonth()]
              }</small>
              </div>
                      <div class="row text-center m-0 rounded-5 p-2 mt-2 h-100" style="background-color:#194a7a">
                      <img src="${
                        daysData[i].day.condition.icon
                      }" class="col-12 w-auto fw-bolder m-auto img-fluid" alt="${
      daysData[i].day.condition.text
    }">
                      <span class="col-12 fs-4 fw-bolder text-white mt-auto">${
                        daysData[i].day.maxtemp_c
                      } <sup>o</sup>C</span>
  <span class="col-12 fs-6 fw-light text-white">${
    daysData[i].day.mintemp_c
  } <sup>o</sup>C</span>
  <span class="col-12 text-white fw-normal">${
    daysData[i].day.condition.text
  }</span>
  </div>
  </div>
  `;
  }
  document.getElementById("weatherDisp").innerHTML += otherDays;
}
function dayPerHours(dhCurr) {
  const tN = new Date();
  let tH = tN.getHours();
  let dayHour = ``,
    dayWind = ``;
  for (let i = tH; i < dhCurr.length; i++) {
    const d = new Date(dhCurr[i].time);
    let h = d.getHours();
    if (h > 11) {
      h = h - 12 + " PM";
      h = h.replace("0 PM", "12 PM");
      h = h.replace("112 PM", "10 PM");
    } else {
      if (h === 0) h = 12;
      h = h + " AM";
    }
    dayHour += `<div class="col-4">
                    <div class="card text-center p-3 rounded-5 bg-transparent text-primary border-primary">
                      <h6><i class="fa-regular fa-clock me-2"></i>${h}</h6>
                      <img src="${dhCurr[i].condition.icon}" alt="${dhCurr[i].condition.text}" class="w-auto fw-bolder m-auto img-fluid">
                      <small><i class="fa-solid fa-temperature-three-quarters me-1"></i>${dhCurr[i].temp_c}<sup>o</sup>C</small>
                  </div>
                </div>`;
  }
  for (let w = tH; w < dhCurr.length; w++) {
    const d = new Date(dhCurr[w].time);
    let h = d.getHours();
    if (h > 11) {
      h = h - 12 + " PM";
      h = h.replace("0 PM", "12 PM");
      h = h.replace("112 PM", "10 PM");
    } else {
      if (h === 0) h = 12;
      h = h + " AM";
    }
    dayWind += `<div class="col-4">
                  <div class="card text-center p-2 rounded-5 bg-transparent text-primary border-primary">
                    <h6><i class="fa-regular fa-clock me-2"></i>${h}</h6>
                    <img src="Imgs/navigation.png" alt="navigation" class="w-25 fw-bolder m-auto mt-3 mb-3 " style="transform: rotate(${dhCurr[w].wind_degree}deg);">
                    <small><i class="fa-solid fa-wind me-2"></i>${dhCurr[w].wind_kph} km/h</small>
                  </div>
                </div>`;
  }
  document.querySelector("#hoursDay").innerHTML = dayHour;
  document.querySelector("#windSpeed").innerHTML = dayWind;
}
