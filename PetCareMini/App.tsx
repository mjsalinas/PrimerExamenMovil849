// ============================================
// PetCareMini - App Principal
// ============================================
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import StackNavigator from './src/navigation/StackNavigator';
import { ActivityProvider } from './src/context/ActivityContext';

/**
 * Componente raíz de la aplicación PetCare Mini.
 * Envuelve todo en el NavigationContainer y el ActivityProvider
 * para compartir el estado de actividades entre pantallas.
 */
export default function App() {
  return (
    <ActivityProvider>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#4A90D9" />
        <StackNavigator />
      </NavigationContainer>
    </ActivityProvider>
  );
}
