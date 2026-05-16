import { View, Text, FlatList, Pressable, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useLocalSearchParams, Stack } from 'expo-router';
import orders from '@/assets/data/orders';
import OrderItemListItem from '@/src/components/OrderItemListItem';
import { OrderStatusList, OrderStatus } from '@/src/types';
import { Colors, Radius, Shadow } from '@/src/constants/theme';

const statusConfig: Record<OrderStatus, { color: string; bg: string; emoji: string }> = {
  New:        { color: '#3B82F6', bg: '#EFF6FF', emoji: '🆕' },
  Cooking:    { color: '#F59E0B', bg: '#FFFBEB', emoji: '👨‍🍳' },
  Delivering: { color: '#8B5CF6', bg: '#F5F3FF', emoji: '🛵' },
  Delivered:  { color: '#22C55E', bg: '#F0FDF4', emoji: '✅' },
};

const AdminOrderDetailsScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const order = orders.find((o) => o.id.toString() === id);
  const [status, setStatus] = useState<OrderStatus>(order?.status ?? 'New');

  if (!order) {
    return <Text style={styles.notFound}>Order not found</Text>;
  }

  const config = statusConfig[status];

  const updateStatus = (newStatus: OrderStatus) => {
    setStatus(newStatus);
    // TODO: await updateOrderStatus({ id: order.id, status: newStatus })
    console.log('Update status to', newStatus);
  };

  return (
    <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
      <Stack.Screen options={{ title: `Order #${id}` }} />

      {/* Status banner */}
      <View style={[styles.statusBanner, { backgroundColor: config.bg }]}>
        <Text style={styles.statusEmoji}>{config.emoji}</Text>
        <View>
          <Text style={[styles.statusTitle, { color: config.color }]}>{status}</Text>
          <Text style={styles.statusSub}>Order #{order.id}  ·  ${order.total.toFixed(2)}</Text>
        </View>
      </View>

      {/* Status update buttons */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Update Status</Text>
        <View style={styles.statusRow}>
          {OrderStatusList.map((s) => {
            const cfg = statusConfig[s];
            const isActive = status === s;
            return (
              <Pressable
                key={s}
                onPress={() => updateStatus(s)}
                style={[
                  styles.statusBtn,
                  { borderColor: cfg.color, backgroundColor: isActive ? cfg.color : '#fff' },
                ]}
              >
                <Text style={[styles.statusBtnText, { color: isActive ? '#fff' : cfg.color }]}>
                  {s}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Items */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Items</Text>
        <View style={styles.itemsList}>
          {order.order_items?.map((item) => (
            <OrderItemListItem key={item.id} item={item} />
          ))}
        </View>
      </View>

      {/* Total */}
      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>Order Total</Text>
        <Text style={styles.totalAmount}>${order.total.toFixed(2)}</Text>
      </View>
    </ScrollView>
  );
};

export default AdminOrderDetailsScreen;

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: Colors.background },
  notFound: { textAlign: 'center', marginTop: 40, color: Colors.textSecondary },
  statusBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    margin: 14,
    padding: 20,
    borderRadius: Radius.xl,
    ...Shadow.small,
  },
  statusEmoji: { fontSize: 40 },
  statusTitle: { fontSize: 22, fontWeight: '900' },
  statusSub: { fontSize: 13, color: Colors.textSecondary, marginTop: 2 },
  section: { paddingHorizontal: 14, marginBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: Colors.text, marginBottom: 10 },
  statusRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  statusBtn: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: Radius.full,
    borderWidth: 2,
    ...Shadow.small,
  },
  statusBtnText: { fontSize: 13, fontWeight: '700' },
  itemsList: { gap: 10 },
  totalCard: {
    marginHorizontal: 14,
    marginBottom: 32,
    backgroundColor: '#fff',
    borderRadius: Radius.lg,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...Shadow.small,
  },
  totalLabel: { fontSize: 16, fontWeight: '700', color: Colors.text },
  totalAmount: { fontSize: 26, fontWeight: '900', color: Colors.primary },
});