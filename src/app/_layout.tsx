import { Stack } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import CartProvider from '../providers/CartProvider'

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <CartProvider>
        <Stack>
          <Stack.Screen name="index" /> 
          <Stack.Screen name="(admin)" options={{ headerShown: false }} />
          <Stack.Screen name="(user)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="cart" options={{ presentation: 'modal' }} />
        </Stack>
      </CartProvider>
    </SafeAreaProvider>
  )
}
