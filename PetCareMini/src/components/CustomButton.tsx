// ============================================
// Componente reutilizable: CustomButton
// ============================================
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

export default function CustomButton({
  title,
  onPress,
  disabled = false,
  variant = 'primary',
}: CustomButtonProps) {
  const buttonStyle: ViewStyle =
    variant === 'primary' ? styles.primary : styles.secondary;

  const textStyle: TextStyle =
    variant === 'primary' ? styles.primaryText : styles.secondaryText;

  return (
    <TouchableOpacity
      style={[
        styles.base,
        buttonStyle,
        disabled ? styles.disabled : null,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.baseText,
          textStyle,
          disabled ? styles.disabledText : null,
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
    borderColor: '#B0BEC5',
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