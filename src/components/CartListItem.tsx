import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import React from 'react';
import { Colors, Shadow, Radius } from '../constants/theme';
import { CartItem } from '../types';
import { defaultPizzaImage } from './ProductListItem';
import { useCart } from '../providers/CartProvider';

type CartListItemProps = {
  cartItem: CartItem;
};

const CartListItem = ({ cartItem }: CartListItemProps) => {
  const { updateQuantity } = useCart();

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: cartItem.product.image || defaultPizzaImage }}
        style={styles.image}
        contentFit="contain"
      />
      <View style={styles.info}>
        <Text style={styles.title}>{cartItem.product.name}</Text>
        <View style={styles.meta}>
          <View style={styles.sizeChip}>
            <Text style={styles.sizeText}>{cartItem.size}</Text>
          </View>
          <Text style={styles.price}>${cartItem.product.price.toFixed(2)}</Text>
        </View>
      </View>
      <View style={styles.quantitySelector}>
        <Pressable
          onPress={() => updateQuantity(cartItem.id, -1)}
          style={styles.qtyBtn}
        >
          <Text style={styles.qtyBtnText}>−</Text>
        </Pressable>
        <Text style={styles.quantity}>{cartItem.quantity}</Text>
        <Pressable
          onPress={() => updateQuantity(cartItem.id, 1)}
          style={styles.qtyBtn}
        >
          <Text style={styles.qtyBtnText}>+</Text>
        </Pressable>
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
    width: 72,
    height: 72,
    borderRadius: Radius.md,
    backgroundColor: '#FFF8F5',
  },
  info: {
    flex: 1,
    gap: 6,
  },
  title: {
    fontWeight: '700',
    fontSize: 15,
    color: Colors.text,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sizeChip: {
    backgroundColor: '#F5F0EB',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.full,
  },
  sizeText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primary,
  },
  price: {
    color: Colors.primary,
    fontWeight: '800',
    fontSize: 15,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F5F0EB',
    borderRadius: Radius.full,
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 20,
  },
  quantity: {
    fontWeight: '800',
    fontSize: 16,
    color: Colors.text,
    minWidth: 20,
    textAlign: 'center',
  },
});

export default CartListItem;