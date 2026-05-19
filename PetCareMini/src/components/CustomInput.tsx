// ============================================
// Componente reutilizable: CustomInput
// ============================================
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
  error = '',
}: CustomInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const getKeyboardType = (): KeyboardTypeOptions => {
    if (type === 'email') return 'email-address';
    if (type === 'number') return 'numeric';
    return 'default';
  };

  const isPassword = type === 'password';
  const secureTextEntry = isPassword && !showPassword;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputWrapper,
          error ? styles.inputError : styles.inputNormal,
        ]}
      >
        <TextInput
          style={styles.input}
          value={value}
          placeholder={placeholder}
          onChangeText={onChangeText}
          keyboardType={getKeyboardType()}
          secureTextEntry={secureTextEntry}
          autoCapitalize={type === 'email' ? 'none' : 'sentences'}
          placeholderTextColor="#90A4AE"
        />

        {isPassword ? (
          <TouchableOpacity
            onPress={() => setShowPassword((prev) => !prev)}
            style={styles.eyeButton}
            activeOpacity={0.7}
          >
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={22}
              color="#607D8B"
            />
          </TouchableOpacity>
        ) : null}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
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