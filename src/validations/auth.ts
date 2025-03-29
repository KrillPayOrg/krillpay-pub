import * as Yup from 'yup';

export const contactUsSchema = Yup.object().shape({
  message: Yup.string()
    .min(10, 'Minimum 10 characters')
    .max(1000, '1000 Characters max')
    .required('Message is required'),
});
export const commetSchema = Yup.object().shape({
  comments: Yup.string()
    .min(10, 'Minimum 10 characters')
    .max(250, '250 Characters max')
    .required('Comment is required'),
});

export const loginSchema = Yup.object().shape({
  mobileNumber: Yup.string().required('Phone number is required'),
  password: Yup.string().required('Password is required'),
});

export const resetPasswordScheme = Yup.object().shape({
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/,
      'Password must contain at least one uppercase letter and one special character',
    ),
});

export const resetPasswordValidation = Yup.object().shape({
  currentPassword: Yup.string().required('Current Password is required'),
  newPassword: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/,
      'Password must contain at least one uppercase letter and one special character',
    ),
  confirmNewPassword: Yup.string().required('Confirm Password is required'),
});

export const createPasswordScheme = Yup.object().shape({
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/,
      'Password must contain at least one uppercase letter and one special character',
    ),
  confirmPassword: Yup.string().required('Password is required'),
});

export const phoneSchema = Yup.object().shape({
  mobileNumber: Yup.number().required('Phone number is required'),
});

export const otpSchema = Yup.object().shape({
  otp: Yup.number()
    .typeError('OTP Must Be A Number')
    .min(6, 'OTP Must Be 6 Digits')
    .required('OTP is required'),
});

export const pinSchema = Yup.object().shape({
  pin: Yup.string()
    .typeError('Pin Must Be A Number')
    .min(4, 'Pin Must Be 4 Digits')
    .required('Pin is required'),
});

export const IndividualSignUp = [
  Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short! First Name Should be more than 2 characters')
      .max(50, 'Too Long! First Name Should be less than 50 characters')
      .required('First Name Is Required'),
    lastName: Yup.string()
      .min(2, 'Too Short! Last Name Should be more than 2 characters')
      .max(50, 'Too Long! Last Name Should be less than 50 characters')
      .required('Last Name Is Required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters long')
      .matches(
        /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/,
        'Password must contain at least one uppercase letter and one special character',
      ),
    confirmPassword: Yup.string().required('Password is required'),
    email: Yup.string()
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email address.',
      )
      .required('Email Is Required'),
  }),
  Yup.object().shape({
    krillTag: Yup.string()
      .required('UserID Is Required')
      .min(2, 'Too Short! KrillTag Should be more than 2 characters')
      .max(20, 'Too Long! KrillTag Should be less than 20 characters')
      .matches(
        /^[a-zA-Z0-9@]*$/,
        'KrillTag must be alphanumeric, no special characters are allowed',
      ),
    dob: Yup.date().required('Date Of Birth Is Required'),
  }),
  Yup.object().shape({
    addressLine1: Yup.string().required('Address Is Required'),
    city: Yup.string().required('City Is Required'),
    country: Yup.string().required('Country Is Required'),
    state: Yup.string().required('State Is Required'),
    postalCode: Yup.number()
      .typeError('Postal Or Zip Code Must Be Number')
      .required('Postal Or Zip Code Is Required'),
  }),
];

export const IndividualNigerianSignUp = [
  Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short! First Name Should be more than 2 characters')
      .max(50, 'Too Long! First Name Should be less than 50 characters')
      .required('First Name Is Required'),
    lastName: Yup.string()
      .min(2, 'Too Short! Last Name Should be more than 2 characters')
      .max(50, 'Too Long! Last Name Should be less than 50 characters')
      .required('Last Name Is Required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters long')
      .matches(
        /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/,
        'Password must contain at least one uppercase letter and one special character',
      ),
    confirmPassword: Yup.string().required('Password is required'),
    email: Yup.string().required('Email Is Required'),
  }),
  Yup.object().shape({
    krillTag: Yup.string()
      .required('UserID Is Required')
      .min(2, 'Too Short! KrillTag Should be more than 2 characters')
      .max(20, 'Too Long! KrillTag Should be less than 20 characters')
      .matches(
        /^[a-zA-Z0-9@]*$/,
        'KrillTag must be alphanumeric, no special characters are allowed',
      ),
    dob: Yup.date().required('Date Of Birth Is Required'),
    bvn: Yup.string().required('BVN Is Required'),
  }),
  Yup.object().shape({
    addressLine1: Yup.string()
      .required('Address Is Required')
      .min(2, 'Too Short! First Address Should be more than 2 characters')
      .max(50, 'Too Long! First Address Should be less than 50 characters'),
    city: Yup.string().required('City Is Required'),
    country: Yup.string().required('Country Is Required'),
    state: Yup.string().required('State Is Required'),
    postalCode: Yup.number()
      .typeError('Postal Or Zip Code Must Be Number')
      .required('Postal Or Zip Code Is Required'),
  }),
];

