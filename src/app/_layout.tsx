import { Stack } from "expo-router";
import CartProvider from "../providers/CartProvider";

export default function RootLayout() {
  return (
    <CartProvider>
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{headerShown:false}}/>
      <Stack.Screen name="cart" options={{presentation: 'modal'}}/>
    </Stack>
    </CartProvider>
  );
}
