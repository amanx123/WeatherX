import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Switch } from './ui/switch';
import { saveSearch } from '@/utils/storeRecent';

interface WeatherProps {
    lat: number;
    lon: number;
}

const WeatherDisplay: React.FC<WeatherProps> = ({ lat, lon }) => {
    const [weather, setWeather] = useState<any>(null);
    const [fahrenheit, setFahrenheit] = useState(false);
    useEffect(() => {
        const fetchWeather = async () => {
            const apiKey = '5814edf0f9fbe131b7c0a133464947f9';
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
            setWeather(response.data);
            console.log(response.data.name);
            saveSearch({ name: response.data.name + ', ' + response.data.sys.country, coordinates: [lat, lon] });   //saving search location to the local storage
        };

        fetchWeather();
    }, [lat, lon]);

    useEffect(() => {
        const fahrenheit = localStorage.getItem('fahrenheit') === 'true';
        setFahrenheit(fahrenheit);
        localStorage.setItem('fahrenheit', JSON.stringify(fahrenheit));
    }, [fahrenheit]);

    if (!weather) {
        return (
            <div className=''>
                <div className='flex items-end justify-end'>
                    <div className="min-h-[30px] w-[200px] bg-neutral-100 animate-pulse mb-3 m-2 rounded-lg"></div>
                </div>
                <div className="flex flex-col gap-4 rounded-2xl p-4 bg-neutral-100 w-[400px] min-h-[220px] items-center justify-center">
                    <div className="h-8 w-[300px] bg-neutral-300 animate-pulse rounded"></div>
                    <div className='flex gap-2 w-full px-2 justify-center items-center'>
                        <div className="h-10 w-[40%] bg-neutral-300 animate-pulse rounded"></div>
                        <div className="h-10 w-[40%] bg-neutral-300 animate-pulse rounded"></div>
                    </div>
                    <div className='flex gap-2 w-full px-4 justify-around items-center'>
                        <div className="h-6 w-[35%] bg-neutral-300 animate-pulse rounded"></div>
                        <div className="h-6 w-[35%] bg-neutral-300 animate-pulse rounded"></div>
                    </div>
                    <div className="flex gap-2 w-full px-4 justify-around items-center">
                        <div className="h-6 w-[35%] bg-neutral-300 animate-pulse rounded"></div>
                        <div className="h-6 w-[35%] bg-neutral-300 animate-pulse rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    const { main, weather: weatherDetails, wind, sys } = weather;
    const weatherIcon = `http://openweathermap.org/img/wn/${weatherDetails[0].icon}@2x.png`;


    const handleFahrenheit = () => {
        setFahrenheit(prev => {
            const newFahrenheit = !prev;
            localStorage.setItem('fahrenheit', JSON.stringify(newFahrenheit));
            return newFahrenheit;
        });
    };


    return (
        <div className='mx-auto md:mx-0 md:ml-4'>
            <div className="flex items-center justify-end space-x-2 px-4 pb-2" >
                <span className="text-neutral-900 dark:text-gray-50">Celsius</span>
                <Switch checked={fahrenheit} onCheckedChange={handleFahrenheit} id="temperature-unit" aria-label="Toggle temperature unit" />
                <span className="text-neutral-900 dark:text-gray-50">Fahrenheit</span>
            </div>
            <div className="  p-4 bg-gradient-to-r from-teal-100 to-emerald-50 rounded-2xl w-[380px] sm:w-[400px] md:w-[400px] lg:w-[450px] shadow-lg flex flex-col ">
                <h2 className="text-2xl md:text-3xl font-bold text-center ">{weather.name + ","}<span className=' font-light text-gray-800 ml-2'>{sys?.country}</span></h2>
                <div className='flex gap-4 items-center justify-around'>
                    <div className='flex gap-2 justify-center items-center'>
                        <ThermometerIcon className="h-8 w-8 text-red-500" />
                        <p className='text-xl md:text-2xl font-semibold'>{(Math.round((fahrenheit ? main.temp * 9 / 5 + 32 : main.temp))).toFixed(2) + " °" + (fahrenheit ? "F" : "C")}</p>
                    </div>
                    <img className='h-[100px] w-[100px]' src={weatherIcon} alt={weatherDetails[0].description} />
                </div>
                <div className='flex gap-4 items-center justify-between text-base md:text-lg px-4 '>
                    <div className='flex gap-2 justify-center items-center '>
                        <CloudIcon className="h-6 w-6 text-gray-500 " />
                        <p className='font-normal text-gray-700'>{weatherDetails[0].description}</p>
                    </div>
                    <div className='flex gap-2 justify-center items-center'>
                        <DropletIcon className="h-6 w-6 text-gray-500 " />
                        <p className='font-normal text-gray-700'>{main.humidity}%</p>
                    </div>
                </div>
                <div className='flex gap-4 items-center justify-between mt-2 text-base md:text-lg px-4'>
                    <div className='flex gap-2 justify-center items-center'>
                        <WindIcon className="h-6 w-6 text-gray-500 " />
                        <p className='font-normal text-gray-700'>{wind.speed} m/s</p>
                    </div>
                    <div className='flex gap-2 justify-center items-center'>
                        <p className='font-normal text-gray-700'>Chance of Rain: {weatherDetails[0].main === 'Rain' ? 'Yes' : 'No'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};



function ThermometerIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
        </svg>
    )
}

function WindIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
            <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
            <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
        </svg>
    )
}


function DropletIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
        </svg>
    )
}


function CloudIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
        </svg>
    )
}




WeatherDisplay.propTypes = {
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired,
};

export default WeatherDisplay;

