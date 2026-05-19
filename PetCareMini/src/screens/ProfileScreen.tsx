// ============================================
// Pantalla: ProfileScreen (Perfil de la mascota)
// ============================================
import { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { PetProfile } from '../types';

/**
 * Pantalla de perfil de la mascota con campos editables.
 * Demuestra uso de useState, validación condicionada y renderizado condicional.
 */
export default function ProfileScreen({ navigation }: any) {
  // --- Estado local: perfil de la mascota ---
  const [profile, setProfile] = useState<PetProfile>({
    name: 'Firulais',
    age: '3',
    breed: 'Golden Retriever',
  });

  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  // --- Ternario: validación de edad ---
  const ageError =
    editing && (profile.age === '' || isNaN(Number(profile.age)))
      ? 'La edad debe ser un número válido'
      : '';

  /** Actualizar un campo del perfil */
  const updateField = (field: keyof PetProfile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  /** Guardar cambios */
  const handleSave = () => {
    if (ageError) return;
    setEditing(false);
    setSaved(true);
  };

  return (
    <ScreenContainer>
      {/* Imagen de la mascota */}
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/616/616408.png',
          }}
          style={styles.petImage}
        />
        <Text style={styles.petName}>{profile.name || 'Mi Mascota'}</Text>
        {/* --- Ternario: mostrar raza si existe --- */}
        {profile.breed ? (
          <Text style={styles.petBreed}>{profile.breed}</Text>
        ) : (
          <Text style={styles.petBreed}>{profile.breed}</Text>
        )}
      </View>

      {/* Tarjeta de información */}
      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>🐾 Información de la Mascota</Text>

        <Text style={styles.label}>Nombre</Text>
        <CustomInput
          value={''}
          placeholder="Nombre de tu mascota"
          onChangeText={(v) => {
            setEditing(true);
            updateField('name', v);
          }}
        />

        <Text style={styles.label}>Edad</Text>
        <CustomInput
          value={profile.age}
          placeholder="Edad en años"
          onChangeText={(v) => {
            setEditing(true);
            updateField('age', v);
          }}
          type="number"
          error={""}
        />

        <Text style={styles.label}>Tipo / Raza</Text>
        <CustomInput
          value={profile.breed}
          placeholder="Raza o tipo de mascota"
          onChangeText={(v) => {
            setEditing(true);
            updateField('breed', v);
          }}
        />

        {/* Botones */}
        <View style={styles.buttonRow}>
          {/* --- Ternario: mostrar botón guardar solo si está editando --- */}
          {editing ? (
            <CustomButton
              title="Guardar Cambios"
              onPress={handleSave}
              variant="primary"
              disabled={ageError !== ''}
            />
          ) : null}
        </View>

        {/* --- Renderizado condicionado: mensaje de guardado exitoso --- */}
        {saved ? (
          <Text style={styles.savedMessage}>
            ✅ Perfil actualizado correctamente
          </Text>
        ) : null}
      </View>

      {/* Info adicional */}
      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>📊 Resumen</Text>
        <Text style={styles.infoText}>
          🐕 Nombre: {profile.name || '—'}
        </Text>
        <Text style={styles.infoText}>
          🎂 Edad:{' '}
          {/* --- Ternario: validación de edad para mostrar --- */}
          {profile.age && !isNaN(Number(profile.age))
            ? `${profile.age} año${Number(profile.age) !== 1 ? 's' : ''}`
            : '— (no definida)'}
        </Text>
        <Text style={styles.infoText}>
          🏷️ Raza: {profile.breed || '— (no definida)'}
        </Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  petImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
    borderWidth: 3,
    borderColor: '#4A90D9',
  },
  petName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#263238',
  },
  petBreed: {
    fontSize: 15,
    color: '#78909C',
    marginTop: 4,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#263238',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#455A64',
    marginBottom: 4,
    marginTop: 8,
  },
  buttonRow: {
    marginTop: 16,
  },
  savedMessage: {
    textAlign: 'center',
    color: '#2E7D32',
    fontSize: 14,
    marginTop: 12,
    fontWeight: '500',
  },
  infoText: {
    fontSize: 15,
    color: '#455A64',
    marginVertical: 4,
  },
});
