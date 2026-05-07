import {
  View, Text, StyleSheet, Pressable, ScrollView, Alert,
} from 'react-native';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import products from '@/assets/data/products';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import Button from '@/src/components/Button';
import { useCart } from '@/src/providers/CartProvider';
import { PizzaSize } from '@/src/types';
import { Colors, Shadow, Radius } from '@/src/constants/theme';

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

const sizeLabel: Record<PizzaSize, string> = {
  S: 'Small\n8"',
  M: 'Medium\n10"',
  L: 'Large\n12"',
  XL: 'XL\n14"',
};

const ProductDetailsScreen = () => {
  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');
  const { id } = useLocalSearchParams();
  const { addItem } = useCart();
  const router = useRouter();

  const product = products.find((p) => p.id.toString() === id);

  const addToCart = () => {
    if (!product) return;
    addItem(product, selectedSize);
    Alert.alert('Added to cart! 🛒', `${product.name} (${selectedSize}) added.`, [
      { text: 'Keep Shopping', style: 'cancel' },
      { text: 'View Cart', onPress: () => router.push('/cart') },
    ]);
  };

  if (!product) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Product not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Stack.Screen options={{ title: product.name, headerTransparent: false }} />

      {/* Hero image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image || defaultPizzaImage }}
          style={styles.image}
          contentFit="contain"
          transition={300}
        />
      </View>

      <View style={styles.content}>
        {/* Name + price */}
        <View style={styles.nameRow}>
          <Text style={styles.name}>{product.name}</Text>
          <View style={styles.priceBadge}>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          </View>
        </View>

        <Text style={styles.desc}>
          Fresh ingredients, baked to perfection. Choose your size below and add to cart.
        </Text>

        {/* Size selector */}
        <Text style={styles.sectionLabel}>Choose Size</Text>
        <View style={styles.sizes}>
          {sizes.map((size) => {
            const isSelected = selectedSize === size;
            return (
              <Pressable
                key={size}
                onPress={() => setSelectedSize(size)}
                style={[styles.sizeBtn, isSelected && styles.sizeBtnSelected]}
              >
                <Text style={[styles.sizeLetter, isSelected && styles.sizeLetterSelected]}>
                  {size}
                </Text>
                <Text style={[styles.sizeInch, isSelected && styles.sizeInchSelected]}>
                  {size === 'S' ? '8"' : size === 'M' ? '10"' : size === 'L' ? '12"' : '14"'}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.btnRow}>
          <Button text={`Add to Cart — $${product.price.toFixed(2)}`} onPress={addToCart} />
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  notFound: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  notFoundText: { fontSize: 16, color: Colors.textSecondary },
  imageContainer: {
    backgroundColor: '#FFF8F5',
    padding: 24,
  },
  image: { width: '100%', aspectRatio: 1 },
  content: {
    padding: 20,
    gap: 6,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  name: {
    flex: 1,
    fontSize: 24,
    fontWeight: '900',
    color: Colors.text,
    letterSpacing: -0.5,
    marginRight: 12,
  },
  priceBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: Radius.full,
    ...Shadow.small,
  },
  price: { color: '#fff', fontWeight: '800', fontSize: 16 },
  desc: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 12,
  },
  sizes: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },
  sizeBtn: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: Colors.border,
    ...Shadow.small,
  },
  sizeBtnSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
    ...Shadow.medium,
  },
  sizeLetter: {
    fontSize: 22,
    fontWeight: '900',
    color: Colors.text,
  },
  sizeLetterSelected: { color: '#fff' },
  sizeInch: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginTop: 2,
  },
  sizeInchSelected: { color: 'rgba(255,255,255,0.8)' },
  btnRow: { marginTop: 8 },
});