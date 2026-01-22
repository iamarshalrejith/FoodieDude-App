import { View } from "react-native";
import React from "react";
import products from "../../../assets/data/products";
import ProductListItem from "@/src/components/ProductListItem";

const product = products[0];

const MenuScreen = () => {
  return (
    <View>
      <ProductListItem product={products[0]} />
      <ProductListItem product={products[1]} />
    </View>
  );
};

export default MenuScreen;
