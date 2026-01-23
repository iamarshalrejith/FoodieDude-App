import { View, FlatList } from "react-native";
import React from "react";
import products from "../../../assets/data/products";
import ProductListItem from "@/src/components/ProductListItem";

const MenuScreen = () => {
  return (
    <View>
      <FlatList
        data={products} // requires array of items
        renderItem={({ item }) => <ProductListItem product={item} />} // should be a function tells flatlist how one single item from data be rendered
        numColumns={2} // i want in 2 cols
        contentContainerStyle={{gap:10,padding:10}} // fr row 
        columnWrapperStyle={{gap:10}} // fr col

      />
    </View>
  );
};

export default MenuScreen;
