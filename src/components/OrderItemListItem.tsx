import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import React from 'react';
import { Colors, Radius, Shadow } from '../constants/theme';
import { OrderItem } from '../types';
import { defaultPizzaImage } from './ProductListItem';

type OrderItemListItemProps = {
  item: OrderItem;
};

const OrderItemListItem = ({ item }: OrderItemListItemProps) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: item.products.image || defaultPizzaImage }}
        style={styles.image}
        contentFit="contain"
      />
      <View style={styles.info}>
        <Text style={styles.title}>{item.products.name}</Text>
        <View style={styles.meta}>
          <View style={styles.sizeChip}>
            <Text style={styles.sizeText}>{item.size}</Text>
          </View>
          <Text style={styles.price}>${item.products.price.toFixed(2)}</Text>
        </View>
      </View>
      <View style={styles.qtyBadge}>
        <Text style={styles.qtyLabel}>Qty</Text>
        <Text style={styles.quantity}>{item.quantity}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: Radius.lg,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    ...Shadow.small,
  },
  image: {
    width: 68,
    height: 68,
    borderRadius: Radius.md,
    backgroundColor: '#FFF8F5',
  },
  info: { flex: 1, gap: 6 },
  title: { fontWeight: '700', fontSize: 15, color: Colors.text },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  sizeChip: {
    backgroundColor: '#F5F0EB',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.full,
  },
  sizeText: { fontSize: 11, fontWeight: '700', color: Colors.primary },
  price: { color: Colors.primary, fontWeight: '800', fontSize: 14 },
  qtyBadge: {
    backgroundColor: '#F5F0EB',
    borderRadius: Radius.md,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
  },
  qtyLabel: { fontSize: 10, color: Colors.textSecondary, fontWeight: '600' },
  quantity: { fontWeight: '800', fontSize: 18, color: Colors.text },
});

export default OrderItemListItem;