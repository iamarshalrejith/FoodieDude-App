import { View, Text, Platform, FlatList, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../providers/CartProvider';
import CartListItem from '../components/CartListItem';
import Button from '../components/Button';
import { Colors, Radius, Shadow } from '../constants/theme';

const CartScreen = () => {
  const { items, total, checkout, isCheckingOut } = useCart();

  return (
    <SafeAreaView style={styles.wrapper} edges={['bottom']}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.list,
          items.length === 0 && styles.emptyList,
        ]}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🛒</Text>
            <Text style={styles.emptyTitle}>Your cart is empty</Text>
            <Text style={styles.emptySub}>Add some pizzas to get started!</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />

      {items.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>
              {items.reduce((s, i) => s + i.quantity, 0)} items
            </Text>
            <View style={styles.totalBox}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
            </View>
          </View>
          <Button
            text={isCheckingOut ? 'Placing Order...' : 'Place Order 🍕'}
            onPress={checkout}
            loading={isCheckingOut}
          />
        </View>
      )}

      <StatusBar style={Platform.OS === 'android' ? 'light' : 'auto'} />
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: Colors.background },
  list: { padding: 14, gap: 10 },
  emptyList: { flexGrow: 1 },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
  },
  emptyEmoji: { fontSize: 64, marginBottom: 16 },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 8,
  },
  emptySub: { fontSize: 14, color: Colors.textSecondary },
  footer: {
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom: 12,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    ...Shadow.large,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  totalBox: { alignItems: 'flex-end' },
  totalLabel: { fontSize: 12, color: Colors.textSecondary, fontWeight: '600' },
  totalAmount: {
    fontSize: 26,
    fontWeight: '900',
    color: Colors.primary,
    letterSpacing: -0.5,
  },
});