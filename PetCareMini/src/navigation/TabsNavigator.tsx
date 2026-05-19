// ============================================
// Navegación: TabsNavigator (Bottom Tabs)
// ============================================
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeTab from '../screens/HomeTab';
import AddActivityTab from '../screens/AddActivityTab';
import HistoryTab from '../screens/HistoryTab';

export type TabParamList = {
  HomeScreen: undefined;
  AddActivity: undefined;
  History: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#4A90D9',
        tabBarInactiveTintColor: '#90A4AE',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
          paddingBottom: 6,
          paddingTop: 6,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600' as const,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === 'HomeScreen') {
            iconName = 'checkmark-circle-outline';
          } else if (route.name === 'AddActivity') {
            iconName = 'add-circle-outline';
          } else if (route.name === 'History') {
            iconName = 'time-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeTab}
        options={{ tabBarLabel: 'Inicio' }}
      />
      <Tab.Screen
        name="AddActivity"
        component={AddActivityTab}
        options={{ tabBarLabel: 'Agregar' }}
      />
      <Tab.Screen
        name="History"
        component={HistoryTab}
        options={{ tabBarLabel: 'Historial' }}
      />
    </Tab.Navigator>
  );
}
