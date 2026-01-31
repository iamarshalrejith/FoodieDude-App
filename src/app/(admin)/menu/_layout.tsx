import { FontAwesome } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { Pressable } from "react-native";

export default function MenuStack() {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Menu",
          headerRight: () => (
            <Pressable onPress={() => router.push("/(admin)/menu/create")}>
              <FontAwesome name="plus-square-o" size={22} color="black" />
            </Pressable>
          ),
        }}
      />
       <Stack.Screen
        name="[id]"
        options={{
          title: "Menu",
          headerRight: () => (
            <Pressable onPress={() => router.push("/")}>
              <FontAwesome name="pencil" size={22} color="black" />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
