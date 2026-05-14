import { View, FlatList, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import products from '@/assets/data/products';
import ProductListItem from '@/src/components/ProductListItem';
import { Colors } from '@/src/constants/theme';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

const AdminMenuScreen = () => {
  const router = useRouter();
  return (
    <View style={styles.wrapper}>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        ListHeaderComponent={
          <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle}>Menu Items</Text>
              <Text style={styles.headerSub}>{products.length} products</Text>
            </View>
            <Pressable style={styles.addBtn} onPress={() => router.push('/(admin)/menu/create')}>
              <FontAwesome name="plus" size={14} color="#fff" />
              <Text style={styles.addBtnText}>Add New</Text>
            </Pressable>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default AdminMenuScreen;

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: Colors.background },
  list: { padding: 14, gap: 12, paddingBottom: 24 },
  row: { gap: 12 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: { fontSize: 24, fontWeight: '900', color: Colors.text, letterSpacing: -0.5 },
  headerSub: { fontSize: 13, color: Colors.textSecondary, marginTop: 2 },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
  },
  addBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },
});