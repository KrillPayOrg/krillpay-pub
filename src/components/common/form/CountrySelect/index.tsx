import React from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import styles from './styles';
import {FormSelect as Props} from '../../../../../@types/form';
import {useFormikContext} from 'formik';
import {Text, View} from 'react-native';
import ErrorMessage from '../ErrorMessage';
import COLOR from '@kp/constants/colors';

/**
 * CountrySelect Component
 * - Custom dropdown component for selecting a country
 * - Integrates with Formik for form state management
 * - Displays validation errors using ErrorMessage
 */
const CountrySelect: React.FC<Props> = ({
  options,
  name,
  label,
  placeholder,
  disable,
  setSelectedDropDown,
}) => {
  const {errors, setFieldValue, values, touched} = useFormikContext<any>();

  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <Dropdown
        search={true}
        searchPlaceholder={`Search ${name}`}
        itemTextStyle={styles.dropdownText}
        inputSearchStyle={{color: COLOR.black}}
        selectedTextStyle={styles.selectedText}
        placeholderStyle={styles.placeholder}
        containerStyle={styles.optionContainer}
        style={styles.selectContainer}
        itemContainerStyle={styles.divider}
        iconStyle={[styles.iconStyle, {display: disable ? 'none' : 'flex'}]}
        valueField={'name'}
        labelField={'name'}
        placeholder={placeholder}
        data={options}
        value={values[name]}
        onChange={item => {
          setFieldValue(name, item.name);
          setSelectedDropDown({name: name, item});
        }}
        disable={disable}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  );
};

export default CountrySelect;
