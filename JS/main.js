"use strict";
let dataContainer = [];
async function allData(callData = "cairo") {
  const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=81708c6ee1fc49a492590843243012&q=${callData}&days=7`;
  const weatherData = await fetch(apiUrl);
  const allWeatherData = await weatherData.json();
  dataContainer = allWeatherData;
  currentWeather(dataContainer.location, dataContainer.current);
  anotherDays(dataContainer.forecast.forecastday);
  dayPerHours(dataContainer.forecast.forecastday[0].hour);
}
const darkMode = document.getElementById("darkMode"),
  lightMode = document.getElementById("lightMode");
allData();
function appDarkMode() {
  document.querySelector(".fa-sun").classList.replace("d-block", "d-none");
  document.querySelector(".fa-moon").classList.replace("d-none", "d-block");
  document.querySelector("body").classList.replace("bg-dark-subtle", "bg-dark");
  document
    .querySelector("nav")
    .classList.replace("bg-dark-subtle", "bg-gradient");
  document.querySelector(".navbar-toggler").classList.add("bg-secondary");
  document
    .querySelector(".nav-content")
    .classList.replace("text-primary-emphasis", "text-white");
  document.querySelector("footer").classList.add("bg-gradient");
  localStorage.setItem("appear", "Dark");
}
function appLightMode() {
  document.querySelector(".fa-moon").classList.replace("d-block", "d-none");
  document.querySelector(".fa-sun").classList.replace("d-none", "d-block");
  document.querySelector("body").classList.replace("bg-dark", "bg-dark-subtle");
  document
    .querySelector("nav")
    .classList.replace("bg-gradient", "bg-dark-subtle");
  document.querySelector(".navbar-toggler").classList.remove("bg-secondary");
  document
    .querySelector(".nav-content")
    .classList.replace("text-white", "text-primary-emphasis");
  document.querySelector("footer").classList.remove("bg-gradient");
  localStorage.setItem("appear", "Light");
}

darkMode.addEventListener("click", appDarkMode);
lightMode.addEventListener("click", appLightMode);
function reload() {
  const lastSave = localStorage.getItem("appear");
  if (lastSave === "Dark") {
    appDarkMode();
  } else {
    appLightMode;
  }
}
reload();
function showPosition(position) {
  allData(position.coords.latitude + "+" + position.coords.longitude);
}
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
}

async function allSearch(searchApi) {
  const apiUrlSearch = `https://api.weatherapi.com/v1/search.json?key=81708c6ee1fc49a492590843243012&q=${searchApi}`;
  const searchData = await fetch(apiUrlSearch);
  const allSearchData = await searchData.json();
  search(allSearchData);
}

document.getElementById("search-bar").addEventListener("input", function (e) {
  let serval = e.target.value;
  if (e.target.value) {
    allSearch(serval);
    document
      .getElementById("searchList")
      .classList.replace("d-none", "d-block");
  } else {
    document
      .getElementById("searchList")
      .classList.replace("d-block", "d-none");
  }
});

