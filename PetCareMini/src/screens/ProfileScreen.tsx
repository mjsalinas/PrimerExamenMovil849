// ============================================
// Pantalla: ProfileScreen (Perfil de la mascota)
// ============================================
import { useMemo, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { PetProfile } from '../types';

export default function ProfileScreen() {
  const [profile, setProfile] = useState<PetProfile>({
    name: 'Firulais',
    age: '3',
    breed: 'Golden Retriever',
  });

  const [savedMessage, setSavedMessage] = useState('');

  const [originalProfile, setOriginalProfile] = useState<PetProfile>({
    name: 'Firulais',
    age: '3',
    breed: 'Golden Retriever',
  });

  const hasChanges = useMemo(() => {
    return (
      profile.name !== originalProfile.name ||
      profile.age !== originalProfile.age ||
      profile.breed !== originalProfile.breed
    );
  }, [profile, originalProfile]);

  const ageError =
    hasChanges && (profile.age.trim() === '' || isNaN(Number(profile.age)))
      ? 'La edad debe ser un número válido'
      : '';

  const updateField = (field: keyof PetProfile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
    setSavedMessage('');
  };

  const handleSave = () => {
    if (ageError) return;

    setOriginalProfile(profile);
    setSavedMessage('✅ Perfil actualizado correctamente');
  };

  const displayName = profile.name.trim() !== '' ? profile.name : 'Mi Mascota';
  const displayBreed =
    profile.breed.trim() !== '' ? profile.breed : '— (no definida)';

  const displayAge =
    profile.age.trim() !== '' && !isNaN(Number(profile.age))
      ? `${profile.age} año${Number(profile.age) !== 1 ? 's' : ''}`
      : '— (no definida)';

  return (
    <ScreenContainer>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/616/616408.png',
          }}
          style={styles.petImage}
        />
        <Text style={styles.petName}>{displayName}</Text>
        <Text style={styles.petBreed}>{displayBreed}</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>🐾 Información de la Mascota</Text>

        <Text style={styles.label}>Nombre</Text>
        <CustomInput
          value={profile.name}
          placeholder="Nombre de tu mascota"
          onChangeText={(v) => updateField('name', v)}
        />

        <Text style={styles.label}>Edad</Text>
        <CustomInput
          value={profile.age}
          placeholder="Edad en años"
          onChangeText={(v) => updateField('age', v)}
          type="number"
          error={ageError}
        />

        <Text style={styles.label}>Tipo / Raza</Text>
        <CustomInput
          value={profile.breed}
          placeholder="Raza o tipo de mascota"
          onChangeText={(v) => updateField('breed', v)}
        />

        {hasChanges ? (
          <View style={styles.buttonRow}>
            <CustomButton
              title="Guardar Cambios"
              onPress={handleSave}
              variant="primary"
              disabled={ageError !== ''}
            />
          </View>
        ) : null}

        {savedMessage ? (
          <Text style={styles.savedMessage}>{savedMessage}</Text>
        ) : null}
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>📊 Resumen</Text>
        <Text style={styles.infoText}>🐕 Nombre: {displayName}</Text>
        <Text style={styles.infoText}>🎂 Edad: {displayAge}</Text>
        <Text style={styles.infoText}>🏷️ Raza: {displayBreed}</Text>
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