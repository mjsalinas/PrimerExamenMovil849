// ============================================
// Componente reutilizable: CustomInput
// ============================================
import { useMemo, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardTypeOptions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/** Props del input personalizado */
interface CustomInputProps {
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  type?: 'text' | 'email' | 'password' | 'number';
  error?: string;
}

/**
 * Input reutilizable con soporte para distintos tipos,
 * toggle de visibilidad para contraseñas y mensajes de error.
 */
export default function CustomInput({
  value,
  placeholder,
  onChangeText,
  type = 'text',
  error,
}: CustomInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const keyboardType: KeyboardTypeOptions = useMemo(() => {
    if (type === 'email') return 'email-address';
    if (type === 'number') return 'numeric';
    return 'default';
  }, [type]);

  const autoCapitalize = type === 'email' ? 'none' : 'sentences';

  // --- Validación interna (si no viene error por props, usa esta) ---
  const internalError = useMemo(() => {
    if (type === 'email' && !value.includes('@')) return 'Correo Invalido';
    if (type === 'password' && value.length < 6)
      return 'La contraseña debe ser mas fuerte';
    return '';
  }, [type, value]);

  const finalError = error ?? internalError;

  const isSecure = type === 'password' && !showPassword;

  return (
    <View
      style={[
        styles.inputWrapper,
        finalError ? styles.inputError : styles.inputNormal,
      ]}
    >
      <TextInput
        style={styles.input}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={isSecure}
        autoCapitalize={autoCapitalize}
        placeholderTextColor="#90A4AE"
      />

      {/* Toggle ojo para password */}
      {type === 'password' ? (
        <TouchableOpacity
          onPress={() => setShowPassword((s) => !s)}
          style={styles.eyeButton}
          activeOpacity={0.7}
        >
          <Ionicons
            name={showPassword ? 'eye-off' : 'eye-outline'}
            size={22}
            color="#607D8B"
          />
        </TouchableOpacity>
      ) : null}

      {finalError ? (
        <Text style={styles.errorText}>{finalError}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: '#FFFFFF',
  },
  inputNormal: {
    borderColor: '#CFD8DC',
  },
  inputError: {
    borderColor: '#E53935',
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: '#263238',
  },
  eyeButton: {
    padding: 6,
  },
  errorText: {
    color: '#E53935',
    fontSize: 13,
    marginLeft: 8,
    maxWidth: 140,
  },
});

