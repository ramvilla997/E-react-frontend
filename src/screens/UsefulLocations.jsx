import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, InfoWindow, LoadScript } from "@react-google-maps/api";
import { List, Select } from 'antd';
import '../styles/screens/UsefulLocations.css';

const libraries = ['places', 'geometry'];

function UsefulLocations() {
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({ lat: 45.422, lng: -75.682 });
  const [markers, setMarkers] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [searchType, setSearchType] = useState('hospital');

  useEffect(() => {
    if (!map) return;

    const searchNearby = (map, center, type) => {
      const service = new window.google.maps.places.PlacesService(map);
      service.nearbySearch(
        {
          location: center,
          radius: 5000,
          keyword: [type]
        },
        (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            const placesWithDistance = results.map(place => {
              const distance = calculateDistance(place.geometry.location);
              return {
                ...place,
                distance,
              };
            });

            const sortedPlaces = placesWithDistance.sort((a, b) => a.distance - b.distance);

            setMarkers(sortedPlaces); // Use sortedPlaces instead of results
          }
        }
      );
    };

    // This function will run when the component mounts and when the searchType state changes
    searchNearby(map, center, searchType);
  }, [map, searchType]);

  const calculateDistance = (placeLocation) => {
    if (!center || !placeLocation) {
      return "N/A";
    }
    const { lat, lng } = center;
    const centerLatLng = new window.google.maps.LatLng(lat, lng);
    const placeLatLng = new window.google.maps.LatLng(placeLocation.lat(), placeLocation.lng());

    const distance = window.google.maps.geometry.spherical.computeDistanceBetween(centerLatLng, placeLatLng);
    return (distance / 1000).toFixed(2);
  };


  const handleCategoryChange = (type) => {
    setSearchType(type);
  };

  return (
    <div className="emergency-locations">
      <h1 className="emergency-locations__title">Healthcare Useful Locations</h1>
      <div className="emergency-locations__description">
        <p>
          Locating the nearest healthcare useful locations to you.
        </p>
        <div className="category-select">
          <Select
            defaultValue="hospital"
            style={{ width: 200 }}
            onChange={handleCategoryChange}
          >
            <Select.Option value="hospital">Hospital</Select.Option>
            <Select.Option value="pharmacy">Pharmacy</Select.Option>
            <Select.Option value="clinic">Clinic</Select.Option>
            <Select.Option value="walk_in_clinic">Walk in Clinic</Select.Option>
            <Select.Option value="optometry">Optometry</Select.Option>
            <Select.Option value="lab">Labs</Select.Option>
            <Select.Option value="x_rays">X-rays</Select.Option>
            <Select.Option value="ambulance">Ambulance</Select.Option>
            <Select.Option value="medical_equipment">Medical Equipment</Select.Option>
            <Select.Option value="psychologist">Psychologist</Select.Option>
            <Select.Option value="social_worker">Social Worker</Select.Option>
            <Select.Option value="vision_care">Vision Care</Select.Option>
            <Select.Option value="massage_therapist">Massage Therapist</Select.Option>
            <Select.Option value="physiotherapist">Physiotherapist</Select.Option>
            <Select.Option value="chiropractor">Chiropractor</Select.Option>
            <Select.Option value="speech_therapist">Speech Therapist</Select.Option>
            <Select.Option value="dentist">Dentist</Select.Option>
          </Select>
        </div>
      </div>
      <div className="emergency-locations__container">
        <LoadScript
          googleMapsApiKey="AIzaSyD3cMM5gT7G3Gz1kVnuVb-6Yp4liQ2_-bM"
          libraries={libraries}
        >
          <GoogleMap
            mapContainerClassName="emergency-locations__map"
            center={center}
            zoom={15}
            onLoad={(map) => setMap(map)}
          >
            {markers.map((place, index) => (
              <Marker
                key={index}
                position={place.geometry.location}
                onClick={() => setSelectedPlace(place)}
              />
            ))}
            {selectedPlace && (
              <InfoWindow
                position={selectedPlace.geometry.location}
                onCloseClick={() => setSelectedPlace(null)}
              >
                <div>
                  <h2>{selectedPlace.name}</h2>
                  <p>{selectedPlace.vicinity}</p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
        <div className="emergency-locations__list-container">
          <List
            itemLayout="horizontal"
            dataSource={markers}
            renderItem={(place) => (
              <List.Item onClick={() => setSelectedPlace(place)}>
                <List.Item.Meta
                  title={place.name}
                  description={`${place.vicinity} - ${place.distance} km`}
                />
              </List.Item>
            )}
            style={{ width: '100%', maxHeight: '90vh', overflowY: 'auto' }}
          />
        </div>
      </div>
    </div>
  );
}

export default UsefulLocations;
