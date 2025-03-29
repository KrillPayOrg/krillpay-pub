import {FieldType} from './enum';
import PATHS from './paths';

export const homeScreen = {
  transactionSize: 7,
};

export const transactionHistorySize = 10;

export const reasons = [
  {label: 'Cashless Convenience', value: 'cashLessCon'},
  {label: 'Church Program', value: 'churchProg'},
  {label: 'Community Support', value: 'communitySupp'},
  {label: 'Crowdfunding', value: 'crowdfunding'},
  {label: 'Digital Marketplace Payment', value: 'digitalMarketPay'},
  {label: 'Emergency Transfers', value: 'emergencyTransfers'},
  {label: 'Gifting & Personal Donations', value: 'giftingDonations'},
  {label: 'Gig Economy Payments', value: 'gigPayments'},
  {label: 'Loan Repayment', value: 'loanRepayment'},
  {label: 'Membership Payments', value: 'membershipPay'},
  {label: 'Offerings', value: 'offerings'},
  {label: 'Paying for Goods & Services', value: 'payingGoodsServices'},
  {label: 'Peer-to-Peer Lending', value: 'peerLending'},
  {label: 'Rent & Lease Payments', value: 'rentLeasePay'},
  {label: 'Ride-sharing Cost', value: 'rideShareCost'},
  {label: 'School & Education Payments', value: 'schoolEducationPay'},
  {label: 'Sending to Family & Friends', value: 'sendFamilyFriends'},
  {label: 'Special Giving', value: 'specialGiving'},
  {label: 'Splitting Bills', value: 'splittingBills'},
  {label: 'Thanksgiving', value: 'thanksgiving'},
  {label: 'Tithes', value: 'tithes'},
];

export const individualFormFields = [
  [
    {
      name: 'firstName',
      label: 'First Name',
      placeholder: 'First Name',
    },
    {
      name: 'lastName',
      label: 'Last Name',
      placeholder: 'Last Name',
    },
    {
      name: 'password',
      label: 'Password',
      placeholder: 'Password',
      secureTextEntry: true,
    },
    {
      name: 'confirmPassword',
      label: 'Confirm Password',
      placeholder: 'Confirm Password',
      secureTextEntry: true,
    },
    {
      name: 'email',
      label: 'Email',
      placeholder: 'Email',
    },
  ],
  [
    {
      isInfo: true,
      name: 'krillTag',
      label: 'User ID (KrillTag)',
      placeholder: '@',
    },
    {
      name: 'dob',
      label: 'Date of Birth',
      placeholder: 'Date of Birth',
      type: FieldType.date,
    },
  ],
  [
    // {isGoogle: true},
    {
      name: 'addressLine1',
      label: 'Adress Line 1',
      placeholder: 'Adress Line 1',
    },
    {
      name: 'addressLine2',
      label: 'Adress Line 2',
      placeholder: 'Adress Line 2',
    },
    {
      name: 'country',
      label: 'Country',
      placeholder: 'Country',
      isDropdown: true,
      dropDownType: 'country',
      options: [
        {
          label: 'United States Of America',
          value: 'USA',
          image: PATHS.usaFlag,
        },
        {
          label: 'Nigeria',
          value: 'Nigeria',
          image: PATHS.nairaFlag,
        },
        {
          label: 'South Africa',
          value: 'SouthAfrica',
          image: PATHS.southafrica,
        },
        {
          label: 'Botswana',
          value: 'Botswana',
          image: PATHS.botswana,
        },
        {
          label: 'Gabon',
          value: 'Gabon',
          image: PATHS.gabon,
        },
        {
          label: 'Republic of Congo',
          value: 'Congo',
          image: PATHS.congo,
        },
        {
          label: 'Ghana',
          value: 'Ghana',
          image: PATHS.ghana,
        },
        {
          label: 'Cameroon',
          value: 'Cameroon',
          image: PATHS.cameron,
        },
        {
          label: 'Kenya',
          value: 'Kenya',
          image: PATHS.kenya,
        },
        {
          label: 'Uganda',
          value: 'Uganda',
          image: PATHS.uganda,
        },
        {
          label: 'Rwanda',
          value: 'Rwanda',
          image: PATHS.rwanda,
        },
        {
          label: 'Senegal',
          value: 'Senegal',
          image: PATHS.senegal,
        },
        {
          label: "Cot d'Ivoire",
          value: 'CotdIvoire',
          image: PATHS.cote,
        },
        {
          label: 'Tanzania',
          value: 'Tanzania',
          image: PATHS.tanzania,
        },
        {
          label: 'DR-Congo',
          value: 'DRCongo',
          image: PATHS.drcongo,
        },
        {
          label: 'Zambia',
          value: 'Zambia',
          image: PATHS.zambia,
        },
        {
          label: 'Malawi',
          value: 'Malawi',
          image: PATHS.malawi,
        },
      ],
    },
    {
      name: 'state',
      label: 'State',
      placeholder: 'State',
      isDropdown: true,
      disable: false,
      dropDownType: 'state',
      options: [
        {
          label: 'California',
          value: 'California',
        },
        {
          label: 'Texas',
          value: 'Texas',
        },
      ],
    },
    {
      name: 'city',
      label: 'City',
      placeholder: 'City',
      isDropdown: true,
      disable: false,
      dropDownType: 'city',
      options: [
        {
          label: 'Austin',
          value: 'Austin',
        },
        {
          label: 'Dallas',
          value: 'Dallas',
        },
      ],
    },
    {
      name: 'postalCode',
      label: 'Postal or ZIP Code',
      placeholder: 'Postal or ZIP Code',
    },
  ],
];

