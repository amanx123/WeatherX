import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import PropTypes from 'prop-types';

interface MapProps {
    lat: number;
    lon: number;
    zoom: number;
    onMapClick: (lat: number, lon: number) => void;
}

const MapEvents: React.FC<{ onMapClick: (lat: number, lon: number) => void }> = ({ onMapClick }) => {
    const map = useMapEvents({
        click: (e) => {
            map.flyTo(e.latlng, map.getZoom())
            onMapClick(e.latlng.lat, e.latlng.lng);
        }
    });
    return null;
};
const UpdateView: React.FC<{ lat: number; lon: number }> = ({ lat, lon }) => {
    const map = useMap();
    useEffect(() => {
        map.flyTo([lat, lon], map.getZoom())
    }, [lat, lon]);
    return null;
};
const MapDisplay: React.FC<MapProps> = ({ lat, lon, zoom, onMapClick }) => {
    const [position, setPosition] = useState<[number, number]>([lat, lon]);

    useEffect(() => {
        setPosition([lat, lon]);
    }, [lat, lon]);

    return (
        <MapContainer center={position} zoom={zoom} className="h-[350px] w-[600px] rounded-xl" scrollWheelZoom>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} />
            <MapEvents onMapClick={(lat, lon) => {
                setPosition([lat, lon]);
                onMapClick(lat, lon);
            }} />
            <UpdateView lat={lat} lon={lon} />
        </MapContainer>
    );
};

MapDisplay.propTypes = {
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired,
    zoom: PropTypes.number.isRequired,
    onMapClick: PropTypes.func.isRequired,
};

export default MapDisplay;
