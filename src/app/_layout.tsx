import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CartProvider from '../providers/CartProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <CartProvider>
          <Stack>
            <Stack.Screen name="index" />
            <Stack.Screen name="(admin)" options={{ headerShown: false }} />
            <Stack.Screen name="(user)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen
              name="cart"
              options={{
                presentation: 'modal',
                title: 'Your Cart',
                headerStyle: { backgroundColor: '#FF4500' },
                headerTintColor: '#fff',
                headerTitleStyle: { fontWeight: '700' },
              }}
            />
          </Stack>
        </CartProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}