export const LoggedInIndividualFormFields = [
  [
    {
      isInfo: true,
      name: 'krillTag',
      label: 'User ID (KrillTag)',
      placeholder: '@',
    },
    {
      name: 'dob',
      label: 'Date of Birth',
      placeholder: 'Date of Birth',
      type: FieldType.date,
    },
  ],
  [
    {
      name: 'addressLine1',
      label: 'Adress Line 1',
      placeholder: 'Adress Line 1',
    },
    {
      name: 'addressLine2',
      label: 'Adress Line 2',
      placeholder: 'Adress Line 2',
    },
    {
      name: 'country',
      label: 'Country',
      placeholder: 'Country',
      isDropdown: true,
      dropDownType: 'country',
      options: [
        {
          label: 'United States Of America',
          value: 'USA',
          image: PATHS.usaFlag,
        },
        {
          label: 'Nigeria',
          value: 'Nigeria',
          image: PATHS.nairaFlag,
        },
        {
          label: 'South Africa',
          value: 'SouthAfrica',
          image: PATHS.southafrica,
        },
        {
          label: 'Botswana',
          value: 'Botswana',
          image: PATHS.botswana,
        },
        {
          label: 'Gabon',
          value: 'Gabon',
          image: PATHS.gabon,
        },
        {
          label: 'Republic of Congo',
          value: 'Congo',
          image: PATHS.congo,
        },
        {
          label: 'Ghana',
          value: 'Ghana',
          image: PATHS.ghana,
        },
        {
          label: 'Cameroon',
          value: 'Cameroon',
          image: PATHS.cameron,
        },
        {
          label: 'Kenya',
          value: 'Kenya',
          image: PATHS.kenya,
        },
        {
          label: 'Uganda',
          value: 'Uganda',
          image: PATHS.uganda,
        },
        {
          label: 'Rwanda',
          value: 'Rwanda',
          image: PATHS.rwanda,
        },
        {
          label: 'Senegal',
          value: 'Senegal',
          image: PATHS.senegal,
        },
        {
          label: "Cot d'Ivoire",
          value: 'CotdIvoire',
          image: PATHS.cote,
        },
        {
          label: 'Tanzania',
          value: 'Tanzania',
          image: PATHS.tanzania,
        },
        {
          label: 'DR-Congo',
          value: 'DRCongo',
          image: PATHS.drcongo,
        },
        {
          label: 'Zambia',
          value: 'Zambia',
          image: PATHS.zambia,
        },
        {
          label: 'Malawi',
          value: 'Malawi',
          image: PATHS.malawi,
        },
      ],
    },
    {
      name: 'state',
      label: 'State',
      placeholder: 'State',
      isDropdown: true,
      disable: false,
      dropDownType: 'state',
      options: [
        {
          label: 'California',
          value: 'California',
        },
        {
          label: 'Texas',
          value: 'Texas',
        },
      ],
    },
    {
      name: 'city',
      label: 'City',
      placeholder: 'City',
      isDropdown: true,
      disable: false,
      dropDownType: 'city',
      options: [
        {
          label: 'Austin',
          value: 'Austin',
        },
        {
          label: 'Dallas',
          value: 'Dallas',
        },
      ],
    },
    {
      name: 'postalCode',
      label: 'Postal or ZIP Code',
      placeholder: 'Postal or ZIP Code',
    },
  ],
];

