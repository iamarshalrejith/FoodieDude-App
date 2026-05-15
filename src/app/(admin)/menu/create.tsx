import {
  View, Text, StyleSheet, TextInput, Image,
  Alert, ScrollView, Pressable,
} from 'react-native';
import React, { useState } from 'react';
import Button from '../../../components/Button';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Colors, Radius, Shadow } from '@/src/constants/theme';
import { FontAwesome } from '@expo/vector-icons';

const CreateProductScreen = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { id } = useLocalSearchParams();
  const isUpdating = !!id;

  const resetFields = () => { setName(''); setPrice(''); setImage(null); };

  const validateInput = () => {
    setErrors('');
    if (!name) { setErrors('Name is required'); return false; }
    if (!price) { setErrors('Price is required'); return false; }
    if (isNaN(Number(price))) { setErrors('Price must be a number'); return false; }
    return true;
  };

  const onCreate = async () => {
    if (!validateInput()) return;
    setLoading(true);
    try {
      // TODO: await insertProduct({ name, price: parseFloat(price), image })
      await new Promise((res) => setTimeout(res, 600));
      resetFields();
      router.back();
    } finally { setLoading(false); }
  };

  const onUpdate = async () => {
    if (!validateInput()) return;
    setLoading(true);
    try {
      // TODO: await updateProduct({ id: Number(id), name, price: parseFloat(price), image })
      await new Promise((res) => setTimeout(res, 600));
      router.back();
    } finally { setLoading(false); }
  };

  const onDelete = async () => {
    // TODO: await deleteProduct(Number(id))
    router.back();
  };

  const confirmDelete = () => {
    Alert.alert('Delete Product', 'Are you sure you want to delete this product?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: onDelete },
    ]);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Camera roll permission is needed.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Stack.Screen options={{ title: isUpdating ? 'Update Product' : 'Create Product' }} />

      {/* Image picker */}
      <Pressable style={styles.imagePicker} onPress={pickImage}>
        <Image source={{ uri: image || defaultPizzaImage }} style={styles.image} resizeMode="contain" />
        <View style={styles.imageOverlay}>
          <FontAwesome name="camera" size={20} color="#fff" />
          <Text style={styles.imageOverlayText}>
            {image ? 'Change Image' : 'Select Image'}
          </Text>
        </View>
      </Pressable>

      <View style={styles.form}>
        {errors ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>⚠️ {errors}</Text>
          </View>
        ) : null}

        <Text style={styles.label}>Product Name</Text>
        <TextInput
          placeholder="e.g. Margherita Pizza"
          placeholderTextColor="#9CA3AF"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <Text style={styles.label}>Price ($)</Text>
        <TextInput
          placeholder="9.99"
          placeholderTextColor="#9CA3AF"
          value={price}
          onChangeText={setPrice}
          style={styles.input}
          keyboardType="numeric"
        />

        <Button
          onPress={isUpdating ? onUpdate : onCreate}
          text={isUpdating ? 'Update Product' : 'Create Product'}
          loading={loading}
        />

        {isUpdating && (
          <Button
            onPress={confirmDelete}
            text="Delete Product"
            variant="danger"
          />
        )}
      </View>
    </ScrollView>
  );
};

export default CreateProductScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  imagePicker: {
    margin: 20,
    borderRadius: Radius.xl,
    overflow: 'hidden',
    backgroundColor: '#FFF8F5',
    ...Shadow.medium,
  },
  image: { width: '100%', aspectRatio: 1 },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
  },
  imageOverlayText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  form: { paddingHorizontal: 20, paddingBottom: 40 },
  errorBox: {
    backgroundColor: '#FEF2F2',
    borderRadius: Radius.md,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  errorText: { color: '#EF4444', fontSize: 13, fontWeight: '600' },
  label: { fontSize: 13, fontWeight: '700', color: Colors.text, marginBottom: 6 },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    padding: 14,
    fontSize: 15,
    marginBottom: 18,
    color: Colors.text,
    ...Shadow.small,
  },
});