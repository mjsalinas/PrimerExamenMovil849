// ============================================
// Componente reutilizable: InfoCard
// ============================================
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

/** Props de la tarjeta informativa */
interface InfoCardProps {
  title: string;
  subtitle?: string;
  rightText?: string;
  onPress?: () => void;
  variant?: 'default' | 'done';
}

/**
 * Tarjeta reutilizable para mostrar información.
 * Usa ternarios para cambiar estilo según variante (done / default).
 */
export default function InfoCard({
  title,
  subtitle,
  rightText,
  onPress,
  variant = 'default',
}: InfoCardProps) {
  // --- Ternario: estilo condicionado según variante ---
  const cardStyle =
    variant === 'done' ? styles.cardDone : styles.cardDefault;

  const titleStyle =
    variant === 'done' ? styles.titleDone : styles.titleDefault;

  const content = (
    <View style={[styles.card, cardStyle]}>
      <View style={styles.leftContent}>
        <Text style={[styles.title, titleStyle]}>{title}</Text>
        {/* --- Renderizado condicionado: subtítulo --- */}
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {/* --- Renderizado condicionado: texto derecho --- */}
      {rightText ? (
        <Text style={styles.rightText}>{rightText}</Text>
      ) : null}
    </View>
  );

  // Si tiene onPress, envolver en TouchableOpacity
  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginVertical: 6,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cardDefault: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E0E0E0',
  },
  cardDone: {
    backgroundColor: '#E8F5E9',
    borderColor: '#81C784',
  },
  leftContent: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  titleDefault: {
    color: '#263238',
  },
  titleDone: {
    color: '#2E7D32',
    textDecorationLine: 'line-through',
  },
  subtitle: {
    fontSize: 13,
    color: '#78909C',
    marginTop: 4,
  },
  rightText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#607D8B',
  },
});