function search(sear) {
  const searchList = document.getElementById("searchList");
  searchList.innerHTML = "";

  if (sear.length === 0) {
    searchList.innerHTML = `<li class="list-unstyled">No results found</li>`;
    return;
  }

  for (let result of sear) {
    const listItem = document.createElement("li");
    listItem.className = "list-unstyled";
    listItem.innerHTML = `<i class="fa-solid fa-location-crosshairs me-2 mb-2"></i>${result.name}`;
    listItem.addEventListener("click", function () {
      document.getElementById("search-bar").value = result.name;
      searchList.classList.replace("d-block", "d-none");
    });
    searchList.appendChild(listItem);
  }
  document.getElementById("find").addEventListener("click", function () {
    let val = document.getElementById("search-bar").value;
    allData(val);
    document.getElementById("search-bar").value = "";
  });
}
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
  let today = `<div class="col-md-8 ps-0 pe-0 ms-3 me-3 mb-4 gy-5 text-center">
  <div class="head-content d-flex justify-content-between align-items-center p-3 rounded-5" style="background-image: linear-gradient(360deg,#1296e8 20%, #59a7ff 50%)">
  <small class="text-white">${days[date.getDay()]}</small>
  <small class="text-white"><i class="fa-regular fa-calendar-days fs-4 me-2"></i>${
    date.getDate() + " " + months[date.getMonth()]
  }</small>
  </div>
  <div class="row m-0 rounded-5 p-2 mt-2 h-100 fs-4" style="background-image: linear-gradient(#1296e8 20%, #59a7ff 50%);">
  <span class="col-12 mt-1 text-primary-emphasis"><i class="fa-solid fa-location-dot me-1"></i>${
    loca.name
  }</span>
  <span class="col-12 display-1 fw-bolder lh-base text-primary-emphasis">${
    curr.temp_c
  } <sup>o</sup>C</span>
  <img src="${
    curr.condition.icon
  }" class="col-12 fw-bolder img-fluid m-auto" alt="${
    curr.condition.text
  }" style="width:150px">
  <span class="col-12 text-primary-emphasis fw-normal">${
    curr.condition.text
  }</span>
  <div class="footer-content col-12 d-flex text-primary-emphasis justify-content-center">
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
    otherDays += `<swiper-slide  >
            <div class="col ps-0 pe-0 ms-3 me-3 mb-4 gy-5">
              <div class="head-content d-flex justify-content-between align-items-center text-primary-emphasis p-3 rounded-5" style="background-image: linear-gradient(360deg,#1296e8 20%, #65a7ff 50%)">
              <small>${days[date.getDay()]}</small>
              <small><i class="fa-regular fa-calendar-days fs-4 me-2"></i>${
                date.getDate() + " " + months[date.getMonth()]
              }</small>
              </div>
                      <div class="row text-center m-0 rounded-5 p-2 mt-2 h-100" style="background-image: linear-gradient(#1296e8 20%, #65a7ff 50%);">
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
  </swiper-slide>`;
  }
  document.getElementById("swiper").innerHTML += otherDays;
}
function dayPerHours(dhCurr) {
  const tN = new Date().getHours();

  let dayHour = ``,
    dayWind = ``;
  for (let i = tN; i < dhCurr.length; i++) {
    let d = new Date(dhCurr[i].time).getHours();
    if (d > 11) {
      d = d - 12 + " PM";
      d = d.replace("0 PM", "12 PM");
      d = d.replace("112 PM", "10 PM");
    } else {
      if (d === 0) d = 12;
      d = d + " AM";
    }
    dayHour += `<div class="col-4">
                    <div class="card text-center p-3 rounded-5 bg-transparent text-primary border-primary">
                      <h6><i class="fa-regular fa-clock me-2"></i>${d}</h6>
                      <img src="${dhCurr[i].condition.icon}" alt="${dhCurr[i].condition.text}" class="w-auto fw-bolder m-auto img-fluid">
                      <small><i class="fa-solid fa-temperature-three-quarters me-1"></i>${dhCurr[i].temp_c}<sup>o</sup>C</small>
                  </div>
                </div>`;
  }
  for (let w = tN; w < dhCurr.length; w++) {
    let d = new Date(dhCurr[w].time).getHours();
    if (d > 11) {
      d = d - 12 + " PM";
      d = d.replace("0 PM", "12 PM");
      d = d.replace("112 PM", "10 PM");
    } else {
      if (d === 0) d = 12;
      d = d + " AM";
    }
    dayWind += `<div class="col-4">
                  <div class="card text-center p-2 rounded-5 bg-transparent text-primary border-primary">
                    <h6><i class="fa-regular fa-clock me-2"></i>${d}</h6>
                    <img src="Imgs/navigation.png" alt="navigation" class="w-25 fw-bolder m-auto mt-3 mb-3 " style="transform: rotate(${dhCurr[w].wind_degree}deg);">
                    <small><i class="fa-solid fa-wind me-2"></i>${dhCurr[w].wind_kph} km/h</small>
                  </div>
                </div>`;
  }
  document.querySelector("#hoursDay").innerHTML = dayHour;
  document.querySelector("#windSpeed").innerHTML = dayWind;
}
