const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

console.log(__dirname);
console.log(__filename);

//define paths for express config
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../views");
const partialPath = path.join(__dirname, "../views/partials");
//setup handlebars
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

//setup directory to serve
app.use(express.static(publicPath));

app.get("", (req, res) => {
  res.render("index", { title: "weather", age: 5 });
});

app.get("/help", (req, res) => {
  res.render("help", { title: "helpiaren", responsible: "Mgr. Kvasnicova" });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "You must provide an address!" });
  }
  const gCode = geocode.geocode(
    req.query.address,
    (error, { lattitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast.forecast(lattitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        console.log(forecastData);

        res.send({
          location,
          temperature: forecastData.temperature + "°C"
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  console.log(req.query.search);
  if (req.query.search) {
    res.send({ products: [] });
  } else {
    res.send({ error: "You must provide a search term" });
  }
});

app.get("/help/*", (req, res) => {
  res.render("error", { error: "Help article not found", title: "errorisko" });
});

app.get("*", (req, res) => {
  res.render("error", { error: "No page found", title: "errorisko" });
});

app.listen(3000, () => {
  console.log("Server is running");
});