export const countryList = {
  name: 'otherCountries',
  label: 'Other Countries',
  placeholder: 'Select A Country',
  isSelect: true,
  options: [
    {
      label: 'United States Of America',
      value: 'USA',
      image: PATHS.usaFlag,
    },
    {
      label: 'Nigeria',
      value: 'Nigeria',
      image: PATHS.nairaFlag,
    },
    {
      label: 'South Africa',
      value: 'SouthAfrica',
      image: PATHS.southafrica,
    },
    {
      label: 'Botswana',
      value: 'Botswana',
      image: PATHS.botswana,
    },
    {
      label: 'Gabon',
      value: 'Gabon',
      image: PATHS.gabon,
    },
    {
      label: 'Republic of Congo',
      value: 'Congo',
      image: PATHS.congo,
    },
    {
      label: 'Ghana',
      value: 'Ghana',
      image: PATHS.ghana,
    },
    {
      label: 'Cameroon',
      value: 'Cameroon',
      image: PATHS.cameron,
    },
    {
      label: 'Kenya',
      value: 'Kenya',
      image: PATHS.kenya,
    },
    {
      label: 'Uganda',
      value: 'Uganda',
      image: PATHS.uganda,
    },
    {
      label: 'Rwanda',
      value: 'Rwanda',
      image: PATHS.rwanda,
    },
    {
      label: 'Senegal',
      value: 'Senegal',
      image: PATHS.senegal,
    },
    {
      label: "Cot d'Ivoire",
      value: 'CotdIvoire',
      image: PATHS.cote,
    },
    {
      label: 'Tanzania',
      value: 'Tanzania',
      image: PATHS.tanzania,
    },
    {
      label: 'DR-Congo',
      value: 'DRCongo',
      image: PATHS.drcongo,
    },
    {
      label: 'Zambia',
      value: 'Zambia',
      image: PATHS.zambia,
    },
    {
      label: 'Malawi',
      value: 'Malawi',
      image: PATHS.malawi,
    },
  ],
};

export const supporedCountries = {
  USD: {US: {image: PATHS.usaFlag, value: 'United States', currency: 'USD'}},
  USDC: {
    BW: {image: PATHS.botswana, value: 'Botswana', currency: 'BWP'},
    US: {image: PATHS.usaFlag, value: 'United States', currency: 'USD'},
    CM: {image: PATHS.cameron, value: 'Cameroon', currency: 'XAF'},
    CG: {image: PATHS.congo, value: 'Congo Brazzaville', currency: 'XAF'},
    CD: {image: PATHS.drcongo, value: 'DR Congo', currency: 'CDF'},
    GA: {image: PATHS.gabon, value: 'Gabon', currency: 'XAF'},
    CI: {image: PATHS.ivoryCoast, value: 'Ivory Coast', currency: 'XOF'},
    KE: {image: PATHS.kenya, value: 'Kenya', currency: 'KES'},
    MW: {image: PATHS.malawi, value: 'Malawi', currency: 'MWK'},
    NG: {image: PATHS.nairaFlag, value: 'Nigeria', currency: 'NGN'},
    RW: {image: PATHS.rwanda, value: 'Rwanda', currency: 'RWF'},
    SN: {image: PATHS.senegal, value: 'Senegal', currency: 'XOF'},
    ZA: {image: PATHS.southafrica, value: 'South Africa', currency: 'ZAR'},
    TZ: {image: PATHS.tanzania, value: 'Tanzania', currency: 'TZS'},
    UG: {image: PATHS.uganda, value: 'Uganda', currency: 'UGX'},
    ZM: {image: PATHS.zambia, value: 'Zambia', currency: 'ZMW'},
    ML: {image: PATHS.mali, value: 'Mali', currency: 'XOF'},
    TG: {image: PATHS.togo, value: 'Togo', currency: 'XOF'},
    BF: {image: PATHS.burkinaFaso, value: 'Burkina Faso', currency: 'XOF'},
    BJ: {image: PATHS.benin, value: 'Benin', currency: 'XOF'},
  },
  NGN: {
    NG: {image: PATHS.nairaFlag, value: 'Nigeria', currency: 'NGN'},
    US: {image: PATHS.usaFlag, value: 'United States', currency: 'USD'},
  },
};

