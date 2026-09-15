const path = require("path")
const express = require("express")
const hbs = require("hbs")

const geocode = require("./tools/geocode")
const forecast = require("./tools/forecastFile")

const app = express()

const port = process.env.PORT || 3000

const publicDirPath = path.join(__dirname, "public")
const viewsPath = path.join(__dirname, "temp1/views")
const partialsPath = path.join(__dirname, "temp1/partials")

app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath))

app.get("", (req, res) => {
    res.render("index", {
        title: "HOME",
        desc: "This is home page"
    })
})

app.get("/service", (req, res) => {
    res.render("service", {
        title: "SERVICE",
        name: "Mohamed",
        city: "Cairo",
        age: 40
    })
})

app.get("/team", (req, res) => {
    res.render("team", {
        title: "TEAM",
        name: "Reem",
        city: "Mansoura",
        age: 25
    })
})

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide address"
        })
    }

    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({ error })
        }

        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                country: forecastData.country,
                latitude: data.latitude,
                longitude: data.longitude,
                temperature: forecastData.temperature
            })
        })
    })
})

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        desc: "Page not found"
    })
})

app.listen(port, () => {
    console.log("Server is up on port " + port)
})