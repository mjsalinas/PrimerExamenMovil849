// ============================================
// Componente reutilizable: ScreenContainer
// ============================================

import React, { ReactNode } from 'react';

import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

interface ScreenContainerProps {
  children: ReactNode;
  scrollable?: boolean;
}

export default function ScreenContainer({
  children,
  scrollable = true,
}: ScreenContainerProps) {
  const content = scrollable ? (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={styles.viewContent}>
      {children}
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      {content}
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

  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
  },

  viewContent: {
    flex: 1,
    padding: 20,
    paddingBottom: 40,
  },
});