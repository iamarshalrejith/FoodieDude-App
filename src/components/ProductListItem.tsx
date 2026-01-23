import { StyleSheet, View, Text, Image } from "react-native";
import React from "react";
import products from "../../assets/data/products"
import { Colors } from "../constants/theme";
import { Product } from "../types"

// type Product = (typeof products)[number] // Gives me the union of all possible element types in this array.

const defaultPizzaImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/peperoni.png'

type ProductListItemProps = {
    product : Product
}

const ProductListItem = ({product}:ProductListItemProps) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: product.image || defaultPizzaImage }} style={styles.image}/>
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
};

export default ProductListItem;


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  title: { fontSize: 18, fontWeight: "600",marginVertical:10 },
  price: {
    color: Colors.light.tint,
    fontWeight: "bold",
  }
});
