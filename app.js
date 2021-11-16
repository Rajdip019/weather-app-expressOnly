const express = require("express");
const https = require('https');
const bodyParser = require("body-parser")


const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(express.static('image'))

app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html");

});


app.post("/", function (req, res) {
    console.log(req.body.cityName);
    const palce = req.body.cityName;
    const ApiKey = "d7206a4b3c83ef87092b0e1d92e8f21d";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+palce+"&APPID="+ApiKey+"&units=metric"
    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp;
            const feels_like = weatherData.main.feels_like;
            const icon = weatherData.weather[0].icon;
            const temp_min = weatherData.main.temp_min;
            const temp_max = weatherData.main.temp_max;
            const humidity=weatherData.main.humidity;
            const pressure=weatherData.main.pressure;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.setHeader("Content-Type", "text/html");
            res.write('<head><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet"></head>')
            res.write("<style>*{margin: 0; padding: 0;font-family: 'Open Sans', sans-serif;}body{background: no-repeat url('gradient-bg.jpg'); background-repeat: no-repeat;background-size: cover;text-align: center; } </style>");
            res.write("<style>header{text-align: center; font-size: 4rem; padding: 1rem;background: rgba(0, 247, 255, 0.123); box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );backdrop-filter: blur( 6px ); -webkit-backdrop-filter: blur( 6px );border-radius: 10px;color: black;font-weight: bolder; }</style>")
            res.write("<style>.form{background: rgba( 255, 255, 255, 0.4 ); box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );backdrop-filter: blur( 6px );-webkit-backdrop-filter: blur( 6px );border-radius: 10px; max-width: 50rem; margin-left: auto;margin-right: auto;padding: 2rem; }.form h1{padding: 1rem 0rem}</style>")
            res.write("<style>.main{height: 49.55vh;text-align: center; justify-content: center;padding: 10rem 0;}</style>")
            res.write("<style>.min-max{width: 25rem}.flex{display: flex;}h3{padding: 0.5rem; }footer{text-align: center;background-color: black; color: white; height: 5vh;line-height: 5vh; }</style>");
            res.write("<header> Weather App</header>");
            res.write("<div class='main'><div class='form'><h1>The temperature in "+palce+ " is: " + temp + " Degree celcius.</h1><h3>The Temp Feels like: "+feels_like+"</h3><h3>The Weather Currently is: " + weatherData.weather[0].description+ ". </h3><img src=" + imageURL + "><div class='flex'><div class='min-max'><h3>Min Temp: "+temp_min+ " celcius</h3></div><div class='min-max'><h3>Max Temp: "+temp_max+ " celcius</h3></div></div><div class='flex'><div class='min-max'><h3>Humidity: "+humidity+ "%</h3></div><div class='min-max'><h3>Presure: "+pressure+ "bar</h3></div></div></div></div>");
            res.write("<footer>Copyright &copy; 2021 | Build by Rajdeep Sengupta with Love.</footer>")
            res.send();
        })


    })

})


app.listen(3000, function () {
    console.log("Server is Running........")
})