export const selectedCountryValues = {
  BW: {image: PATHS.botswana, value: 'Botswana', currency: 'BWP'},
  US: {image: PATHS.usaFlag, value: 'United States', currency: 'USD'},
  CM: {image: PATHS.cameron, value: 'Cameroon', currency: 'XAF'},
  CG: {image: PATHS.congo, value: 'Congo Brazzaville', currency: 'XAF'},
  CD: {image: PATHS.drcongo, value: 'DR Congo', currency: 'CDF'},
  GA: {image: PATHS.gabon, value: 'Gabon', currency: 'XAF'},
  CI: {image: PATHS.ivoryCoast, value: 'Ivory Coast', currency: 'XOF'},
  KE: {image: PATHS.kenya, value: 'Kenya', currency: 'KES'},
  MW: {image: PATHS.malawi, value: 'Malawi', currency: 'MWK'},
  NG: {image: PATHS.nairaFlag, value: 'Nigeria', currency: 'NGN'},
  RW: {image: PATHS.rwanda, value: 'Rwanda', currency: 'RWF'},
  SN: {image: PATHS.senegal, value: 'Senegal', currency: 'XOF'},
  ZA: {image: PATHS.southafrica, value: 'South Africa', currency: 'ZAR'},
  TZ: {image: PATHS.tanzania, value: 'Tanzania', currency: 'TZS'},
  UG: {image: PATHS.uganda, value: 'Uganda', currency: 'UGX'},
  ZM: {image: PATHS.zambia, value: 'Zambia', currency: 'ZMW'},
  ML: {image: PATHS.mali, value: 'Mali', currency: 'XOF'},
  TG: {image: PATHS.togo, value: 'Togo', currency: 'XOF'},
  BF: {image: PATHS.burkinaFaso, value: 'Burkina Faso', currency: 'XOF'},
  BJ: {image: PATHS.benin, value: 'Benin', currency: 'XOF'},
};

export const paymentReasons = {
  name: 'reason',
  placeholder: 'Enter Reason',
  options: [
    {label: 'Gift', value: 'gift'},
    {label: 'Bills', value: 'bills'},
    {label: 'Groceries', value: 'groceries'},
    {label: 'Travel', value: 'travel'},
    {label: 'Health', value: 'health'},
    {label: 'Entertainment', value: 'entertainment'},
    {label: 'Housing', value: 'housing'},
    {label: 'School/Fees', value: 'school/fees'},
    {label: 'Other', value: 'other'},
  ],
};

