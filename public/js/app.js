fetch("http://puzzle.mead.io/puzzle").then(response => {
  response.json().then(data => {});
});

const weatherForm = document.querySelector("#weather-form");
const cityInput = document.querySelector("#city-input");
const cityParagraph = document.querySelector("#city");
const temperatureParagraph = document.querySelector("#temperature");
const summaryParagraph = document.querySelector("#summary");

weatherForm.addEventListener("submit", () => {
  event.preventDefault();
  const text = cityInput.value;
  if (text) {
    cityParagraph.textContent = "Loading...";
    fetch(`/weather?address=${text}`).then(res => {
      res.json().then(data => {
        cityInput.value = "";
        if (data.error) {
          return (cityParagraph.textContent = data.error);
        }
        cityParagraph.textContent = data.location;
        temperatureParagraph.textContent = data.temperature;
        summaryParagraph.textContent = data.summary;
      });
    });
  }
});