export const BusinessSignUp = [
  Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short! First Name Should be more than 2 characters')
      .max(50, 'Too Long! First Name Should be less than 50 characters')
      .required('First Name Is Required'),
    lastName: Yup.string()
      .min(2, 'Too Short! Last Name Should be more than 2 characters')
      .max(50, 'Too Long! Last Name Should be less than 50 characters')
      .required('Last Name Is Required'),
    email: Yup.string().required('Email Is Required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters long')
      .matches(
        /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/,
        'Password must contain at least one uppercase letter and one special character',
      ),
    confirmPassword: Yup.string().required('Password is required'),
  }),
  Yup.object().shape({
    krillTag: Yup.string()
      .required('Business ID Is Required')
      .min(2, 'Too Short! KrillTag Should be more than 2 characters')
      .max(20, 'Too Long! KrillTag Should be less than 20 characters')
      .matches(
        /^[a-zA-Z0-9@]*$/,
        'KrillTag must be alphanumeric, no special characters are allowed',
      ),
    description: Yup.string().required('Business Description Is Required'),
    displayName: Yup.string().required('Business Display Name Is Required'),
    businessType: Yup.string().required('Business Type Is Required'),
    businessEmail: Yup.string().required('Business Email Is Required'),
    businessPhoneNumber: Yup.string().required('Business Phone Is Required'),
  }),
  Yup.object().shape({
    legalName: Yup.string().required('Business Legal Name Is Required'),
    taxId: Yup.string().required('Business Tax ID Is Required'),
    businessCategory: Yup.string().required('Business Category Is Required'),
  }),
];

export const LoggedInIndividualSignUp = [
  Yup.object().shape({
    krillTag: Yup.string()
      .required('UserID Is Required')
      .min(2, 'Too Short! KrillTag Should be more than 2 characters')
      .max(20, 'Too Long! KrillTag Should be less than 20 characters')
      .matches(
        /^[a-zA-Z0-9@]*$/,
        'KrillTag must be alphanumeric, no special characters are allowed',
      ),
    dob: Yup.date().required('Date Of Birth Is Required'),
  }),
  Yup.object().shape({
    addressLine1: Yup.string().required('Address Is Required'),
    city: Yup.string().required('City Is Required'),
    country: Yup.string().required('Country Is Required'),
    state: Yup.string().required('State Is Required'),
    postalCode: Yup.number()
      .typeError('Postal Or Zip Code Must Be Number')
      .required('Postal Or Zip Code Is Required'),
  }),
];

export const LoggedInBusinessSignUp = [
  Yup.object().shape({
    description: Yup.string().required('Business Description Is Required'),
    displayName: Yup.string().required('Business Display Name Is Required'),
    businessType: Yup.string().required('Business Type Is Required'),
    businessEmail: Yup.string().required('Business Email Is Required'),
    businessPhoneNumber: Yup.string().required('Business Phone Is Required'),
  }),
  Yup.object().shape({
    legalName: Yup.string().required('Business Legal Name Is Required'),
    taxId: Yup.string().required('Business Tax ID Is Required'),
    businessCategory: Yup.string().required('Business Category Is Required'),
    krillTag: Yup.string()
      .required('Business ID Is Required')
      .min(2, 'Too Short! KrillTag Should be more than 2 characters')
      .max(20, 'Too Long! KrillTag Should be less than 20 characters')
      .matches(
        /^[a-zA-Z0-9@]*$/,
        'KrillTag must be alphanumeric, no special characters are allowed',
      ),
  }),
];
