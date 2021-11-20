const express = require("express");
const https = require('https');
const bodyParser = require("body-parser")
const dotenv= require("dotenv").config();


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
    const ApiKey = process.env.API_KEY;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+palce+"&APPID="+ApiKey+"&units=metric"
    https.get(url, function (response) {
        console.log(response.statusCode);
        const status = response.statusCode;
        if(status === 404){
            res.setHeader("Content-Type", "text/html");
            res.write('<head><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet"></head>')
            res.write("<style>.form{background: rgba( 255, 255, 255, 0.4 ); box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );backdrop-filter: blur( 6px );-webkit-backdrop-filter: blur( 6px );border-radius: 10px; max-width: 50rem; margin-left: auto;margin-right: auto;padding: 2rem; }.form h1{padding: 1rem 0rem}</style>")
            res.write("<style>.main{height: 49.55vh;text-align: center; justify-content: center;padding: 10rem 0;}</style>")
             res.write("<style>*{margin: 0; padding: 0;font-family: 'Open Sans', sans-serif;}body{background: no-repeat url('gradient-bg.jpg'); background-repeat: no-repeat;background-size: cover;text-align: center; } </style>");
            res.write("<style>header{text-align: center; font-size: 4rem; padding: 1rem;background: rgba(0, 247, 255, 0.123); box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );backdrop-filter: blur( 6px ); -webkit-backdrop-filter: blur( 6px );border-radius: 10px;color: black;font-weight: bolder; }</style>")
            res.write("<style>.new_loc_btn form button{padding: 0.4rem;font-size: 1.25rem;background-color: rgba(0, 234, 255, 0.589);border-radius: 10px;border-color: transparent;font-weight: 900;cursor: pointer;}</style>")
            res.write("<style>.min-max{width: 25rem}.flex{display: flex;}h3{padding: 0.5rem; }footer{text-align: center;background-color: black; color: white; height: 5vh;line-height: 5vh; }</style>");
            res.write("<header> Weather App</header>");
            res.write("<div class='main'><div class='form'><h1>Check The City Name Again.</h1><h3> No Such City Available.</h3>");
            res.write("<div class='new_loc_btn'><form action='/new-serach' method='post'><button type='submit'>Search New Lcation</button></form></div></div></div>")
            res.write("<footer>Copyright &copy; 2021 | Build by Rajdeep Sengupta with &#10084;.</footer>");
            res.send();
        }
        else{
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
            res.write("<style>.new_loc_btn form button{padding: 0.4rem;font-size: 1.25rem;background-color: rgba(0, 234, 255, 0.589);border-radius: 10px;border-color: transparent;font-weight: 900;cursor: pointer;}</style>")
            res.write("<header> Weather App</header>");
            res.write("<div class='main'><div class='form'><h1>The temperature in "+palce+ " is: " + temp + " &#8451;</h1><h3>The Temp Feels like: "+feels_like+"&#8451;</h3><h3>The Weather Currently is: " + weatherData.weather[0].description+ ". </h3><img src=" + imageURL + "><div class='flex'><div class='min-max'><h3>Min Temp: "+temp_min+ " &#8451;</h3></div><div class='min-max'><h3>Max Temp: "+temp_max+ " &#8451;</h3></div></div><div class='flex'><div class='min-max'><h3>Humidity: "+humidity+ "%</h3></div><div class='min-max'><h3>Presure: "+pressure+ "bar</h3></div></div>");
            res.write("<div class='new_loc_btn'><form action='/new-serach' method='post'><button type='submit'>Search New Location</button></form></div></div></div>")
            res.write("<footer>Copyright &copy; 2021 | Build by Rajdeep Sengupta with &#10084;.</footer>");
            res.send();
        })

    }
    })

})

