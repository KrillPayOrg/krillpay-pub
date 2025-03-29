import React from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import styles from './styles';
import {FormSelect as Props} from '../../../../../@types/form';
import {useFormikContext} from 'formik';
import {Text, View} from 'react-native';
import ErrorMessage from '../ErrorMessage';

/**
 * FormSelect Component
 * - A reusable dropdown select field integrated with Formik
 * - Displays validation errors using ErrorMessage
 * - Supports custom styling and label display
 */
const FormSelect: React.FC<Props> = ({options, name, label, placeholder}) => {
  const {errors, setFieldValue, values, touched} = useFormikContext<any>();
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <Dropdown
        itemTextStyle={styles.dropdownText}
        selectedTextStyle={styles.selectedText}
        placeholderStyle={styles.placeholder}
        containerStyle={styles.optionContainer}
        style={styles.selectContainer}
        itemContainerStyle={styles.divider}
        valueField={'value'}
        labelField={'label'}
        placeholder={placeholder}
        data={options}
        value={values[name]}
        onChange={item => setFieldValue(name, item.value)}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  );
};

export default FormSelect;
