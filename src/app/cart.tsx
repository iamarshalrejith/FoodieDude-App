import { View, Text, Platform, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCart } from "../providers/CartProvider";
import CartListItem from "../components/CartListItem";
import Button from "../components/Button";

const CartScreen = () => {
  const { items, total } = useCart();

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{
          padding: 10,
          gap: 10,
          flexGrow: items.length === 0 ? 1 : 0,
        }}
        ListEmptyComponent={
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ fontSize: 16, color: "#666" }}>
              Your cart is empty 🛒
            </Text>
          </View>
        }
      />
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          marginVertical: 10,
          marginLeft: 10,
          backgroundColor: "#b8d332",
          borderRadius: 5,
          padding: 8,
          maxWidth: 100,
          textAlign: "center",
          width: "100%",
        }}
      >
        Total: ${total}
      </Text>
      {items.length > 0 && <Button text="Checkout" />}
      <StatusBar style={Platform.OS === "android" ? "light" : "auto"} />
    </SafeAreaView>
  );
};

export default CartScreen;
