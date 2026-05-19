// ============================================
// Componente reutilizable: CustomButton
// ============================================
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';

/** Props del botón personalizado */
interface CustomButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant: 'primary' | 'secondary';
}

/**
 * Botón reutilizable con soporte para variantes y estado deshabilitado.
 * Usa operadores ternarios para cambiar estilos según la variante y si está deshabilitado.
 */
export default function CustomButton({
  title,
  onPress,
  disabled = false,
  variant = 'primary',
}: CustomButtonProps) {
  // --- Ternario: estilo del contenedor según variante y estado disabled ---
  const buttonStyle: ViewStyle =
    variant === 'primary'
      ? disabled
        ? styles.disabledPrimary
        : styles.primary
      : disabled
      ? styles.disabledSecondary
      : styles.secondary;

  // --- Ternario: color del texto según variante ---
  const textStyle: TextStyle =
    variant === 'primary' ? styles.primaryText : styles.secondaryText;

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
          disabled ? styles.disabledText : textStyle,
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
  disabledPrimary: {
    backgroundColor: '#BDBDBD',
  },
  disabledSecondary: {
    backgroundColor: '#F5F5F5',
    borderColor: '#BDBDBD',
  },
  
  baseText: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  disabledText: {
    color: '#EEEEEE',
  },
  secondaryText: {
    color: '#4A90D9',
  },
  
});
