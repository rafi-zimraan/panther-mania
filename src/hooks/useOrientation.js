import {Dimensions} from 'react-native';
import React from 'react';

export default function useOrientation() {
  const [screenInfo, setScreenInfo] = React.useState(Dimensions.get('screen'));
  React.useEffect(() => {
    let dimensionsHandler = Dimensions.addEventListener('change', result => {
      setScreenInfo(result.screen);
    });
    return () => dimensionsHandler.remove();
  }, []);

  return {...screenInfo, isPortrait: screenInfo.height > screenInfo.width};
}
