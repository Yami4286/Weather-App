const content = document.querySelector("#content");

class WeatherApp {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.data = null
    this.isCelsius = true
    this.content = document.querySelector("#content");
    this.setupSearch();
    this.toggleTemp();
  }

  async fetchWeather(city) {
     try{
         const normalized = city.trim().toLowerCase()
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${city}`)
    if (response.status !== 200) {
      console.log(response)
      return
    }
    this.data = await response.json()
    this.render()
    this.setBackground()
     }catch(response){ console.log("error occured",response);}
 }

  render() {
    // display logic here
        const display = [
    { label: "City", value: this.data.location.name },
    { label: "Region", value: this.data.location.region },
    { label: "Country", value: this.data.location.country },
    { label: "Local Time", value: this.data.location.localtime },
    { label: "Temperature", value: `${this.data.current.temp_c}°C`, id: "temp" }
  ];

  display.forEach(item => {
    const card = document.createElement("div")
  if (item.id) card.id = item.id
  card.className = "weather-card"

  const label = document.createElement("div")
  label.className = "weather-label"
  label.textContent = item.label

  const value = document.createElement("div")
  value.className = "weather-value"
  value.textContent = item.value

  card.appendChild(label)
  card.appendChild(value)
  this.content.appendChild(card)
  })
  }

  setBackground() {
    // temperature color logic here
    function getBackground(temp) {
  if (temp >= 30) return "#f97316"      // hot — orange
  else if (temp>= 20) return "#fbbf24" // warm — yellow
  else if (temp >= 10) return "#94a3b8" // cool — grey
  else return "#3b82f6"                 // cold — blue
}
document.body.style.background = getBackground(this.data.current.temp_c);
  }

  toggleTemp() {
    // celsius/fahrenheit toggle here
    document.querySelector("#toggle").addEventListener("click", () => {
  const tempDiv = document.querySelector("#temp")
  this.isCelsius = !this.isCelsius
  tempDiv.textContent = this.isCelsius 
    ? `Temperature: ${this.data.current.temp_c}°C`
    : `Temperature: ${this.data.current.temp_f}°F`
});

  }

  setupSearch() {
  document.querySelector("#search-btn").addEventListener("click", () => {
    const city = document.querySelector("#city").value
        if (!city) return
    if (!/^[a-zA-Z\s]+$/.test(city)) {
      alert("Letters and spaces only please")
      return
    }
    this.content.innerHTML = ""  // clear previous results
    this.fetchWeather(city)
  })
}

}


const app = new WeatherApp("367f539f93f544c0ad0182516262903");





