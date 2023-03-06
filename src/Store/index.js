import React from 'react';
import {GlobalProvider} from './globalContext';

// combine all providers
const providers = [GlobalProvider];
const AppContextProvider = ({children}) => {
  return providers.reduceRight((acc, Comp) => {
    return <Comp>{acc}</Comp>;
  }, children);
};

export default AppContextProvider;
