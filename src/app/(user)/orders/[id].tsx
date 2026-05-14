import { View, Text, FlatList, StyleSheet } from 'react-native';
import React from 'react';
import { useLocalSearchParams, Stack } from 'expo-router';
import orders from '@/assets/data/orders';
import OrderItemListItem from '@/src/components/OrderItemListItem';
import { Colors, Radius, Shadow } from '@/src/constants/theme';
import { OrderStatus } from '@/src/types';

const statusConfig: Record<OrderStatus, { color: string; bg: string; emoji: string }> = {
  New:        { color: '#3B82F6', bg: '#EFF6FF', emoji: '🆕' },
  Cooking:    { color: '#F59E0B', bg: '#FFFBEB', emoji: '👨‍🍳' },
  Delivering: { color: '#8B5CF6', bg: '#F5F3FF', emoji: '🛵' },
  Delivered:  { color: '#22C55E', bg: '#F0FDF4', emoji: '✅' },
};

const statusSteps: OrderStatus[] = ['New', 'Cooking', 'Delivering', 'Delivered'];

const OrderDetailsScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const order = orders.find((o) => o.id.toString() === id);

  if (!order) {
    return <Text style={styles.notFound}>Order not found</Text>;
  }

  const config = statusConfig[order.status];
  const currentStep = statusSteps.indexOf(order.status);

  return (
    <View style={styles.wrapper}>
      <Stack.Screen options={{ title: `Order #${id}` }} />
      <FlatList
        data={order.order_items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <>
            {/* Status card */}
            <View style={[styles.statusCard, { backgroundColor: config.bg }]}>
              <Text style={styles.statusEmoji}>{config.emoji}</Text>
              <View>
                <Text style={[styles.statusTitle, { color: config.color }]}>
                  {order.status}
                </Text>
                <Text style={styles.statusSub}>Order #{order.id}</Text>
              </View>
            </View>

            {/* Progress bar */}
            <View style={styles.progressRow}>
              {statusSteps.map((step, idx) => (
                <View key={step} style={styles.progressStep}>
                  <View style={[
                    styles.progressDot,
                    idx <= currentStep && styles.progressDotActive,
                  ]}>
                    <Text style={styles.progressDotText}>
                      {idx < currentStep ? '✓' : (idx + 1).toString()}
                    </Text>
                  </View>
                  <Text style={[
                    styles.progressLabel,
                    idx <= currentStep && styles.progressLabelActive,
                  ]}>{step}</Text>
                  {idx < statusSteps.length - 1 && (
                    <View style={[styles.progressLine, idx < currentStep && styles.progressLineActive]} />
                  )}
                </View>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Items Ordered</Text>
          </>
        }
        ListFooterComponent={
          <View style={styles.footer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalAmount}>${order.total.toFixed(2)}</Text>
            </View>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: Colors.background },
  list: { padding: 14, gap: 10 },
  notFound: { flex: 1, textAlign: 'center', marginTop: 40, color: Colors.textSecondary },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 20,
    borderRadius: Radius.xl,
    marginBottom: 16,
    ...Shadow.small,
  },
  statusEmoji: { fontSize: 40 },
  statusTitle: { fontSize: 22, fontWeight: '900', letterSpacing: -0.3 },
  statusSub: { fontSize: 13, color: Colors.textSecondary, marginTop: 2 },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  progressStep: {
    alignItems: 'center',
    flex: 1,
    position: 'relative',
  },
  progressDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  progressDotActive: { backgroundColor: Colors.primary },
  progressDotText: { fontSize: 11, fontWeight: '800', color: '#fff' },
  progressLabel: { fontSize: 10, color: Colors.textSecondary, fontWeight: '600', textAlign: 'center' },
  progressLabelActive: { color: Colors.primary },
  progressLine: {
    position: 'absolute',
    top: 14,
    left: '50%',
    right: '-50%',
    height: 2,
    backgroundColor: Colors.border,
    zIndex: -1,
  },
  progressLineActive: { backgroundColor: Colors.primary },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 8,
  },
  footer: {
    marginTop: 12,
    backgroundColor: '#fff',
    borderRadius: Radius.lg,
    padding: 16,
    ...Shadow.small,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: { fontSize: 16, fontWeight: '700', color: Colors.text },
  totalAmount: { fontSize: 24, fontWeight: '900', color: Colors.primary },
});