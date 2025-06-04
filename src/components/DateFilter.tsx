import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActionSheetIOS } from 'react-native';

interface Props {
  startYear: number;
  endYear: number;
  startWeek: number;
  endWeek: number;
  setStartYear: (year: number) => void;
  setEndYear: (year: number) => void;
  setStartWeek: (week: number) => void;
  setEndWeek: (week: number) => void;
}

const DateFilter: React.FC<Props> = ({
  startYear,
  endYear,
  startWeek,
  endWeek,
  setStartYear,
  setEndYear,
  setStartWeek,
  setEndWeek,
}) => {
  const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];
  const weeks = Array.from({ length: 52 }, (_, i) => i + 1);

  useEffect(() => {
    if (endYear < startYear) {
      setEndYear(startYear);
    }
  }, [startYear, endYear]);

  const showYearActionSheet = (isStartYear: boolean) => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancelar', ...years.map((y) => y.toString())],
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex > 0) {
          const selectedYear = years[buttonIndex - 1];
          if (isStartYear) {
            setStartYear(selectedYear);
            if (selectedYear > endYear) {
              setEndYear(selectedYear);
            }
          } else {
            if (selectedYear >= startYear) {
              setEndYear(selectedYear);
            }
          }
        }
      }
    );
  };

  const showWeekActionSheet = (isStartWeek: boolean) => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancelar', ...weeks.map((w) => `Semana ${w}`)],
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex > 0) {
          const selectedWeek = weeks[buttonIndex - 1];
          isStartWeek ? setStartWeek(selectedWeek) : setEndWeek(selectedWeek);
        }
      }
    );
  };

  const isInvalidYear = endYear < startYear;

  return (
    <View style={styles.container}>
      <View style={styles.yearContainer}>
        <View style={styles.filterItem}>
          <Text style={styles.label}>Ano Inicial:</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => showYearActionSheet(true)}
          >
            <Text style={styles.buttonText}>{startYear}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.filterItem}>
          <Text style={styles.label}>Ano Final:</Text>
          <TouchableOpacity
            style={[styles.button, isInvalidYear && styles.invalidButton]}
            onPress={() => showYearActionSheet(false)}
          >
            <Text style={[styles.buttonText, isInvalidYear && styles.invalidText]}>
              {endYear}
            </Text>
          </TouchableOpacity>
          {isInvalidYear && (
            <Text style={styles.errorText}>Ano final deve ser maior ou igual ao inicial</Text>
          )}
        </View>
      </View>

      <View style={styles.yearContainer}>
        <View style={styles.filterItem}>
          <Text style={styles.label}>Semana Inicial:</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => showWeekActionSheet(true)}
          >
            <Text style={styles.buttonText}>Semana {startWeek}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.filterItem}>
          <Text style={styles.label}>Semana Final:</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => showWeekActionSheet(false)}
          >
            <Text style={styles.buttonText}>Semana {endWeek}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 5,
  },
  yearContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    gap: 10,
  },
  filterItem: {
    flex: 1,
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
    textAlign: 'center',
  },
  invalidButton: {
    borderColor: '#ff4444',
  },
  invalidText: {
    color: '#ff4444',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 10,
    marginTop: 2,
  },
});

export default DateFilter;
