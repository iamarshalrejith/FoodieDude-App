import { View, FlatList, Text, StyleSheet } from 'react-native';
import React from 'react';
import orders from '@/assets/data/orders';
import OrderListItem from '@/src/components/OrderListItem';
import { Colors } from '@/src/constants/theme';

const AdminArchiveScreen = () => {
  const delivered = orders.filter((o) => o.status === 'Delivered');
  return (
    <View style={styles.wrapper}>
      <FlatList
        data={delivered}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <OrderListItem order={item} />}
        contentContainerStyle={[styles.list, delivered.length === 0 && styles.emptyList]}
        ListHeaderComponent={
          <Text style={styles.heading}>Delivered Orders</Text>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>📦</Text>
            <Text style={styles.emptyTitle}>No deliveries yet</Text>
            <Text style={styles.emptySub}>Completed orders will appear here.</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default AdminArchiveScreen;

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