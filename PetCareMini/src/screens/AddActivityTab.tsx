// ============================================
// Pantalla: AddActivityTab (Registrar actividad)
// ============================================
import { useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { useActivities } from '../context/ActivityContext';
import { Activity } from '../types';

/**
 * Formulario para registrar una nueva actividad.
 * Demuestra validación condicionada y estado local.
 */
export default function AddActivityTab({ navigation }: any) {
  const { addActivity } = useActivities();

  // --- Estado local ---
  const [activityTitle, setActivityTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // --- Ternario: error si el título está vacío ---
  const titleError =
    submitted && activityTitle.trim() === ''
      ? 'El tipo de actividad es obligatorio'
      : '';

  // --- Ternario: el formulario es válido si el título no está vacío ---
  const isValid = activityTitle.trim() !== '';

  /** Guardar la actividad */
  const handleSave = () => {
    setSubmitted(true);
    if (!isValid) return;

    const newActivity: Activity = {
      id: Date.now().toString(),
      title: activityTitle.trim(),
      notes: notes.trim(),
      date: new Date().toLocaleDateString('es-HN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    addActivity(newActivity);

    // Limpiar inputs
    setActivityTitle('');
    setNotes('');
    setSubmitted(false);

    // Confirmación
  };

  return (
    <ScreenContainer>
      <Text style={styles.header}>📝 Registrar Actividad</Text>
      <Text style={styles.description}>
        Agrega una actividad realizada con tu mascota.
      </Text>

      <View style={styles.formContainer}>
        {/* Input: tipo de actividad */}
        <Text style={styles.label}>Tipo de actividad</Text>
        <CustomInput
          value={activityTitle}
          placeholder='Ej: "Baño", "Vet", "Juego", "Paseo extra"'
          onChangeText={setActivityTitle}
          error={titleError}
        />

        {/* Input: notas */}
        <Text style={styles.label}>Notas (opcional)</Text>
        <CustomInput
          value={notes}
          placeholder="Agrega notas adicionales..."
          onChangeText={setNotes}
        />

        {/* --- Ternario: botón deshabilitado si no es válido --- */}
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Guardar Actividad"
            onPress={handleSave}
            disabled={!isValid}
            variant="primary"
          />
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#263238',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#78909C',
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#455A64',
    marginBottom: 4,
    marginTop: 8,
  },
  buttonContainer: {
    marginTop: 16,
  },
});
