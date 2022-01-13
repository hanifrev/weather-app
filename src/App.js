/* eslint-disable jsx-a11y/alt-text */
import React, {useState, useEffect} from 'react'
import './App.scss'

const Weather = () => {
    const [search, setSearch] = useState("")
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
    const apiKey = process.env.REACT_APP_API_KEY
    // console.log(apiKey)

    useEffect(() => {
        dataweather()
       
    }, [])

    const dataweather = async (e) => {
      e.preventDefault()
        try {

        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}&units=metric`)
        const data = await res.json()
        // console.log(data)

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
        setLoading(false)
        setSearch("")
        } catch(error) {
            // setLoading(false)
            console.log(error)
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
            <form onSubmit={dataweather} className='form'>
                <input 
                    type="search"
                    name="Location"
                    placeholder='City . . .'
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                />
                <button onClick={dataweather}>Search</button>
            </form>
            <div className='details'>
              {loading ? (
                <h4>Please input the city name</h4>
              ) : (
                <>
                  <h1>{city}, {country}</h1>
                  <p className='date'>{time}</p>
                  <img src={`http://openweathermap.org/img/wn/${icons}@2x.png`} />
                  <h2>{temp}°C</h2>
                  <p>{tempMax}°C / {tempMin}°C</p>
                  <h3>{weather}</h3>
                  <div className='bottom'>
                    <div>
                      <img src='https://ik.imagekit.io/icvij1rszoy/wind-svgrepo-com_pTG1o3d8Q.svg?updatedAt=1641989166549' />
                      <h6>{wind} mps</h6>
                    </div>
                    <div>
                      <img src='https://ik.imagekit.io/icvij1rszoy/humidity-svgrepo-com_FaZjA09nP.svg?updatedAt=1641989166518' />
                      <h6>{humid}%</h6>
                    </div>
                  </div>
                </>
                
              )}
                    
                    
                </div>
        </div>
    )
}

export default Weather
