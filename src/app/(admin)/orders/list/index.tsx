import { View, Text, FlatList } from "react-native";
import React from "react";
import orders from "../../../../../assets/data/orders";
import OrderListItem from "@/src/components/OrderListItem";

const OrderScreen = () => {
  return (
    <FlatList data={orders} renderItem={({ item }) => <OrderListItem order={item}/>} />
  );
};

export default OrderScreen;
