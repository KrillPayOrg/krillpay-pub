import {Dimensions} from 'react-native';
const {width} = Dimensions.get('screen');

export const dialPadContent = [1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, 'X'];

export const dialPadWidth = width * 0.15;
export const dialPadTextSize = dialPadWidth * 0.5;
