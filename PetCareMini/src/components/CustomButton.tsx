// ============================================
// Componente reutilizable: CustomButton
// ============================================
import React from 'react';

import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';

/** Props del botón */
interface CustomButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

/**
 * Botón reutilizable con variantes
 * y estado deshabilitado.
 */
export default function CustomButton({
  title,
  onPress,
  disabled = false,
  variant = 'primary',
}: CustomButtonProps) {
  // --- Estilo dinámico del botón ---
  const buttonStyle: ViewStyle = {
    ...(variant === 'primary'
      ? styles.primary
      : styles.secondary),

    ...(disabled ? styles.disabled : {}),
  };

  // --- Estilo dinámico del texto ---
  const textStyle: TextStyle =
    variant === 'primary'
      ? styles.primaryText
      : styles.secondaryText;

  return (
    <TouchableOpacity
      style={[styles.base, buttonStyle]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.baseText,
          textStyle,
          disabled && styles.disabledText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
  },

  primary: {
    backgroundColor: '#4A90D9',
  },

  secondary: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#4A90D9',
  },

  disabled: {
    backgroundColor: '#B0BEC5',
  },

  baseText: {
    fontSize: 16,
    fontWeight: '600',
  },

  primaryText: {
    color: '#FFFFFF',
  },

  secondaryText: {
    color: '#4A90D9',
  },

  disabledText: {
    color: '#ECEFF1',
  },
});