import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import products from '@/assets/data/products';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import { Colors, Radius, Shadow } from '@/src/constants/theme';
import { PizzaSize } from '@/src/types';

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

const AdminProductDetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const product = products.find((p) => p.id.toString() === id);

  if (!product) {
    return <Text style={styles.notFound}>Product not found</Text>;
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Stack.Screen
        options={{
          title: product.name,
          headerRight: () => (
            <Pressable onPress={() => router.push(`/(admin)/menu/create?id=${id}`)}>
              <FontAwesome name="pencil" size={20} color="#fff" />
            </Pressable>
          ),
        }}
      />

      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image || defaultPizzaImage }}
          style={styles.image}
          contentFit="contain"
          transition={300}
        />
      </View>

      <View style={styles.content}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>{product.name}</Text>
          <View style={styles.priceBadge}>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>Available Sizes</Text>
        <View style={styles.sizes}>
          {sizes.map((s) => (
            <View key={s} style={styles.sizeChip}>
              <Text style={styles.sizeText}>{s}</Text>
            </View>
          ))}
        </View>

        <Pressable
          style={styles.editBtn}
          onPress={() => router.push(`/(admin)/menu/create?id=${id}`)}
        >
          <FontAwesome name="pencil" size={14} color="#fff" />
          <Text style={styles.editBtnText}>Edit Product</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AdminProductDetailScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  notFound: { textAlign: 'center', marginTop: 40, color: Colors.textSecondary },
  imageContainer: { backgroundColor: '#FFF8F5', padding: 24 },
  image: { width: '100%', aspectRatio: 1 },
  content: { padding: 20, gap: 8 },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  name: {
    flex: 1,
    fontSize: 24,
    fontWeight: '900',
    color: Colors.text,
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
  sectionLabel: { fontSize: 15, fontWeight: '800', color: Colors.text, marginBottom: 10 },
  sizes: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  sizeChip: {
    width: 52,
    height: 52,
    borderRadius: Radius.md,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadow.small,
  },
  sizeText: { fontWeight: '800', fontSize: 16, color: Colors.text },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.secondary,
    borderRadius: Radius.md,
    padding: 16,
    ...Shadow.medium,
  },
  editBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});