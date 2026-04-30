import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { Order } from '../types';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import { Link, useSegments } from 'expo-router';
import { Colors, Shadow, Radius } from '../constants/theme';
import { FontAwesome } from '@expo/vector-icons';

dayjs.extend(relativeTime);

type OrderListItemProps = {
  order: Order;
};

const statusConfig: Record<string, { color: string; bg: string; icon: string }> = {
  New:        { color: '#3B82F6', bg: '#EFF6FF', icon: 'clock-o' },
  Cooking:    { color: '#F59E0B', bg: '#FFFBEB', icon: 'fire' },
  Delivering: { color: '#8B5CF6', bg: '#F5F3FF', icon: 'motorcycle' },
  Delivered:  { color: '#22C55E', bg: '#F0FDF4', icon: 'check-circle' },
};

const OrderListItem = ({ order }: OrderListItemProps) => {
  const segments = useSegments();
  const config = statusConfig[order.status] || statusConfig.New;
  const itemCount = order.order_items?.reduce((s, i) => s + i.quantity, 0) ?? 0;

  return (
    <Link href={`/${segments[0]}/orders/${order.id}`} asChild>
      <Pressable style={({ pressed }) => [styles.container, pressed && styles.pressed]}>
        <View style={styles.left}>
          <View style={[styles.iconBox, { backgroundColor: config.bg }]}>
            <FontAwesome name={config.icon as any} size={18} color={config.color} />
          </View>
          <View>
            <Text style={styles.title}>Order #{order.id}</Text>
            <Text style={styles.meta}>
              {dayjs(order.created_at).fromNow()}
              {itemCount > 0 ? `  ·  ${itemCount} item${itemCount > 1 ? 's' : ''}` : ''}
            </Text>
          </View>
        </View>
        <View style={styles.right}>
          <View style={[styles.statusBadge, { backgroundColor: config.bg }]}>
            <Text style={[styles.statusText, { color: config.color }]}>{order.status}</Text>
          </View>
          <Text style={styles.total}>${order.total?.toFixed(2)}</Text>
        </View>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: Radius.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...Shadow.small,
  },
  pressed: { opacity: 0.85, transform: [{ scale: 0.99 }] },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: '700',
    fontSize: 15,
    color: Colors.text,
  },
  meta: {
    color: Colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  right: {
    alignItems: 'flex-end',
    gap: 4,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  total: {
    fontWeight: '800',
    fontSize: 15,
    color: Colors.primary,
  },
});

export default OrderListItem;