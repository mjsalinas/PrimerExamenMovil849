// ============================================
// Pantalla: HomeTab (Checklist diaria)
// ============================================
import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import InfoCard from '../components/InfoCard';
import CustomButton from '../components/CustomButton';

interface ChecklistItem {
  id: string;
  title: string;
  done: boolean;
}

export default function HomeTab({ navigation }: any) {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    { id: '1', title: 'Agua fresca', done: false },
    { id: '2', title: 'Comida', done: false },
    { id: '3', title: 'Paseo', done: false },
    { id: '4', title: 'Medicamento', done: false },
  ]);

  const toggleItemStatus = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  };

  const completedCount = checklist.filter((item) => item.done).length;
  const totalCount = checklist.length;
  const allCompleted = completedCount === totalCount;

  return (
    <ScreenContainer>
      <Text style={styles.header}>📋 Checklist de hoy</Text>

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>
          Completadas: {completedCount} / Total: {totalCount}
        </Text>

        <Text style={styles.statusText}>
          {allCompleted
            ? '🎉 ¡Todo listo por hoy!'
            : '⏳ Aún hay tareas pendientes'}
        </Text>
      </View>

      <View style={styles.cardsContainer}>
        {checklist.map((item) => (
          <InfoCard
            key={item.id}
            title={item.title}
            rightText={item.done ? 'Completado ✅' : 'Pendiente ⏳'}
            variant={item.done ? 'done' : 'default'}
            onPress={() => toggleItemStatus(item.id)}
          />
        ))}
      </View>

      <View style={styles.profileButton}>
        <CustomButton
          title="Ver perfil 🐶"
          onPress={() => navigation.navigate('Profile')}
          variant="secondary"
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#263238',
    marginBottom: 16,
  },
  summaryContainer: {
    backgroundColor: '#E3F2FD',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  summaryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1565C0',
  },
  statusText: {
    fontSize: 14,
    color: '#1976D2',
    marginTop: 4,
  },
  cardsContainer: {
    gap: 10,
  },
  profileButton: {
    marginTop: 20,
  },
});