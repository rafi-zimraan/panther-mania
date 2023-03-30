import {useEffect, useState} from 'react';
import {PermissionsAndroid} from 'react-native';

const usePermission = permission => {
  const [granted, setGranted] = useState(false);

  const requestPermission = async () => {
    try {
      const result = await PermissionsAndroid.request(permission);
      if (result === PermissionsAndroid.RESULTS.GRANTED) {
        setGranted(true);
      } else {
        setGranted(false);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    requestPermission();
  }, [permission]);

  return {granted, requestPermission};
};

export default usePermission;
