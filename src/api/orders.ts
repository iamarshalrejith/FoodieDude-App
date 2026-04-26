import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Order, OrderStatus } from '../types';
import { useAuth } from '../providers/AuthProvider';

export const useAdminOrderList = ({ archived = false } = {}) => {
  const queryClient = useQueryClient();
  const statuses: OrderStatus[] = archived
    ? ['Delivered']
    : ['New', 'Cooking', 'Delivering'];

  const query = useQuery({
    queryKey: ['orders', { archived }],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*, products(*))')
        .in('status', statuses)
        .order('created_at', { ascending: false });
      if (error) throw new Error(error.message);
      return data as Order[];
    },
  });

  useEffect(() => {
    const sub = supabase
      .channel('admin_orders')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'orders' },
        () => queryClient.invalidateQueries({ queryKey: ['orders'] })
      )
      .subscribe();
    return () => { supabase.removeChannel(sub); };
  }, []);

  return query;
};

export const useMyOrderList = () => {
  const { session } = useAuth();
  const userId = session?.user.id;

  return useQuery({
    queryKey: ['orders', { userId }],
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*, products(*))')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      if (error) throw new Error(error.message);
      return data as Order[];
    },
  });
};

export const useOrderDetails = (id: number) => {
  return useQuery({
    queryKey: ['orders', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*, products(*))')
        .eq('id', id)
        .single();
      if (error) throw new Error(error.message);
      return data as Order;
    },
  });
};

export const useInsertOrder = () => {
  const queryClient = useQueryClient();
  const { session } = useAuth();

  return useMutation({
    async mutationFn(data: { total: number; items: Array<{ product_id: number; size: string; quantity: number }> }) {
      const { data: newOrder, error } = await supabase
        .from('orders')
        .insert({
          status: 'New',
          total: data.total,
          user_id: session?.user.id,
        })
        .select()
        .single();
      if (error) throw new Error(error.message);

      // Insert order items
      const orderItems = data.items.map((item) => ({
        ...item,
        order_id: newOrder.id,
      }));
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);
      if (itemsError) throw new Error(itemsError.message);

      return newOrder as Order;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({ id, status }: { id: number; status: OrderStatus }) {
      const { data, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return data as Order;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['orders', variables.id] });
    },
  });
};