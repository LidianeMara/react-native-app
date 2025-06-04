import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import { ActionSheetIOS } from 'react-native';

interface Props {
  disease: string;
  setDisease: (value: 'dengue' | 'chikungunya' | 'zika') => void;
}

const diseases = [
  { label: 'Dengue', value: 'dengue' },
  { label: 'Chikungunya', value: 'chikungunya' },
  { label: 'Zika', value: 'zika' },
];

const DiseaseFilter: React.FC<Props> = ({ disease, setDisease }) => {
  const showActionSheet = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancelar', ...diseases.map(d => d.label)],
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex > 0) {
          setDisease(diseases[buttonIndex - 1].value as 'dengue' | 'chikungunya' | 'zika');
        }
      }
    );
  };

  const selectedDisease = diseases.find(d => d.value === disease)?.label || 'Selecione';

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>Doença:</Text>
      <TouchableOpacity onPress={showActionSheet} style={styles.button}>
        <Text style={styles.buttonText}>{selectedDisease}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginHorizontal: 2,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
    color: '#333',
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    height: 35,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 14,
    color: '#333',
  },
});

export default DiseaseFilter;
