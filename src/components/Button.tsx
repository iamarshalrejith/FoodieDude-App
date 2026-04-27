import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import React from 'react';
import { Colors } from '../constants/theme';

type ButtonProps = {
  text: string;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
};

const Button = ({ text, onPress, loading = false, disabled = false, variant = 'primary' }: ButtonProps) => {
  const isDisabled = disabled || loading;

  const containerStyle = [
    styles.container,
    variant === 'secondary' && styles.secondary,
    variant === 'danger' && styles.danger,
    variant === 'outline' && styles.outline,
    isDisabled && styles.disabled,
  ];

  const textStyle = [
    styles.btnText,
    variant === 'outline' && styles.outlineText,
    variant === 'danger' && styles.dangerText,
  ];

  return (
    <Pressable
      style={({ pressed }) => [
        ...containerStyle,
        pressed && !isDisabled && styles.pressed,
      ]}
      onPress={onPress}
      disabled={isDisabled}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? Colors.primary : '#fff'} size="small" />
      ) : (
        <Text style={textStyle}>{text}</Text>
      )}
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    alignSelf: 'center',
    maxWidth: 500,
    marginVertical: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  secondary: {
    backgroundColor: Colors.secondary,
    shadowColor: Colors.secondary,
  },
  danger: {
    backgroundColor: '#FEF2F2',
    shadowColor: 'transparent',
    elevation: 0,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.primary,
    shadowColor: 'transparent',
    elevation: 0,
  },
  disabled: {
    opacity: 0.5,
    shadowColor: 'transparent',
    elevation: 0,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  btnText: {
    fontWeight: '700',
    color: '#fff',
    fontSize: 16,
    letterSpacing: 0.3,
  },
  outlineText: {
    color: Colors.primary,
  },
  dangerText: {
    color: '#EF4444',
  },
});