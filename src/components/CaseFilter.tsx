import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { View, StyleSheet } from 'react-native';

interface Props {
  faixa: string;
  setFaixa: (value: string) => void;
}

const CaseFilter: React.FC<Props> = ({ faixa, setFaixa }) => (
  <View style={styles.container}>
    <Picker selectedValue={faixa} onValueChange={setFaixa}>
      <Picker.Item label="Todos" value="TODOS" />
      <Picker.Item label="0-500 casos" value="0-500" />
      <Picker.Item label="501-1000 casos" value="501-1000" />
      <Picker.Item label="Mais de 1000 casos" value="1000+" />
    </Picker>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    zIndex: 10,
  },
});

export default CaseFilter;
