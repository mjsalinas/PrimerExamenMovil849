// ============================================
// Pantalla: HistoryTab (Historial de actividades)
// ============================================
import { View, Text, StyleSheet } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import InfoCard from '../components/InfoCard';
import CustomButton from '../components/CustomButton';
import { useActivities } from '../context/ActivityContext';

/**
 * Muestra el historial de actividades registradas.
 * Demuestra renderizado condicionado con ternario para estado vacío.
 */
export default function HistoryTab({ navigation }: any) {
  const { activities, deleteActivity } = useActivities();

  return (
    <ScreenContainer>
      <Text style={styles.header}>📜 Historial de Actividades</Text>

      {/* --- Ternario: estado vacío vs lista de actividades --- */}
      {activities.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📭</Text>
          <Text style={styles.emptyText}>
            Aún no hay actividades registradas
          </Text>
          <Text style={styles.emptySubtext}>
            Ve a la pestaña "Agregar" para registrar tu primera actividad.
          </Text>
        </View>
      ) : (
        <View>
          <Text style={styles.countText}>
            {activities.length}{' '}
            {activities.length === 1 ? 'actividad' : 'actividades'} registrada
            {activities.length === 1 ? '' : 's'}
          </Text>

          {activities.map((activity) => (
            <View key={activity.id} style={styles.cardWrapper}>
              <InfoCard
                title={activity.title}
                subtitle={
                  activity.notes ? activity.notes : 'Sin notas adicionales'
                }
                rightText={activity.date}
              />
              {/* Botón eliminar */}
              <CustomButton
                title="🗑 Eliminar"
                onPress={() => deleteActivity(activity.id)} variant={'secondary'}              />
            </View>
          ))}
        </View>
      )}
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
  countText: {
    fontSize: 14,
    color: '#607D8B',
    marginBottom: 12,
  },
  cardWrapper: {
    marginBottom: 8,
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
