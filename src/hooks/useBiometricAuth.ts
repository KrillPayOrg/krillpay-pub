import {showToast} from '@kp/utils/common';
import {BiometricTypeEnum} from '../../@types/enum';
import {useState, useEffect} from 'react';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';

const useBiometricAuth = () => {
  const rnBiometrics = new ReactNativeBiometrics();
  const [bioType, setBioType] = useState<BiometricTypeEnum>(
    BiometricTypeEnum.NotSupported,
  );

  useEffect(() => {
    rnBiometrics.isSensorAvailable().then(({available, biometryType}) => {
      if (available && biometryType === BiometryTypes.TouchID) {
        setBioType(BiometricTypeEnum.TouchId);
      } else if (available && biometryType === BiometryTypes.FaceID) {
        setBioType(BiometricTypeEnum.FaceId);
      } else if (available && biometryType === BiometryTypes.Biometrics) {
        setBioType(BiometricTypeEnum.Boimetrics);
      } else {
        setBioType(BiometricTypeEnum.NotSupported);
      }
    });
  }, []);

  const createSignature = async () => {
    rnBiometrics.createKeys().then(resultObject => {
      const {publicKey} = resultObject;
    });
  };

  const ifKeyExist = async () => {
    const {keysExist} = await rnBiometrics.biometricKeysExist();
    if (keysExist) return true;
    else return false;
  };

  const createKeys = async () => {
    const {publicKey} = await rnBiometrics.createKeys();
    return publicKey;
  };

  const deleteKeys = async () => {
    rnBiometrics.deleteKeys().then(resultObject => {
      const {keysDeleted} = resultObject;

      if (keysDeleted) {
        console.log('Successful deletion');
      } else {
        console.log(
          'Unsuccessful deletion because there were no keys to delete',
        );
      }
    });
  };

  const authenticate = async () => {
    if (bioType === BiometricTypeEnum.NotSupported) {
      showToast('Biometric not supported');
      return false;
    }
    const rnBiometrics = new ReactNativeBiometrics();
    return rnBiometrics
      .simplePrompt({promptMessage: 'Confirm fingerprint'})
      .then(({success}) => {
        if (success) {
          return true;
        }
      })
      .catch(() => {
        return false;
      });
  };

  return {
    bioType,
    authenticate,
    ifKeyExist,
    createSignature,
    deleteKeys,
    createKeys,
  };
};

export default useBiometricAuth;
