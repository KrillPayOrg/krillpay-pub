import React from 'react';
import {G, Svg, Path} from 'react-native-svg';

const LockIcon = () => {
  return (
    <Svg width="21" height="21" viewBox="0 0 21 21" fill="none">
      <G opacity="0.5">
        <Path
          d="M14.6384 7.93131V6.14215C14.6384 4.04798 12.9401 2.34965 10.8459 2.34965C8.75176 2.34048 7.04676 4.03048 7.0376 6.12548V6.14215V7.93131"
          stroke="#232360"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.0216 17.7662H7.65414C5.90914 17.7662 4.49414 16.3521 4.49414 14.6062V11.0321C4.49414 9.28624 5.90914 7.87207 7.65414 7.87207H14.0216C15.7666 7.87207 17.1816 9.28624 17.1816 11.0321V14.6062C17.1816 16.3521 15.7666 17.7662 14.0216 17.7662Z"
          stroke="#232360"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M10.8381 11.8936V13.7444"
          stroke="#232360"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
};

export default LockIcon;
