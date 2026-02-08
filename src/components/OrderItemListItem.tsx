import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { Colors } from '../constants/theme';
import { OrderItem } from '../types';
import { defaultPizzaImage } from './ProductListItem';

type OrderItemListItemProps = {
  item: OrderItem;
};

const OrderItemListItem = ({ item }: OrderItemListItemProps) => {
  return (
    <View style={styles.container}>
      {/* Product Image */}
      <Image
        source={{ uri: item.products.image || defaultPizzaImage }}
        style={styles.image}
      />

      {/* Product Info */}
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.products.name}</Text>

        <View style={styles.subtitleContainer}>
          <Text style={styles.price}>
            ${item.products.price.toFixed(2)}
          </Text>
          <Text>Size: {item.size}</Text>
        </View>
      </View>

      {/* Quantity */}
      <View style={styles.quantitySelector}>
        <Text style={styles.quantity}>{item.quantity}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 75,
    aspectRatio: 1,
    marginRight: 10,
  },
  title: {
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 5,
  },
  subtitleContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  quantitySelector: {
    alignItems: 'center',
    marginLeft: 10,
  },
  quantity: {
    fontWeight: '500',
    fontSize: 18,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: 'bold',
  },
});

export default OrderItemListItem;
