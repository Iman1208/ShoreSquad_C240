// ShoreSquad App JS
// Placeholder for interactive features

document.addEventListener('DOMContentLoaded', () => {
  // Example: Animate map section on load
  const mapSection = document.getElementById('map-section');
  if (mapSection) {
    mapSection.style.opacity = 0;
    setTimeout(() => {
      mapSection.style.transition = 'opacity 1s';
      mapSection.style.opacity = 1;
    }, 200);
  }

  // Fetch and display 4-day weather forecast from NEA's API
  async function fetchWeatherForecast() {
    const weatherDiv = document.getElementById('weather');
    if (!weatherDiv) return;
    weatherDiv.innerHTML = '<span>Loading weather forecast...</span>';

    try {
      // NEA 4-day weather forecast endpoint
      const response = await fetch('https://api.data.gov.sg/v1/environment/4-day-weather-forecast');
      if (!response.ok) throw new Error('Weather API error');
      const data = await response.json();
      const forecasts = data.items[0].forecasts;
      let html = '<div class="weather-forecast-grid">';
      forecasts.forEach(day => {
        html += `
          <div class="weather-day">
            <div class="weather-date">${day.date}</div>
            <div class="weather-forecast">${day.forecast}</div>
            <div class="weather-temp">${day.temperature.low}&ndash;${day.temperature.high}&deg;C</div>
            <div class="weather-humidity">Humidity: ${day.relative_humidity.low}&ndash;${day.relative_humidity.high}%</div>
          </div>
        `;
      });
      html += '</div>';
      weatherDiv.innerHTML = html;
    } catch (err) {
      weatherDiv.innerHTML = '<span style="color:var(--highlight)">Unable to load weather forecast.</span>';
    }
  }

  fetchWeatherForecast();

  // TODO: Add map integration, weather API, and crew features
});
