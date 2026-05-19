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
type Props =  {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
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
}: Props) {
  // --- Ternario: estilo del contenedor según variante y estado disabled ---
  const buttonStyle: ViewStyle = {
    ...(variant === 'primary' 
        ? styles.primary 
        : variant === 'secondary' 
        ? styles.secondary 
        : styles.danger),
  };

  // --- Ternario: color del texto según variante ---
  const textStyle: TextStyle =
    variant === 'primary' 
      ? styles.primaryText 
      : variant === 'secondary' 
      ? styles.secondaryText 
      : styles.dangerText;

  return (
    <TouchableOpacity
      style={[styles.base, buttonStyle]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={[styles.baseText, textStyle]}> 
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
  danger: {
    backgroundColor: '#E53935', 
  },
  disabledContainer: {
    opacity: 0.5, 
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
  dangerText: {
    color: '#FFFFFF',
  },
});