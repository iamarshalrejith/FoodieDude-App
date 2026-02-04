import { View, Text,StyleSheet, Pressable } from 'react-native'
import React from 'react'

type ButtonProps = {
  text: string;
  onPress?: () => void;
}

const Button = ({text,onPress}: ButtonProps) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.btnText}>{text}</Text>
    </Pressable>
  )
}

export default Button

const styles = StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: '#f78b48',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      padding:15,
      alignSelf: 'center',
      maxWidth: 500,
      marginVertical: 10,
    },
    btnText: {
      fontWeight: '500',
      color: '#000',
      fontSize: 16,
    }
})