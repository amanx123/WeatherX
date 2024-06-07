import React, { useState } from 'react';
import WeatherDisplay from './components/WeatherDisplay';
import MapDisplay from './components/MapDisplay';
import LocationSearchInput from './utils/LocationSearchInput';
import Logo from './assets/weatherapp.png'
import RecentSearches from './components/RecentSearches';
import BgWeather from './assets/bgweather.jpg';
import { getRecentSearchLocations } from './utils/storeRecent';
const App: React.FC = () => {

  const defaultCoordinates = {
    lat: 0,
    lon: 0
  }
  // Loading recent search location from local storage if available and updating the state 
  const locationCoordinates = getRecentSearchLocations()
  if (locationCoordinates.length > 0) {
    defaultCoordinates.lat = locationCoordinates[0].coordinates[0]
    defaultCoordinates.lon = locationCoordinates[0].coordinates[1]
  }
  else {   //storing london as default location is nothing is available in local storage
    defaultCoordinates.lat = 51.5072
    defaultCoordinates.lon = -0.1276
  }

  // Initializing state with a default location
  const [lat, setLat] = useState<number>(defaultCoordinates.lat);
  const [lon, setLon] = useState<number>(defaultCoordinates.lon);
  const [tempCoordinates, setTempCoordinates] = useState<[number, number]>([51.5072, -0.1276]);

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const { latitude, longitude } = event.target as typeof event.target & {
      latitude: { value: number };
      longitude: { value: number };
    };
    setLat(latitude.value);
    setLon(longitude.value);

  };


  const handleLocationSelect = (lat: number, lon: number) => {
    setLat(() => lat);
    setLon(() => lon);

  };

  return (
    <div style={{
      backgroundImage: `url(${BgWeather})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }} className=" h-screen mx-auto " >
      <header className="text-2xl gap-2 h-16 font-medium mb-4 w-full bg-gradient-to-r from-indigo-800 to-blue-800  text-white flex items-center justify-start pl-8">
        <img src={Logo} alt="Icon" className='h-10' />
        <p className="bg-gradient-to-r from-fuchsia-300 to-amber-300 bg-clip-text text-transparent">
          WeatherX
        </p>
      </header>
      <form onSubmit={handleFormSubmit} className="mb-4 gap-4 flex items-center justify-center ">
        {/* Latitude Input */}
        <label className="block mb-2 text-lg font-semibold">
          Latitude
          <input name="latitude" type="number" value={tempCoordinates[0]} onChange={(e) => setTempCoordinates([Number(e.target.value), tempCoordinates[1]])} required className="ml-4 border border-black rounded-md p-2 bg-neutral-100 text-sm font-normal outline-none" />
        </label>
        {/* Longitude Input */}
        <label className="block mb-2 text-lg font-semibold">
          Longitude
          <input name="longitude" type="number" value={tempCoordinates[1]} onChange={(e) => setTempCoordinates([tempCoordinates[0], Number(e.target.value)])} required className="ml-4 border border-black rounded-md p-2 bg-neutral-100 text-sm font-normal outline-none" />
        </label>
        {/* Location input search */}
        <div className=" items-center justify-center inline-flex ">
          <p className='block text-lg mb-2 font-semibold'>Location</p>
          <div className='ml-4 p-1 text-center text-sm'>
            <LocationSearchInput onLocationSelect={handleLocationSelect} />
          </div>
        </div>
        <button type="submit" className="ml-5 mb-2 p-2 px-4 ring-4 ring-emerald-500 ring-offset-2 font-light hover:text-white hover:font-semibold  text-white hover:bg-neutral-700 bg-neutral-800 transition-all rounded-lg">Get Weather</button>
      </form>
      <div className='flex items-end justify-center gap-4 relative z-0 mt-2 '>
        {/* Weather display */}
        <WeatherDisplay lat={lat} lon={lon} />
        {/* Map display */}
        <MapDisplay lat={lat} lon={lon} zoom={13} onMapClick={handleLocationSelect} />
      </div>
      {/* Recent searches */}
      <RecentSearches lat={lat} lon={lon} onLocationSelect={handleLocationSelect} />
    </div>
  );
};

export default App;
