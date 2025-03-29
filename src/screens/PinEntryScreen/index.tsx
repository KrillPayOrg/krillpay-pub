import Header from '@kp/components/common/Header';
import {COMMON} from '@kp/constants/appText';
import {NavigationProp} from '@react-navigation/native';
import {Image, Text, View} from 'react-native';
import styles from './styles';
import PATHS from '@kp/constants/paths';
import Form from '@kp/components/common/form/Form';
import FormikTextInput from '@kp/components/common/form/FormikTextInput';
import {ButtonT, FieldType} from '@kp/constants/enum';
import Button from '@kp/components/common/Button';
import {pinSchema} from '@kp/validations/auth';
import {useState} from 'react';

interface Props {
  navigation: NavigationProp<any>;
  route: any;
}

/**
 * PinEntry
 * - Screen for entering a PIN to complete a transaction
 * - Validates PIN input and submits it for verification
 */
const PinEntry = ({navigation, route}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [disable, setDisable] = useState<boolean>(false);

  const {handlePinSubmit} = route.params;

  /**
   * goBack
   * - Navigates back to the previous screen
   */
  const goBack = () => {
    navigation.goBack();
  };


  /**
   * handleSubmit
   * - Handles PIN submission
   * - Calls the provided handlePinSubmit function with form values
   */

  const handleSubmit = async (val: any) => {
    setDisable(true);
    try {
      await handlePinSubmit(val, setIsLoading);
      setDisable(false);
    } catch (error) {
      console.log(error);
      setDisable(false);
    }

  };
  return (
    <View style={styles.container}>
      <Header
        title={COMMON.Pin}
        style={styles.header}
        isBackButton
        isLeftTitle
        goBack={goBack}
      />
      <View style={styles.mainContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.logo} source={PATHS.pin} />
        </View>
        <View style={styles.top}>
          <Text style={styles.boldText}>{COMMON.enterPin}</Text>
          <Text style={styles.lightText}>{COMMON.toCompleteTransaction}</Text>
        </View>
        <View style={styles.otpContainer}>
          <Form
            initialValues={{pin: ''}}
            onSubmit={handleSubmit}
            validationSchema={pinSchema}>
            <FormikTextInput
              type={FieldType.otp}
              name="pin"
              length={4}
              placeholder={COMMON.mobileNmber}
            />
            <Button
              disabled={isLoading || disable}
              style={isLoading ? styles.disableStyles : styles.mt90}
              title={COMMON.next}
              type={ButtonT.submit}
              isLoading={isLoading}
            />
          </Form>
        </View>
      </View>
    </View>
  );
};

export default PinEntry;
