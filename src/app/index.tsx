import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import Button from '../components/Button';
import { Link } from 'expo-router';
import { Colors, Shadow, Radius } from '../constants/theme';

const IndexScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoEmoji}>🍕</Text>
        </View>
        <Text style={styles.brand}>FoodieDude</Text>
        <Text style={styles.tagline}>Piping hot, delivered fast.</Text>
      </View>

      <View style={styles.buttons}>
        <Link href="/(user)" asChild>
          <Button text="Browse Menu" />
        </Link>
        <Link href="/(auth)/sign-in" asChild>
          <Button text="Sign In" variant="outline" />
        </Link>
        <Link href="/(auth)/sign-up" asChild>
          <Button text="Create Account" variant="secondary" />
        </Link>
        <Link href="/(admin)" asChild>
          <Button text="Admin Panel" variant="outline" />
        </Link>
      </View>
    </View>
  );
};

export default IndexScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    padding: 24,
  },
  hero: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    ...Shadow.large,
  },
  logoEmoji: { fontSize: 52 },
  brand: {
    fontSize: 38,
    fontWeight: '900',
    color: Colors.text,
    letterSpacing: -1,
  },
  tagline: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginTop: 6,
  },
  buttons: { gap: 4 },
});