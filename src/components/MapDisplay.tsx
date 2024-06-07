import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import PropTypes from 'prop-types';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet'
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
        <MapContainer center={position} zoom={zoom} className="z-0 h-[250px] w-[380px] sm:h-[300px] sm:w-[500px] mx-auto md:mx-0 md:h-[300px] md:w-[450px] lg:h-[400px] lg:w-[600px] rounded-xl md:mr-4 " scrollWheelZoom>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })} position={position} />
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
