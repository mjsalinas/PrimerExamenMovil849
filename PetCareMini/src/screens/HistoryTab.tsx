// ============================================
// Pantalla: HistoryTab (Historial de actividades)
// ============================================
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import InfoCard from '../components/InfoCard';
import CustomButton from '../components/CustomButton';
import { useActivities } from '../context/ActivityContext';
import React from 'react';

/**
 * Muestra el historial de actividades registradas.
 * Optimizado con FlatList para un correcto scroll y eliminación en tiempo real.
 */
export default function HistoryTab({ navigation }: any) {
  const { activities, deleteActivity } = useActivities();

  // Componente para el estado vacío
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>📭</Text>
      <Text style={styles.emptyText}>
        Aún no hay actividades registradas
      </Text>
      <Text style={styles.emptySubtext}>
        Ve a la pestaña "Agregar" para registrar tu primera actividad.
      </Text>
    </View>
  );

  // Componente de cabecera de la lista
  const renderHeader = () => (
    <View>
      <Text style={styles.header}>📜 Historial de Actividades</Text>
      {activities.length > 0 && (
        <Text style={styles.countText}>
          {activities.length}{' '}
          {activities.length === 1 ? 'actividad' : 'actividades'} registrada
          {activities.length === 1 ? '' : 's'}
        </Text>
      )}
    </View>
  );

  return (
    <ScreenContainer>
      <FlatList
        data={activities}
        keyExtractor={(item) => item.id.toString()} // Asegura el ID como string para evitar bugs de key
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item: activity }) => (
          <View style={styles.cardWrapper}>
            <InfoCard
              title={activity.title}
              subtitle={activity.notes ? activity.notes : 'Sin notas adicionales'}
              rightText={activity.date}
            />
            {/* Botón eliminar corregido por referencia */}
            <CustomButton
              title="🗑 Eliminar"
              onPress={() => deleteActivity(activity.id)} variant={'secondary'}            />
          </View>
        )}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 24,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#263238',
    marginBottom: 16,
  },
  countText: {
    fontSize: 14,
    color: '#607D8B',
    marginBottom: 12,
  },
  cardWrapper: {
    marginBottom: 12, // Un poco más de espacio para separar los bloques de cada actividad
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#78909C',
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#90A4AE',
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 20,
  },
});