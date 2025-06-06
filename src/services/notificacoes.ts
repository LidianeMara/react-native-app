import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import { Platform, Alert } from 'react-native';
import { DengueCaso } from '../types/DengueData';
import dadosDengue from '../data/dadosDengue.json';

// Configure local notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

const isDevelopmentBuild = false; // Constants.appOwnership !== 'expo';

const showLocalAlert = (title: string, body: string) => {
  if (Platform.OS === 'web') {
    alert(`${title}\n${body}`);
  } else {
    Alert.alert(title, body);
  }
};

export async function checarAreaDeRisco() {
  try {
    const { status: locStatus } = await Location.requestForegroundPermissionsAsync();
    
    if (locStatus !== 'granted') {
      showLocalAlert('Permissão Necessária', 'Precisamos da sua localização para verificar áreas de risco.');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    const emRisco = await verificarRisco(latitude, longitude);

    if (emRisco) {
      await enviarNotificacaoLocal(
        'Alerta de Dengue',
        'Casos altos próximos à sua localização. Previna-se!'
      );
    }
  } catch (error) {
    console.error('Erro ao verificar área de risco:', error);
  }
}

async function verificarRisco(latitude: number, longitude: number): Promise<boolean> {
  const emRisco = dadosDengue.some((item) => {
    const distancia = getDistancia(latitude, longitude, item.latitude, item.longitude);
    return distancia < 10 && item.casos > 1000;
  });

  return emRisco;
}

async function enviarNotificacaoLocal(title: string, body: string) {
  try {
    if (Platform.OS === 'web') {
      showLocalAlert(title, body);
      return;
    }

    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
      const { status: newStatus } = await Notifications.requestPermissionsAsync();
      if (newStatus !== 'granted') {
        showLocalAlert('Aviso', 'Notificações desativadas');
        return;
      }
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data: { type: 'local-notification' },
      },
      trigger: null, // Mostra imediatamente
    });
  } catch (error) {
    console.error('Erro ao enviar notificação:', error);
    showLocalAlert(title, body);
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
