import React, { useState } from 'react';
import axios from 'axios'
interface LocationSearchInputProps {
    onLocationSelect: (lat: number, lon: number) => void;
}

const LocationSearchInput: React.FC<LocationSearchInputProps> = ({ onLocationSelect }) => {
    const [query, setQuery] = useState<string>('');
    const [suggestions, setSuggestions] = useState<any[]>([]);

    const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setQuery(value);

        if (value.length > 2) {
            const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${value}`);
            const results = await response.data;
            setSuggestions(results);
        } else {
            setSuggestions([]);
        }
    };

    const handleSelect = (lat: number, lon: number) => {
        onLocationSelect(lat, lon);
        setQuery('');
        setSuggestions([]);
    };

    return (
        <div className="relative z-20">
            <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Search Places..."
                className="ml-0 border border-black rounded-md p-2 bg-neutral-100 text-sm font-normal outline-none w-full md:w-auto"
            />
            {suggestions.length > 0 && (
                <div className="absolute z-50 w-full bg-white border border-neutral-300 rounded">
                    {suggestions.map((suggestion) => (
                        <div
                            key={suggestion.place_id}
                            className="p-2 bg-white cursor-pointer hover:bg-neutral-200"
                            onClick={() => handleSelect(parseFloat(suggestion.lat), parseFloat(suggestion.lon))}
                        >
                            {suggestion.display_name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LocationSearchInput;
