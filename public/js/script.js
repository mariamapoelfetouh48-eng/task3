const formElement = document.getElementById("form1")
const addressElement = document.getElementById("address")
const locationElement = document.getElementById("location")
const forecastElement = document.getElementById("forecast")
const errorElement = document.getElementById("error")

formElement.addEventListener("submit", async (e) => {
    e.preventDefault()

    const location = addressElement.value

    locationElement.innerText = ""
    forecastElement.innerText = ""
    errorElement.innerText = ""

    try {
        const response = await fetch("/weather?address=" + location)
        const data = await response.json()

        if (data.error) {
            errorElement.innerText = data.error
        } else {
            locationElement.innerText = "Country: " + data.country +
                "\nLatitude: " + data.latitude +
                "\nLongitude: " + data.longitude
            forecastElement.innerText = "Temperature: " + data.temperature + "°C"
        }
    } catch (error) {
        errorElement.innerText = "Unable to connect to weather service!"
    }
})