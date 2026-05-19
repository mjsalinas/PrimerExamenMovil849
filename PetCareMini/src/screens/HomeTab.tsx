// ============================================
// Pantalla: HomeTab (Checklist diaria)
// ============================================
import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import InfoCard from '../components/InfoCard';
import { ChecklistItem } from '../types';
import CustomButton from '../components/CustomButton';

/**
 * Pantalla principal con la checklist diaria del cuidado de la mascota.
 * Demuestra uso de useState, ternarios y renderizado condicionado.
 */
export default function HomeTab({ navigation }: any) {
  // --- Estado: lista de ítems del checklist ---
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    { id: '1', title: '💧 Agua fresca', done: false },
    { id: '2', title: '🍖 Comida', done: false },
    { id: '3', title: '🚶 Paseo', done: false },
    { id: '4', title: '💊 Medicamento', done: false },
  ]);

  const toggleItemStatus = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  };

  // --- Conteo de completados ---
  const completedCount = checklist.filter((item) => item.done).length;
  const totalCount = checklist.length;

  return (
    <ScreenContainer>
      {/* Encabezado */}
      <Text style={styles.header}>📋 Checklist de hoy</Text>

      {/* Resumen */}
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>
          Completadas: {completedCount} / Total: {totalCount}
        </Text>
        <Text style={styles.statusText}>
          {completedCount === totalCount
            ? '🎉 ¡Todo listo por hoy!'
            : '⏳ Aún hay tareas pendientes'}
        </Text>
      </View>

      {/* Lista de ítems */}
      {checklist.map((item) => (
        <InfoCard
          key={item.id}
          title={item.title}
          // --- Ternario: texto condicionado según done ---
          rightText={item.done ? 'Completado ✅' : 'Pendiente ⏳'}
          // --- Ternario: variante condicionada según done ---
          variant={item.done ? 'done' : 'default'}
          onPress={() => toggleItemStatus(item.id)}
        />
      ))}

      {/* Botón para ver perfil — navega al Profile del StackNavigator padre */}
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
  profileButton: {
    marginTop: 20,
  },
});
