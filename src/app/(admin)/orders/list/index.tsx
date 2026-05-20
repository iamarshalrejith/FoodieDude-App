import { View, FlatList, Text, StyleSheet } from 'react-native';
import React from 'react';
import orders from '@/assets/data/orders';
import OrderListItem from '@/src/components/OrderListItem';
import { Colors } from '@/src/constants/theme';

const AdminActiveOrdersScreen = () => {
  const active = orders.filter((o) => o.status !== 'Delivered');
  return (
    <View style={styles.wrapper}>
      <FlatList
        data={active}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <OrderListItem order={item} />}
        contentContainerStyle={[styles.list, active.length === 0 && styles.emptyList]}
        ListHeaderComponent={
          <Text style={styles.heading}>Active Orders</Text>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🎉</Text>
            <Text style={styles.emptyTitle}>All caught up!</Text>
            <Text style={styles.emptySub}>No active orders right now.</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default AdminActiveOrdersScreen;

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: Colors.background },
  list: { padding: 14, gap: 10 },
  emptyList: { flexGrow: 1 },
  heading: { fontSize: 20, fontWeight: '800', color: Colors.text, marginBottom: 8 },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 60 },
  emptyEmoji: { fontSize: 56, marginBottom: 12 },
  emptyTitle: { fontSize: 20, fontWeight: '800', color: Colors.text, marginBottom: 6 },
  emptySub: { fontSize: 14, color: Colors.textSecondary },
});