import React from 'react';
import {Path, Svg} from 'react-native-svg';

const NotificationIcon = () => {
  return (
    <Svg width="22" height="25" viewBox="0 0 22 25" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.1289 19.4343C15.7681 19.4343 18.377 18.7109 18.6289 15.8072C18.6289 12.9055 16.8101 13.0921 16.8101 9.53178C16.8101 6.75081 14.1741 3.58667 10.1289 3.58667C6.08368 3.58667 3.44775 6.75081 3.44775 9.53178C3.44775 13.0921 1.62891 12.9055 1.62891 15.8072C1.88186 18.7219 4.49068 19.4343 10.1289 19.4343Z"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M12.5178 22.4439C11.1536 23.9586 9.02562 23.9766 7.64844 22.4439"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default NotificationIcon;
