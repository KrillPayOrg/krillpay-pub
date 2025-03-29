import {NavigationProp, RouteProp} from '@react-navigation/native';
import {FormikErrors, FormikTouched} from 'formik';
import {Children, PropsWithChildren} from 'react';
import {DimensionValue, ViewStyle} from 'react-native';

interface Form extends PropsWithChildren {
  initialValues: {
    [key: string]: number | string | boolean;
  };
  onSubmit: (vals: any) => void;
  validationSchema: any;
  [key: string]: any;
}

interface FormField {
  type?: 'default' | 'phone' | 'date' | 'otp';
  Icon?: any;
  length?: number;
  name: string;
  placeholder?: string;
  label?: string;
  isInfo?: boolean;
  [key: string]: any;
  isTextArea?: boolean;
  maxLength?: number;
}

interface FormSelect {
  /*Commenting the type check due to multiple usage component  */
  // options: {
  //   label: string;
  //   value: string;
  //   image?: string|undefined;
  // }[];
  options: any;
  placeholder?: string;
  label?: string;
  countryList?: boolean;
  name: string;
  valueField?: string;
  labelField?: string;
  disable?: any;
  search?: boolean;
  setSelectedDropDown?: any;
}

interface TextInputField extends Omit<FormField, 'name' | 'isPhone'> {
  onChangeText: (x: any) => void;
  onChangeCountry?: (x: any) => void;
  value: string | undefined;
  width?: DimensionValue;
  isTextArea?: boolean;
  containerStyle?: ViewStyle;
  secureTextEntry?: boolean;
}

interface ErrorMessage {
  visible: boolean | FormikTouched<any> | FormikTouched<any>[] | undefined;
  error?:
    | string
    | FormikErrors<any>
    | string[]
    | FormikErrors<any>[]
    | undefined;
  style?: {[key: string]: any} | null;
}

interface ScreenProps {
  navigation: NavigationProp;
  route: RouteProp;
}