app.post("/new-serach", function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/popular-cities", function(req, res){
    let palce = "Kolkata"
    const ApiKey = process.env.API_KEY;
    let url = "https://api.openweathermap.org/data/2.5/weather?q="+palce+"&APPID="+ApiKey+"&units=metric"
    https.get(url, function (response) {
        response.on("data", function (data) {
            let weatherData = JSON.parse(data)
            let temp = weatherData.main.temp;
            let feels_like = weatherData.main.feels_like;
            let icon = weatherData.weather[0].icon;
            let temp_min = weatherData.main.temp_min;
            let temp_max = weatherData.main.temp_max;
            let humidity=weatherData.main.humidity;
            let pressure=weatherData.main.pressure;
            let imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

        res.setHeader("Content-Type", "text/html");
        res.write('<head><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet"></head>')
        res.write("<style>*{margin: 0; padding: 0;font-family: 'Open Sans', sans-serif;}body{background: no-repeat url('gradient-bg.jpg'); background-repeat: no-repeat;background-size: cover;text-align: center; } </style>");
        res.write("<style>header{text-align: center; font-size: 4rem; padding: 1rem;background: rgba(0, 247, 255, 0.123); box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );backdrop-filter: blur( 6px ); -webkit-backdrop-filter: blur( 6px );border-radius: 10px;color: black;font-weight: bolder; }</style>")
        res.write("<style>.form{background: rgba( 255, 255, 255, 0.4 ); box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );backdrop-filter: blur( 6px );-webkit-backdrop-filter: blur( 6px );border-radius: 10px; max-width: 50rem; margin-left: auto;margin-right: auto;padding: 2rem; }.form h1{padding: 1rem 0rem}</style>")
        res.write("<style>.main{width: 50vw;min-height: 49.55vh;text-align: center; justify-content: center;padding: 10rem 0;}</style>")
        res.write("<style>.min-max{width: 25rem}.flex{display: flex;}h3{padding: 0.5rem; }footer{text-align: center;background-color: black; color: white; height: 5vh;line-height: 5vh; }</style>");
        res.write("<style>.popular_city_flex{display: flex}.new_loc_btn form button{padding: 0.4rem;font-size: 1.25rem;background-color: rgba(0, 234, 255, 0.589);border-radius: 10px;border-color: transparent;font-weight: 900;cursor: pointer;}</style>")
        res.write("<header> Weather App</header>");
        res.write("<h1>Weather of Popular Cities.</h1>")
        res.write("<div class='popular_city_flex'><div class='main'><div class='form'><h1>The temperature in "+palce+" is: " + temp + " &#8451;</h1><h3>The Temp Feels like: "+feels_like+"&#8451;</h3><h3>The Weather Currently is: " + weatherData.weather[0].description+ ". </h3><img src=" + imageURL + "><div class='flex'><div class='min-max'><h3>Min Temp: "+temp_min+ " &#8451;</h3></div><div class='min-max'><h3>Max Temp: "+temp_max+ " &#8451;</h3></div></div><div class='flex'><div class='min-max'><h3>Humidity: "+humidity+ "%</h3></div><div class='min-max'><h3>Presure: "+pressure+ "bar</h3></div></div>");
        res.write("<div class='new_loc_btn'><form action='/new-serach' method='post'><button type='submit'>Search New Location</button></form></div></div></div>")
        
         palce = "London"
         url = "https://api.openweathermap.org/data/2.5/weather?q="+palce+"&APPID="+ApiKey+"&units=metric"
        https.get(url, function (response) {
            response.on("data", function (data) {
                let weatherData = JSON.parse(data)
                let temp = weatherData.main.temp;
                let feels_like = weatherData.main.feels_like;
                let icon = weatherData.weather[0].icon;
                let temp_min = weatherData.main.temp_min;
                let temp_max = weatherData.main.temp_max;
                let humidity=weatherData.main.humidity;
                let pressure=weatherData.main.pressure;
                let imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

                res.write("<div class='main'><div class='form'><h1>The temperature in "+palce+" is: " + temp + " &#8451;</h1><h3>The Temp Feels like: "+feels_like+"&#8451;</h3><h3>The Weather Currently is: " + weatherData.weather[0].description+ ". </h3><img src=" + imageURL + "><div class='flex'><div class='min-max'><h3>Min Temp: "+temp_min+ " &#8451;</h3></div><div class='min-max'><h3>Max Temp: "+temp_max+ " &#8451;</h3></div></div><div class='flex'><div class='min-max'><h3>Humidity: "+humidity+ "%</h3></div><div class='min-max'><h3>Presure: "+pressure+ "bar</h3></div></div>");
        res.write("<div class='new_loc_btn'><form action='/new-serach' method='post'><button type='submit'>Search New Location</button></form></div></div></div></div>")
        res.write("<footer>Copyright &copy; 2021 | Build by Rajdeep Sengupta with &#10084;.</footer>");
        
                
        res.send();
    })
})
})
    })
})



app.listen(3000, function () {
    console.log("Server is Running........")
})
