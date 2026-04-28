import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';
import React from 'react';
import { Colors, Shadow, Radius } from '../constants/theme';
import { Product } from '../types';
import { useRouter, useSegments } from 'expo-router';

export const defaultPizzaImage =
  'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/peperoni.png';

type ProductListItemProps = {
  product: Product;
};

const ProductListItem = ({ product }: ProductListItemProps) => {
  const router = useRouter();
  const segments = useSegments();

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={() => router.push(`/${segments[0]}/menu/${product.id}`)}
    >
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: product.image || defaultPizzaImage }}
          style={styles.image}
          contentFit="contain"
          transition={200}
        />
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{product.name}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          <View style={styles.addBtn}>
            <Text style={styles.addBtnText}>+</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: Radius.xl,
    flex: 1,
    maxWidth: '50%',
    overflow: 'hidden',
    ...Shadow.medium,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.97 }],
  },
  imageWrapper: {
    backgroundColor: '#FFF8F5',
    padding: 8,
    borderRadius: Radius.xl,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  info: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
    lineHeight: 19,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    color: Colors.primary,
    fontWeight: '800',
    fontSize: 16,
  },
  addBtn: {
    backgroundColor: Colors.primary,
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 22,
  },
});