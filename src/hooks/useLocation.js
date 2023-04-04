// import {useEffect, useState} from 'react';
// import Geolocation from 'react-native-geolocation-service';

// const useLocation = () => {
//   const [location, setLocation] = useState({
//     // default to Jakarta
//     longitude: 106.82719,
//     latitude: -6.175395,
//     accuracy: null,
//     altitude: null,
//     altitudeAccuracy: null,
//     heading: null,
//     speed: 0,
//     loading: true,
//   });
//   const [error, setError] = useState(null);
//   const [watchId, setWatchId] = useState(null);

//   const startWatching = () => {
//     const newWatchId = Geolocation.watchPosition(
//       pos => {
//         setLocation({...pos.coords, loading: false});
//       },
//       err => {
//         setError(err);
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 10000,
//         maximumAge: 1000,
//         distanceFilter: 10,
//       },
//     );

//     setWatchId(newWatchId);
//   };

//   useEffect(() => {
//     return () => {
//       if (watchId !== null) {
//         Geolocation.clearWatch(watchId);
//       }
//     };
//   }, [watchId]);

//   return {location, error, startWatching};
// };

// export default useLocation;

import {useEffect, useState} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {useDispatch, useSelector} from 'react-redux';
import {SetCoordinates} from '../redux/slices/sosSlice';

const useLocation = () => {
  const dispatch = useDispatch();
  const [location, setLocation] = useState({
    // default to Jakarta Pusat
    longitude: 106.82719,
    latitude: -6.175395,
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    speed: 0,
  });
  const [error, setError] = useState(null);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      pos => {
        setLocation(pos.coords);
        dispatch(SetCoordinates(pos.coords));
      },
      err => {
        setError(err);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 1000,
      },
    );
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return {...location, error, getCurrentLocation};
};

export default useLocation;
