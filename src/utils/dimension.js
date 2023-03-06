import { Dimensions, Platform } from "react-native";

export const WIDTH = Platform.OS === 'ios' ? Dimensions.get('window').width : Dimensions.get('screen').width
export const HEIGHT = Platform.OS === 'ios' ? Dimensions.get('window').height : Dimensions.get('screen').height