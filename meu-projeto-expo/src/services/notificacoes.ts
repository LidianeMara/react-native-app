import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import { DengueCaso } from '../types/DengueData';
import dadosDengue from '../data/dadosDengue.json';

export async function checarAreaDeRisco() {
  const { status: locStatus } = await Location.requestForegroundPermissionsAsync();
  const { status: notifStatus } = await Notifications.requestPermissionsAsync();

  if (locStatus !== 'granted' || notifStatus !== 'granted') return;

  const location = await Location.getCurrentPositionAsync({});
  const { latitude, longitude } = location.coords;

  const emRisco = dadosDengue.some((item: DengueCaso) => {
    const distancia = getDistancia(latitude, longitude, item.latitude, item.longitude);
    return distancia < 10 && item.casos > 1000;
  });

  if (emRisco) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Alerta de Dengue',
        body: 'Casos altos próximos à sua localização. Previna-se!',
      },
      trigger: null,
    });
  }
}

function getDistancia(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
