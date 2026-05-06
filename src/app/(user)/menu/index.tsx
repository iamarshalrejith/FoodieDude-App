import { View, FlatList, Text, StyleSheet } from 'react-native';
import React from 'react';
import products from '@/assets/data/products';
import ProductListItem from '@/src/components/ProductListItem';
import { Colors } from '@/src/constants/theme';

const MenuScreen = () => {
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
            <Text style={styles.headerTitle}>Our Menu 🍕</Text>
            <Text style={styles.headerSub}>{products.length} delicious options</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: Colors.background },
  list: { padding: 14, gap: 12, paddingBottom: 24 },
  row: { gap: 12 },
  header: { marginBottom: 8, paddingBottom: 4 },
  headerTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: Colors.text,
    letterSpacing: -0.5,
  },
  headerSub: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});