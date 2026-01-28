import { FontAwesome } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { Pressable } from "react-native";

export default function MenuStack() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerRight: () => (
          <Pressable onPress={() => router.push("/cart")}>
            <FontAwesome name="shopping-bag" size={22} color="black" />
          </Pressable>
        )
      }}
    >
      <Stack.Screen name="index" options={{ title: "Menu" }} />
    </Stack>
  );
}
