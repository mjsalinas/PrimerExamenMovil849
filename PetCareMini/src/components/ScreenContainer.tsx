// ============================================
// Componente reutilizable: ScreenContainer
// ============================================
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/** Props del contenedor de pantalla */
interface ScreenContainerProps {
  children: React.ReactNode;
  scrollable?: boolean;
}

/**
 * Wrapper reutilizable para pantallas.
 * Agrega padding, color de fondo y SafeAreaView.
 */
export default function ScreenContainer({
  children,
  scrollable = true,
}: ScreenContainerProps) {
  return (
    <SafeAreaView style={styles.safe}>
      {scrollable ? (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.scroll, styles.content]}>{children}</View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
});
