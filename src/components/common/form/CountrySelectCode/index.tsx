import React from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import styles from '../CountrySelect/styles';
import {FormSelect as Props} from '../../../../../@types/form';
import {useFormikContext} from 'formik';
import {Image, Text, View} from 'react-native';
import ErrorMessage from '../ErrorMessage';
import COLOR from '@kp/constants/colors';

/**
 * CountrySelectCode Component
 * - Custom dropdown for country selection
 * - Displays country name, flag, and currency
 * - Integrates with Formik for form handling
 */
const CountrySelectCode: React.FC<Props> = ({
  options,
  name,
  label,
  placeholder,
  disable,
}) => {
  const {errors, setFieldValue, values, touched} = useFormikContext<any>();

  // Custom render for dropdown items
  const renderItem = (item: any) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.icon} />
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.currency}>{item.currency}</Text>
    </View>
  );

  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <Dropdown
        search
        searchPlaceholder={`Search ${name}`}
        itemTextStyle={styles.dropdownText}
        inputSearchStyle={{color: COLOR.black}}
        selectedTextStyle={styles.selectedText}
        placeholderStyle={styles.placeholder}
        containerStyle={styles.optionContainer}
        style={styles.selectContainer}
        itemContainerStyle={styles.divider}
        iconStyle={[styles.iconStyle, {display: disable ? 'none' : 'flex'}]}
        valueField="value"
        labelField="name"
        placeholder={placeholder}
        data={options}
        value={values[name]?.value || ''}
        renderItem={renderItem} // Use custom render function for each item
        onChange={item => {
          setFieldValue(name, item.value);
        }}
        disable={disable}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  );
};

export default CountrySelectCode;
