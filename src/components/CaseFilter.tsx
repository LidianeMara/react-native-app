import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ActionSheetIOS } from 'react-native';
import { Municipio } from '../services/api';

interface Props {
  faixa: string;
  setFaixa: (value: string) => void;
  municipios: Municipio[];
}

const CaseFilter: React.FC<Props> = ({ faixa, setFaixa, municipios }) => {
  const showActionSheet = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancelar', 'Todos os Municípios', ...municipios.map(m => m.nome)],
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex === 1) {
          setFaixa('TODOS');
        } else if (buttonIndex > 1) {
          setFaixa(municipios[buttonIndex - 2].geocode);
        }
      }
    );
  };

  const selectedMunicipio = faixa === 'TODOS' 
    ? 'Todos os Municípios' 
    : municipios.find(m => m.geocode === faixa)?.nome || 'Selecione';

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>Município:</Text>
      <TouchableOpacity onPress={showActionSheet} style={styles.button}>
        <Text style={styles.buttonText}>{selectedMunicipio}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginHorizontal: 5,
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

export default CaseFilter;
