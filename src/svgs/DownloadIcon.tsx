import React from 'react';
import {Path, Svg} from 'react-native-svg';

const DownloadIcon: React.FC<DownloadIcon> = ({rotate = '0deg'}) => {
  return (
    <Svg
      style={{transform: [{rotate}]}}
      width="17"
      height="20"
      viewBox="0 0 17 20"
      fill="none">
      <Path
        d="M10.6 16.6L8.2264 19L5.8 16.6M8.2 19V8.2M4.6 14.2H3.4C2.76348 14.2 2.15303 13.9471 1.70294 13.4971C1.25286 13.047 1 12.4365 1 11.8V3.4C1 2.76348 1.25286 2.15303 1.70294 1.70294C2.15303 1.25286 2.76348 0.999999 3.4 0.999999H13C13.6365 0.999999 14.247 1.25286 14.6971 1.70294C15.1471 2.15303 15.4 2.76348 15.4 3.4V11.8C15.4 12.4365 15.1471 13.047 14.6971 13.4971C14.247 13.9471 13.6365 14.2 13 14.2H11.8"
        stroke="#42AB9C"
        stroke-width="1.3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default DownloadIcon;
