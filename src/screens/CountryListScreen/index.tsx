import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {styles} from './styles';
import {supporedCountries} from '@kp/constants';
import {ButtonT} from '@kp/constants/enum';
import {COMMON, CountryWallet} from '@kp/constants/appText';
import Button from '@kp/components/common/Button';

type WalletType = keyof typeof supporedCountries;

interface CountrySelectionProps {
  wallet: WalletType;
  toggleCountrySelect: (value: string) => void;
}

/**
 * CountrySelectionScreen Component
 * - Displays a list of supported countries for selection
 * - Allows users to search for a country dynamically
 * - Handles selection and updates state accordingly
 */
const CountrySelectionScreen = ({
  wallet,
  toggleCountrySelect,
}: CountrySelectionProps) => {
  const [search, setSearch] = useState('');
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(
    null,
  );

  /**
   * Generates options list based on selected wallet type
   * - Extracts country details from the supported countries list
   */
  const options = Object.entries(supporedCountries[wallet]).map(
    ([key, {image, value, currency}]) => ({
      value: key,
      name: value,
      image,
      currency,
    }),
  );

  /**
   * Generates options list based on selected wallet type
   * - Extracts country details from the supported countries list
   */
  const filteredCountries = options.filter(country =>
    country.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Choose a Country</Text>
      <Text style={styles.subHeader}>Select a country to send money to</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        placeholderTextColor="#ccc"
        value={search}
        onChangeText={setSearch}
      />
      <View style={{flex: 0.9}}>
        <FlatList
          data={filteredCountries}
          keyExtractor={item => item.value}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableOpacity
              style={[
                styles.itemContainer,
                selectedCountryCode === item.value && styles.selectedItem,
              ]}
              onPress={() => setSelectedCountryCode(item.value)}>
              <Image style={styles.flag} source={item.image} />
              <Text style={styles.countryName}>{item.name}</Text>
              <Text style={styles.currency}>{item.currency}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <Button
        style={styles.mt20}
        title={COMMON.continue}
        type={ButtonT.default}
        onPress={() => {
          if (selectedCountryCode) {
            toggleCountrySelect(selectedCountryCode);
          } else {
            toggleCountrySelect(CountryWallet[wallet]);
          }
        }}
      />
    </View>
  );
};

export default CountrySelectionScreen;
