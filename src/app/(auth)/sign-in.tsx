import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import Button from '../../components/Button'
import { useRouter } from 'expo-router'

const SignInScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const onSignIn = () => {
    console.log('Email:', email)
    console.log('Password:', password)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Button text="Sign In" onPress={onSignIn} />

      <Pressable>
        <Text style={styles.createAccountText} onPress={() => router.push('/(auth)/sign-up')}>
          Don’t have an account? <Text style={styles.link}>Create one</Text>
        </Text>
      </Pressable>
    </View>
  )
}

export default SignInScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
    maxWidth: 500,
    alignSelf: 'center',
  },
  createAccountText: {
    marginTop: 15,
    textAlign: 'center',
    fontSize: 14,
    color: '#555',
  },
  link: {
    color: '#f78b48',
    fontWeight: '600',
  },
})
