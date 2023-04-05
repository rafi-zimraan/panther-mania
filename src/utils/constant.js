import {PermissionsAndroid} from 'react-native';

// Permissions Android
const Permit = PermissionsAndroid.PERMISSIONS;
export const AccessFineLocation = Permit.ACCESS_FINE_LOCATION;
export const AccessCoarseLocation = Permit.ACCESS_COARSE_LOCATION;
export const PermissionCamera = Permit.CAMERA;

// Colors
export const colors = {
  primary: '#183240',
  destroy: 'tomato',
};

// Storage key
export const storage_keys = {
  user_credential: 'user_credential',
};
