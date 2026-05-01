import { View, Text, StyleSheet, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';
import Button from '../../components/Button';
import { useRouter } from 'expo-router';
import { Colors, Radius, Shadow } from '../../constants/theme';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const onSignUp = async () => {
    setError('');
    if (!email || !password) { setError('Please fill in all fields'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return; }
    setLoading(true);
    try {
      // TODO: const { error } = await supabase.auth.signUp({ email, password })
      // if (error) throw error
      await new Promise((res) => setTimeout(res, 800));
      router.replace('/(user)/menu');
    } catch (e: any) {
      setError(e.message || 'Sign up failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.wrapper}
    >
      <View style={styles.container}>
        <View style={styles.logoArea}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoEmoji}>🍕</Text>
          </View>
          <Text style={styles.brand}>FoodieDude</Text>
          <Text style={styles.tagline}>Join the foodie fam</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Create account</Text>
          <Text style={styles.subtitle}>Sign up to start ordering</Text>

          {error ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="you@example.com"
            placeholderTextColor="#9CA3AF"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="Min. 6 characters"
            placeholderTextColor="#9CA3AF"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />

          <Button text="Create Account" onPress={onSignUp} loading={loading} />

          <Pressable onPress={() => router.push('/(auth)/sign-in')}>
            <Text style={styles.switchText}>
              Already have an account?{' '}
              <Text style={styles.link}>Sign in</Text>
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  logoArea: { alignItems: 'center', marginBottom: 32 },
  logoCircle: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: Colors.primary,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 12, ...Shadow.medium,
  },
  logoEmoji: { fontSize: 40 },
  brand: { fontSize: 30, fontWeight: '900', color: Colors.text, letterSpacing: -0.5 },
  tagline: { fontSize: 14, color: Colors.textSecondary, marginTop: 4 },
  card: { backgroundColor: '#fff', borderRadius: 24, padding: 24, ...Shadow.large },
  title: { fontSize: 24, fontWeight: '800', color: Colors.text, marginBottom: 4 },
  subtitle: { fontSize: 14, color: Colors.textSecondary, marginBottom: 24 },
  errorBox: {
    backgroundColor: '#FEF2F2', borderRadius: Radius.md,
    padding: 12, marginBottom: 16, borderWidth: 1, borderColor: '#FECACA',
  },
  errorText: { color: '#EF4444', fontSize: 13, fontWeight: '600' },
  label: { fontSize: 13, fontWeight: '700', color: Colors.text, marginBottom: 6 },
  input: {
    backgroundColor: Colors.background, borderWidth: 1.5,
    borderColor: Colors.border, borderRadius: Radius.md,
    padding: 14, fontSize: 15, marginBottom: 16, color: Colors.text,
  },
  switchText: { marginTop: 16, textAlign: 'center', fontSize: 14, color: Colors.textSecondary },
  link: { color: Colors.primary, fontWeight: '700' },
});