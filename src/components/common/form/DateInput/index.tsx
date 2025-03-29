import React, {useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';

import {TextInputField} from '../../../../../@types/form';
import styles from './styles';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {getTimestampOfYears} from '@kp/utils/common';

const DateInput = ({
  style,
  Icon,
  onChangeText,
  placeholder,
  value,
  width = '100%',
  ...otherProps
}: TextInputField) => {
  const [open, setOpen] = useState(false);
  // Toggle modal visibility
  const toggleOpen = () => setOpen(prev => !prev);

  const maxDate = Date.now() - getTimestampOfYears(18);
  const minDate = Date.now() - getTimestampOfYears(100);

  const handleConfirm = (date: Date) => {
    const dateStr = moment(date).format('DD-MM-yyyy');
    onChangeText(dateStr);
    toggleOpen();
  };

  return (
    <>
      <TouchableOpacity
        onPress={toggleOpen}
        style={[styles.container, {width}]}>
        {Icon && <Icon />}

        <Text
          style={[
            styles.text,
            style,
            !value && styles.placeholder,
            {marginLeft: Icon ? 10 : 0},
          ]}
          {...otherProps}>
          {value?.toString() || placeholder || ''}
        </Text>
      </TouchableOpacity>
      <DateTimePicker
        isVisible={open}
        mode="date"
        maximumDate={new Date(maxDate)}
        minimumDate={new Date(minDate)}
        onConfirm={handleConfirm}
        onCancel={toggleOpen}
      />
    </>
  );
};

export default DateInput;
