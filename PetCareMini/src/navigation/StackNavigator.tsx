// ============================================
// Navegación: StackNavigator
// Stack principal con Login, Tabs y Profile
// ============================================
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import TabsNavigator from './TabsNavigator';
import ProfileScreen from '../screens/ProfileScreen';

export type RootStackParamList = {
  Login: {email: String};
  Tabs: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: true }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: 'Inicio de Sesión' }}
      />
      <Stack.Screen
        name="Tabs"
        component={TabsNavigator}
        options={{
          title: '🐾 PetCare Mini',
          headerLeft: () => null,
          headerStyle: { backgroundColor: '#4A90D9' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: '700' },
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Perfil de Mascota',
          headerStyle: { backgroundColor: '#4A90D9' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: '700' },
        }}
      />
    </Stack.Navigator>
  );
}
