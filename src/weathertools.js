// Temperature converter
const temperature = {
  convert: {
    celsius: (value) => {
      const int = Number(value);

      if (typeof value === 'object' || Number.isNaN(int))
        throw new Error('Value is not a number');
      else return int * (9 / 5) + 32;
    },
    fahrenheit: (value) => {
      const int = Number(value);

      if (typeof value === 'object' || Number.isNaN(int))
        throw new Error('Value is not a number');
      else return (int - 32) * (5 / 9);
    }
  }
};

// Weather functions
async function fetchWeather(location) {
  const publicKey = 'd50e03bdd93c4f7f9b811406212711';

  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${publicKey}&q=${location}`
    );
    const weather = await response.json();

    return weather;
  } catch (err) {
    throw new Error(err);
  }
}

function processWeather(data) {
  return {
    location: {
      name: data.location.name,
      region: data.location.region,
      country: data.location.country,
      display: () => {
        const { name } = data.location;
        const { region } = data.location;
        const { country } = data.location;

        if (country === 'United States of America') return `${name}, ${region}`;
        return `${name}, ${country}`;
      }
    },
    weather: {
      current: data.current.condition.text,
      temperature: {
        celsius: {
          number: Math.round(data.current.temp_c),
          feels: Math.round(data.current.feelslike_c)
        },
        fahrenheit: {
          number: Math.round(data.current.temp_f),
          feels: Math.round(data.current.feelslike_f)
        }
      },
      misc: {
        humidity: data.current.humidity
      },
      wind: {
        kph: Math.round(data.current.wind_kph),
        mph: Math.round(data.current.wind_mph),
        direction: data.current.wind_dir
      }
    }
  };
}

async function getWeather(location) {
  try {
    const fetch = await fetchWeather(location);
    const process = processWeather(fetch);

    return process;
  } catch (err) {
    throw new Error(err);
  }
}

export default getWeather;
