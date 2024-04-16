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
    "https://api.open-meteo.com/v1/forecast?latitude=40.3777&longitude=49.892&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto"
  );
  const data = await resp.json();
  return data;
}

async function setData() {
  const data = await getData();

  function setMainCard(day) {
    const mainWeatherCode = data.daily.weather_code[day];
    const mainMaxTmp = data.daily.temperature_2m_max[day];
    const mainMinTmp = data.daily.temperature_2m_min[day];
    const mainAvarageTmp = (mainMinTmp + (mainMaxTmp - mainMinTmp) / 2).toFixed(1);

    if (day === 0) {
      document.querySelector(".date").innerHTML = "Bu gün";
    } else if (day === 1) {
      document.querySelector(".date").innerHTML = "Sabah";
    } else {
      document.querySelector(".date").innerHTML = new Date(data.daily.time[day]).toLocaleDateString();
    }
    document.querySelector(".temprature").innerHTML = mainAvarageTmp + " °C";
    document.querySelector(".mainCard__img").src = weatherCodes.find((item) => item.code === mainWeatherCode).src;
  }

  setMainCard(0);

  function setWeatherFor(day) {
    const date = new Date(data.daily.time[day]).toLocaleDateString();
    const weatherCode = data.daily.weather_code[day];
    const maxTmp = data.daily.temperature_2m_max[day];
    const minTmp = data.daily.temperature_2m_min[day];
    const avarageTmp = (minTmp + (maxTmp - minTmp) / 2).toFixed(1);

    const svgSrc = weatherCodes.find((item) => item.code === weatherCode).src;

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<span class="card__date">${date}</span>
    <img class="card__img" src="${svgSrc}" alt="" />
    <span class="card__tmp">${avarageTmp} °C</span>`;

    card.addEventListener("click", () => {
      setMainCard(day);
    });

    document.querySelector(".cards").appendChild(card);
  }

  document.querySelector(".cards").innerHTML = "";

  for (let i = 0; i < 7; i++) {
    setWeatherFor(i);
  }
}

setData();
