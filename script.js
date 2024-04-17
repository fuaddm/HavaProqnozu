const weatherCodes = [
  {
    code: 0,
    src: "./weatherIcons/animated/day.svg",
  },
  {
    code: 1,
    src: "./weatherIcons/animated/cloudy-day-1.svg",
  },
  {
    code: 2,
    src: "./weatherIcons/animated/cloudy-day-2.svg",
  },
  {
    code: 3,
    src: "./weatherIcons/animated/cloudy.svg",
  },
  {
    code: 45,
    src: "./weatherIcons/animated/cloudy.svg",
  },
  {
    code: 48,
    src: "./weatherIcons/animated/cloudy.svg",
  },
  {
    code: 51,
    src: "./weatherIcons/animated/rainy-4.svg",
  },
  {
    code: 53,
    src: "./weatherIcons/animated/rainy-4.svg",
  },
  {
    code: 55,
    src: "./weatherIcons/animated/rainy-4.svg",
  },
  {
    code: 56,
    src: "./weatherIcons/animated/rainy-4.svg",
  },
  {
    code: 57,
    src: "./weatherIcons/animated/rainy-4.svg",
  },
  {
    code: 61,
    src: "./weatherIcons/animated/rainy-6.svg",
  },
  {
    code: 63,
    src: "./weatherIcons/animated/rainy-6.svg",
  },
  {
    code: 65,
    src: "./weatherIcons/animated/rainy-6.svg",
  },
  {
    code: 66,
    src: "./weatherIcons/animated/rainy-6.svg",
  },
  {
    code: 67,
    src: "./weatherIcons/animated/rainy-6.svg",
  },
  {
    code: 71,
    src: "./weatherIcons/animated/snowy-4.svg",
  },
  {
    code: 73,
    src: "./weatherIcons/animated/snowy-5.svg",
  },
  {
    code: 75,
    src: "./weatherIcons/animated/snowy-6.svg",
  },
  {
    code: 77,
    src: "./weatherIcons/animated/snowy-6.svg",
  },
  {
    code: 80,
    src: "./weatherIcons/animated/rainy-1.svg",
  },
  {
    code: 81,
    src: "./weatherIcons/animated/rainy-2.svg",
  },
  {
    code: 82,
    src: "./weatherIcons/animated/rainy-3.svg",
  },
  {
    code: 85,
    src: "./weatherIcons/animated/rainy-7.svg",
  },
  {
    code: 86,
    src: "./weatherIcons/animated/rainy-7.svg",
  },
  {
    code: 95,
    src: "./weatherIcons/animated/thunder.svg",
  },
  {
    code: 96,
    src: "./weatherIcons/animated/thunder.svg",
  },
  {
    code: 99,
    src: "./weatherIcons/animated/thunder.svg",
  },
];

async function getData() {
  const resp = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=40.3777&longitude=49.892&hourly=temperature_2m,relative_humidity_2m,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m&timezone=auto"
  );
  const data = await resp.json();
  return data;
}

function getTimeInHour(date) {
  const hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  return hours + ":" + minutes;
}

async function setData() {
  const data = await getData();

  const nowDate = new Date();
  const nowHour = new Date().getHours();

  function setMainCard(day, hour) {
    const mainWeatherCode = data.hourly.weather_code[hour + 24 * day];
    const temprature = data.hourly.temperature_2m[hour + 24 * day];
    const windSpeed = data.hourly.wind_speed_10m[hour + 24 * day];
    const windDirection = data.hourly.wind_direction_10m[hour + 24 * day];
    const cloudCover = data.hourly.cloud_cover[hour + 24 * day];
    const relativeHumidity = data.hourly.relative_humidity_2m[hour + 24 * day];

    if (day === 0) {
      document.querySelector(".date").innerHTML = `Bu gün, ${getTimeInHour(nowDate)}`;
    } else if (day === 1) {
      document.querySelector(".date").innerHTML = `Sabah, ${getTimeInHour(nowDate)}`;
    } else {
      document.querySelector(".date").innerHTML =
        new Date(data.hourly.time[hour + 24 * day]).toLocaleDateString() + `, ${getTimeInHour(nowDate)}`;
    }
    document.querySelector(".temprature").innerHTML = temprature + " °C";
    document.querySelector(".mainCard__img").src = weatherCodes.find((item) => item.code === mainWeatherCode).src;
    document.querySelector("#wind").innerHTML = windSpeed + " km/h";
    document.querySelector("#windDirection").innerHTML = windDirection + "°";
    document.querySelector("#cloudCover").innerHTML = cloudCover + "%";
    document.querySelector("#humidity").innerHTML = relativeHumidity + "%";
  }

  setMainCard(0, nowHour);

  function setWeatherFor(day, hour) {
    const date = new Date(data.hourly.time[hour + 24 * day]).toLocaleDateString();
    const weatherCode = data.hourly.weather_code[hour + 24 * day];
    const temprature = data.hourly.temperature_2m[hour + 24 * day];

    const svgSrc = weatherCodes.find((item) => item.code === weatherCode).src;

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<span class="card__date">${date}</span>
    <img class="card__img" src="${svgSrc}" alt="" />
    <span class="card__tmp">${temprature} °C</span>`;

    card.addEventListener("click", () => {
      setMainCard(day, hour);
    });

    document.querySelector(".cards").appendChild(card);
  }

  document.querySelector(".cards").innerHTML = "";

  for (let i = 0; i < 7; i++) {
    setWeatherFor(i, nowHour);
  }
}

setData();
