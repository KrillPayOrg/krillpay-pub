import React from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import styles from './styles';
import {FormSelect as Props} from '../../../../../@types/form';
import {useFormikContext} from 'formik';
import {Text, View} from 'react-native';
import ErrorMessage from '../ErrorMessage';
import COLOR from '@kp/constants/colors';

/**
 * FormSelectObject Component
 * - A reusable dropdown component for selecting objects
 * - Integrated with Formik for form state management
 * - Supports search, disabling, and custom value/label fields
 */
const FormSelectObject: React.FC<Props> = ({
  options,
  name,
  label,
  placeholder,
  valueField,
  labelField,
  disable = false,
  search = false,
}) => {
  const {errors, setFieldValue, values, touched} = useFormikContext<any>();
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <Dropdown
        search={search}
        iconStyle={{display: disable ? 'none' : 'flex'}}
        disable={disable}
        itemTextStyle={styles.dropdownText}
        inputSearchStyle={{color: COLOR.black}}
        selectedTextStyle={styles.selectedText}
        placeholderStyle={styles.placeholder}
        containerStyle={styles.optionContainer}
        style={styles.selectContainer}
        itemContainerStyle={styles.divider}
        valueField={valueField ? valueField : 'value'}
        labelField={labelField ? labelField : 'label'}
        placeholder={placeholder}
        data={options}
        value={values[name]}
        onChange={item => {
          setFieldValue(name, item);
        }}
        searchPlaceholder="Search bank"
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  );
};

export default FormSelectObject;
