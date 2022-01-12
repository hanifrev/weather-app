import React, {useState, useEffect} from 'react'
import './App.scss'

const Weather = () => {
    const [search, setSearch] = useState("London")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [temp, setTemp] = useState("")
    const [weather, setWeather] = useState("")
    const [humid, setHumid] = useState("")
    const [tempMax, setTempMax] = useState("")
    const [tempMin, setTempMin] = useState("")
    const [icons, setIcons] = useState("")
    const [times, setTimes] = useState("")
    const [wind, setWind] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        dataweather()
        setLoading(false)
    }, [])

    const dataweather = async () => {
        try {

        
        const API_KEY = "eb9db3765f36b162322c15e2a090055e"
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric`)
        const data = await res.json()
        console.log(data)

        setCity(data.name)
        setCountry(data.sys.country)
        setTemp(Math.round(data.main.temp))
        setWeather(data.weather[0].main)
        setHumid(data.main.humidity)
        setTempMax(Math.round(data.main.temp_max))
        setTempMin(Math.round(data.main.temp_min))
        setIcons(data.weather[0].icon)
        setTimes(data.dt)
        setWind(data.wind.speed)
        } catch(error) {
            setLoading(true)
        }
        
    }

    const themonths = ["January", "February", "March", "April", "May", "June", "July",
         "August", "September", "October", "November", "December"];

    const a = times
    const dates = new Date(a * 1000)
    const date = dates.getDate()
    const months = themonths[dates.getMonth()]
    const year = dates.getFullYear()
    const hours = dates.getHours();
    const minutes = dates.getMinutes();
    const time = `${date} ${months} ${year} ${hours}:${minutes}`

    return (
        <div className='main'>
            <div className='form'>
                <input 
                    type="search"
                    name="Location"
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                />
                <button onClick={dataweather}>Search</button>
            </div>
            <div className='details'>
                    <h1>{city}, {country}</h1>
                    <p>{time}</p>
                    <img 
                        src={`http://openweathermap.org/img/wn/${icons}@2x.png`}
                    />
                    <h2>{temp}°C</h2>
                    <p>{tempMax}°C / {tempMin}°C</p>
                    <h3>{weather}</h3>
                    <p>Humidity: {humid}%</p>
                    <p>Wind: {wind} mps</p>
                </div>
        </div>
    )
}

export default Weather
