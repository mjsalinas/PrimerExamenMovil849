// ============================================
// Pantalla: ProfileScreen (Perfil de la mascota)
// ============================================
import { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { PetProfile } from '../types';
import React from 'react';

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
        
        {/* --- Ternario corregido: mostrar texto alternativo si no hay raza --- */}
        {profile.breed ? (
          <Text style={styles.petBreed}>{profile.breed}</Text>
        ) : (
          <Text style={styles.petBreed}>Sin raza especificada</Text>
        )}
      </View>

      {/* Tarjeta de información */}
      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>🐾 Información de la Mascota</Text>

        {/* --- Campo Nombre --- */}
        <Text style={styles.label}>Nombre</Text>
        <CustomInput
          value={profile.name}
          placeholder="Nombre de tu mascota"
          onChangeText={(v) => {
            setEditing(true);
            updateField('name', v);
          }}
        />

        {/* --- Campo Edad --- */}
        <Text style={styles.label}>Edad (años)</Text>
        <CustomInput
          value={profile.age}
          placeholder="Edad de tu mascota"
          onChangeText={(v) => {
            setEditing(true);
            updateField('age', v);
          }}
        />
        {/* Mostrar el mensaje de error de edad si existe */}
        {ageError ? <Text style={styles.errorText}>{ageError}</Text> : null}

        {/* --- Campo Raza --- */}
        <Text style={styles.label}>Raza</Text>
        <CustomInput
          value={profile.breed}
          placeholder="Raza de tu mascota"
          onChangeText={(v) => {
            setEditing(true);
            updateField('breed', v);
          }}
        />

        {/* --- Mensaje de éxito al guardar --- */}
        {saved && <Text style={styles.savedText}>¡Cambios guardados con éxito!</Text>}

        {/* --- Botón de Guardar (Opcional, usando tu componente CustomButton) --- */}
        <CustomButton 
          title={editing ? "Guardar Cambios" : "Modificar"}
          onPress={handleSave}
          disabled={!!ageError} variant={'secondary'}        />
      </View>
    </ScreenContainer>
  );
}

// Estilos de ejemplo (asegúrate de adaptarlos o mantener los que ya tenías)
const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  petImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  petName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  petBreed: {
    fontSize: 16,
    color: 'gray',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 10,
    marginBottom: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 2,
  },
  savedText: {
    color: 'green',
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: 'bold',
  }
});