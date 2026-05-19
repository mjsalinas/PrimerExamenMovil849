// ============================================
// Componente reutilizable: CustomInput
// ============================================
import { useState } from 'react';
import { TextInput, Text, StyleSheet, KeyboardTypeOptions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, View } from 'react-native';

interface CustomInputProps {
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  type?: 'text' | 'email' | 'password' | 'number';
  error?: string;
}

export default function CustomInput({
  value,
  placeholder,
  onChangeText,
  type = 'text',
  error: propError,
}: CustomInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const getKeyboardType = (): KeyboardTypeOptions => {
    if (type === 'email') return 'email-address';
    if (type === 'number') return 'numeric';
    return 'default';
  };

  const getErrorMessage = (): string | undefined => {
    if (propError) return propError;
    
    if (value.length > 0) {
      if (type === "email" && !value.includes('@')) {
        return 'Correo Invalido';
      }
      if (type === "password" && value.length < 6) {
        return 'La contraseña debe ser mas fuerte';
      }
    }
    return undefined;
  };
   
  const activeError = getErrorMessage();
  const isSecure = type === 'password' && !showPassword;

  return (
    <View style={styles.container}>
      <View style={[styles.inputWrapper, activeError ? styles.inputError : styles.inputNormal]}>
        <TextInput
          style={styles.input}
          value={value}
          placeholder={placeholder}
          onChangeText={onChangeText}
          keyboardType={getKeyboardType()}
          secureTextEntry={isSecure}
          autoCapitalize={type === 'email' ? 'none' : 'sentences'}
          placeholderTextColor="#90A4AE"
        />

        {type === 'password' && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeButton}
          >
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye-outline'}
              size={22}
              color="#607D8B"
            />
          </TouchableOpacity>
        )}
      </View>
      
      {activeError && <Text style={styles.errorText}>{activeError}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    width: '100%',
  },
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
    marginTop: 4,
    marginLeft: 4,
  },
});