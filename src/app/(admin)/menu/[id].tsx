import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

import products from "@/assets/data/products";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import { useCart } from "@/src/providers/CartProvider";
import { PizzaSize } from "@/src/types";

const ProductDetailsScreen = () => {
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");

  const { id } = useLocalSearchParams<{ id: string }>();
  const { addItem } = useCart();
  const router = useRouter();

  const product = products.find((p) => p.id.toString() === id);

  const addToCart = () => {
    if (!product) return;
    addItem(product, selectedSize);
    router.push("/cart");
  };

  if (!product) {
    return <Text>Product not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: product.name,
          headerRight: () => (
            <Pressable
              onPress={() =>
                router.push(`/(admin)/menu/create?id=${id}`)
              }
            >
              <FontAwesome name="pencil" size={22} color="black" />
            </Pressable>
          ),
        }}
      />

      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        style={styles.image}
      />

      <Text style={styles.price}>
        {product.name} || ${product.price}
      </Text>
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "#c4e80c",
    borderRadius: 5,
    padding: 10,
  },
});
