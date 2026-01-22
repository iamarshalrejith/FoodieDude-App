import { StyleSheet, View, Text, Image } from "react-native";
import React from "react";
import products from "../../../assets/data/products"
import { Colors } from "../../constants/theme";

const product = products[0];

const index = () => {
  return (
    <View style={styles.container}>
      <Image source={{uri: product.image}} style={styles.image}/>
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
};

export default index;

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
