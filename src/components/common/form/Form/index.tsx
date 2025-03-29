import React from 'react';
import {Formik} from 'formik';
import {Form as FormProps} from '../../../../../@types/form';

const Form = ({
  children,
  initialValues,
  onSubmit,
  validationSchema,
  ...otherProps
}: FormProps) => (
  <Formik
    enableReinitialize
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
    {...otherProps}>
    {() => <>{children}</>}
  </Formik>
);

export default Form;
