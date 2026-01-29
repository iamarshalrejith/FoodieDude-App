import { Stack } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import CartProvider from '../providers/CartProvider'

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <CartProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="cart" options={{ presentation: 'modal' }} />
        </Stack>
      </CartProvider>
    </SafeAreaProvider>
  )
}
