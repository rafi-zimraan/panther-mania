import {useEffect, useState} from 'react';
import Geolocation from 'react-native-geolocation-service';

const useLocation = () => {
  const [location, setLocation] = useState({
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    // default to Jakarta
    longitude: 106.82719,
    latitude: -6.175395,
    speed: 0,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      pos => {
        setLocation(pos.coords);
      },
      err => {
        setError(err);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 1000,
        distanceFilter: 10,
      },
    );

    return () => Geolocation.clearWatch(watchId);
  }, []);

  return {location, error};
};

export default useLocation;
