// ============================================
// Pantalla: ProfileScreen (Perfil de la mascota)
// ============================================
import { useState } from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
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

  // Estados locales independientes para inputs editables
  const [nameInput, setNameInput] = useState(profile.name);
  const [ageInput, setAgeInput] = useState(profile.age);
  const [breedInput, setBreedInput] = useState(profile.breed);

  const [editing, setEditing] = useState(false);

  // --- Ternario: validación de edad ---
  const ageError =
    editing && (ageInput.trim() === '' || isNaN(Number(ageInput)))
      ? 'La edad debe ser un número válido'
      : '';

  // Determinar si hay alguna modificación para mostrar el botón
  const hasChanges = nameInput !== profile.name || ageInput !== profile.age || breedInput !== profile.breed;

  /** Guardar cambios */
  const handleSave = () => {
    if (ageError || ageInput.trim() === '' || isNaN(Number(ageInput))) return;
    setProfile({
      name: nameInput,
      age: ageInput,
      breed: breedInput,
    });
    setEditing(false);
    Alert.alert('Éxito', '📋 Perfil actualizado correctamente');
  };

  // --- Ternario: Formato del resumen informativo de edad ---
  const displayAge = profile.age.trim() !== '' && !isNaN(Number(profile.age))
    ? `${profile.age} ${Number(profile.age) === 1 ? 'año' : 'año(s)'}`
    : '— (no definida)';

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
          <Text style={styles.petBreed}>—</Text>
        )}
      </View>

      {/* Tarjeta de información */}
      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>🐾 Información de la Mascota</Text>

        <Text style={styles.label}>Nombre</Text>
        <CustomInput
          value={nameInput}
          placeholder="Nombre de tu mascota"
          onChangeText={(v) => {
            setEditing(true);
            setNameInput(v);
          }}
        />

        <Text style={styles.label}>Edad</Text>
        <CustomInput
          value={ageInput}
          placeholder="Edad en años"
          onChangeText={(v) => {
            setEditing(true);
            setAgeInput(v);
          }}
          type="number"
          error={ageError}
        />

        <Text style={styles.label}>Tipo/Raza</Text>
        <CustomInput
          value={breedInput}
          placeholder="Raza de la mascota"
          onChangeText={(v) => {
            setEditing(true);
            setBreedInput(v);
          }}
        />

        {/* Solo aparece si hay modificaciones */}
        {hasChanges ? (
          <View style={styles.btnWrapper}>
            <CustomButton
              title="Guardar Cambios"
              onPress={handleSave}
              disabled={ageError !== ''}
              variant="primary"
            />
          </View>
        ) : null}
      </View>

      {/* Sección Resumen Informativo */}
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Resumen</Text>
        <Text style={styles.summaryText}>Edad actual: {displayAge}</Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  petImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: '#4A90D9',
    marginBottom: 10,
  },
  petName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#263238',
  },
  petBreed: {
    fontSize: 14,
    color: '#78909C',
    marginTop: 2,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#263238',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#546E7A',
    marginTop: 8,
  },
  btnWrapper: {
    marginTop: 16,
  },
  summaryContainer: {
    backgroundColor: '#ECEFF1',
    borderRadius: 12,
    padding: 16,
  },
  summaryTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#37474F',
    marginBottom: 4,
  },
  summaryText: {
    fontSize: 14,
    color: '#455A64',
  },
});