export const businessFormFields = [
  [
    {
      name: 'firstName',
      label: 'First Name',
      placeholder: 'First Name',
    },
    {
      name: 'lastName',
      label: 'Last Name',
      placeholder: 'Last Name',
    },
    {
      name: 'email',
      label: 'Email',
      placeholder: 'Email',
    },
    {
      name: 'password',
      label: 'Password',
      placeholder: 'Password',
      secureTextEntry: true,
    },
    {
      name: 'confirmPassword',
      label: 'Confirm Password',
      placeholder: 'Confirm Password',
      secureTextEntry: true,
    },
  ],
  [
    {
      isInfo: true,
      name: 'krillTag',
      label: 'Business KrillTag',
      placeholder: '@',
    },
    {
      isTextArea: true,
      name: 'description',
      label: 'Business Description',
      placeholder: 'Start typing from here',
    },
    {
      name: 'displayName',
      label: 'Bussiness Display Name',
      placeholder: 'Bussiness Display Name',
    },

    {
      name: 'businessType',
      label: 'Business Type',
      placeholder: 'Business Type',
      isSelect: true,
      options: [
        {
          label: 'Solo Proprietor',
          value: 'SOLP',
        },
        {
          label: 'Partnership',
          value: 'PART',
        },
        {
          label: 'Corporation',
          value: 'CORP',
        },
        {
          label: 'Nonprofit',
          value: 'NPRO',
        },
      ],
    },
    {
      name: 'businessEmail',
      label: 'Business Email',
      placeholder: 'Business Email',
    },
    {
      name: 'businessPhoneNumber',
      label: 'Business Phone',
      placeholder: 'Business Phone',
      type: 'phone',
    },
  ],
  [
    {
      name: 'legalName',
      label: 'Business Legal Name',
      placeholder: 'Business Legal Name',
    },
    {
      name: 'taxId',
      label: 'Business Tax ID/SSN',
      placeholder: 'Business Tax ID/SSN',
    },
    {
      isSelect: true,
      options: [
        {
          label: 'Association or Club',
          value: 'ASSO',
        },
        {
          label: 'Commercial Equipment and Electronics',
          value: 'COMM',
        },
        {
          label: 'Education and Membership',
          value: 'EDUC',
        },
        {
          label: 'Food and Drinks',
          value: 'FOOD',
        },
        {
          label: 'Health and Wellness',
          value: 'HETH',
        },
        {
          label: 'Home and Repair',
          value: 'HOME',
        },
        {
          label: 'Personal Services',
          value: 'PRSL',
        },
        {
          label: 'Professional Services',
          value: 'PROF',
        },
        {
          label: 'Real Estate and Travel',
          value: 'REAL',
        },
        {
          label: 'Retail',
          value: 'RETL',
        },
        {
          label: 'Sports and Recreation',
          value: 'SPRT',
        },
        {
          label: 'Transportation and Vehicles',
          value: 'TRAN',
        },
      ],
      name: 'businessCategory',
      label: 'Business Category',
      placeholder: 'Business Category',
    },
  ],
];

export const LoggedInBusinessFormFields = [
  [
    {
      isTextArea: true,
      name: 'description',
      label: 'Business Description',
      placeholder: 'Start typing from here',
    },
    {
      name: 'displayName',
      label: 'Bussiness Display Name',
      placeholder: 'Bussiness Display Name',
    },
    {
      name: 'businessType',
      label: 'Business Type',
      placeholder: 'Business Type',
      isSelect: true,
      options: [
        {
          label: 'Solo Proprietor',
          value: 'SOLP',
        },
        {
          label: 'Partnership',
          value: 'PART',
        },
        {
          label: 'Corporation',
          value: 'CORP',
        },
        {
          label: 'Nonprofit',
          value: 'NPRO',
        },
      ],
    },
    {
      name: 'businessEmail',
      label: 'Business Email',
      placeholder: 'Business Email',
    },
    {
      name: 'businessPhoneNumber',
      label: 'Business Phone',
      placeholder: 'Business Phone',
      type: 'phone',
    },
  ],
  [
    {
      name: 'legalName',
      label: 'Business Legal Name',
      placeholder: 'Business Legal Name',
    },
    {
      name: 'taxId',
      label: 'Business Tax ID/SSN',
      placeholder: 'Business Tax ID/SSN',
    },
    {
      isSelect: true,
      options: [
        {
          label: 'Association or Club',
          value: 'ASSO',
        },
        {
          label: 'Commercial Equipment and Electronics',
          value: 'COMM',
        },
        {
          label: 'Education and Membership',
          value: 'EDUC',
        },
        {
          label: 'Food and Drinks',
          value: 'FOOD',
        },
        {
          label: 'Health and Wellness',
          value: 'HETH',
        },
        {
          label: 'Home and Repair',
          value: 'HOME',
        },
        {
          label: 'Personal Services',
          value: 'PRSL',
        },
        {
          label: 'Professional Services',
          value: 'PROF',
        },
        {
          label: 'Real Estate and Travel',
          value: 'REAL',
        },
        {
          label: 'Retail',
          value: 'RETL',
        },
        {
          label: 'Sports and Recreation',
          value: 'SPRT',
        },
        {
          label: 'Transportation and Vehicles',
          value: 'TRAN',
        },
      ],
      name: 'businessCategory',
      label: 'Business Category',
      placeholder: 'Business Category',
    },
    {
      isInfo: true,
      name: 'krillTag',
      label: 'Business KrillTag',
      placeholder: '@',
    },
  ],
];
